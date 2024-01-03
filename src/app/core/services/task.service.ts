import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, Observable, take, tap, throwError } from 'rxjs';
import {
  AssignmentClient,
  AssignmentDto,
  AssignmentDtoPagedResult,
  AssignmentStatusType,
  CreateAssignmentRequest,
} from '@core/api/assignment-client.service';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { ApiException } from '@core/api/share';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _defaultValue: AssignmentDtoPagedResult = { items: [], totalResults: 0 };
  private readonly _todoTasks = new BehaviorSubject<AssignmentDtoPagedResult>(this._defaultValue);
  private readonly _inProgressTasks = new BehaviorSubject<AssignmentDtoPagedResult>(this._defaultValue);
  private readonly _doneTasks = new BehaviorSubject<AssignmentDtoPagedResult>(this._defaultValue);
  private readonly _rejectedTasks = new BehaviorSubject<AssignmentDtoPagedResult>(this._defaultValue);

  private readonly _updateTasksListMap: Record<AssignmentStatusType, (items: AssignmentDto[], totalResults: number) => void> = {
    [AssignmentStatusType.ToDo]: (items, totalResults) => this._todoTasks.next({
      items: [...items],
      totalResults: totalResults,
    }),
    [AssignmentStatusType.InProgress]: (items, totalResults) => this._inProgressTasks.next({
      items: [...items],
      totalResults: totalResults,
    }),
    [AssignmentStatusType.Done]: (items, totalResults) => this._doneTasks.next({
      items: [...items],
      totalResults: totalResults,
    }),
    [AssignmentStatusType.Aborted]: (items, totalResults) => this._rejectedTasks.next({
      items: [...items],
      totalResults: totalResults,
    }),
  };

  private readonly _addTasksListMap: Record<AssignmentStatusType, (item: AssignmentDto) => void> = {
    [AssignmentStatusType.ToDo]: (item) => this._todoTasks.next({
      items: [item, ...this._todoTasks.value.items],
      totalResults: this._todoTasks.value.totalResults + 1,
    }),
    [AssignmentStatusType.InProgress]: (item) => this._inProgressTasks.next({
      items: [item, ...this._inProgressTasks.value.items],
      totalResults: this._inProgressTasks.value.totalResults + 1,
    }),
    [AssignmentStatusType.Done]: (item) => this._doneTasks.next({
      items: [item, ...this._doneTasks.value.items],
      totalResults: this._doneTasks.value.totalResults + 1,
    }),
    [AssignmentStatusType.Aborted]: (item) => this._rejectedTasks.next({
      items: [item, ...this._rejectedTasks.value.items],
      totalResults: this._rejectedTasks.value.totalResults + 1,
    }),
  };

  private readonly _itemsPerPage = 5;

  get todoTasks$(): Observable<AssignmentDtoPagedResult> {
    return this._todoTasks;
  }

  get inProgressTasks$(): Observable<AssignmentDtoPagedResult> {
    return this._inProgressTasks;
  }

  get doneTasks$(): Observable<AssignmentDtoPagedResult> {
    return this._doneTasks;
  }

  get rejectedTasks$(): Observable<AssignmentDtoPagedResult> {
    return this._rejectedTasks;
  }

  constructor(
    private readonly _tasksClient: AssignmentClient,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
    this.loadTasks();
  }

  public addNewTask(task: Omit<AssignmentDto, 'id' | 'createdAt'>): Observable<string> {
    return this._tasksClient
      .assignmentPost(task as CreateAssignmentRequest)
      .pipe(
        catchError((err: any | ApiException, _) => {
          this._loggerMessageService.errorMsg(err, JSON.parse(err.response)?.reason);
          return throwError(() => err);
        }),
        tap((id) => this.handleAddTask(id, task)),
      );
  }

  private handleAddTask(id: string, task: Omit<AssignmentDto, 'id' | 'createdAt'>) {
    const newTask: AssignmentDto = {
      ...task,
      id: id,
      createdAt: new Date(),
    };
    this._addTasksListMap[task.status](newTask);
    this._loggerMessageService.successMsg('Successfully added task.');
  }

  public editTask(task: AssignmentDto): Observable<void> {
    return this._tasksClient
      .assignmentPut({
        id: task.id,
        status: task.status,
        name: task.name,
        priority: task.priority,
        description: task.description,
      })
      .pipe(
        catchError((err: any | ApiException, _) => {
          this._loggerMessageService.errorMsg(err, JSON.parse(err.response)?.reason);
          return throwError(() => err);
        }),
        tap(() => this.handleEditedTaskWithSuccess(task)),
      );
  }

  private handleEditedTaskWithSuccess(task: AssignmentDto) {
    combineLatest([this._todoTasks, this._inProgressTasks, this._doneTasks, this._rejectedTasks])
      .pipe(take(1))
      .subscribe(([todoList, inProgressList, doneList, rejectedList]) => {
        const tasksListMap: Record<AssignmentStatusType, AssignmentDtoPagedResult> = {
          [AssignmentStatusType.ToDo]: todoList,
          [AssignmentStatusType.InProgress]: inProgressList,
          [AssignmentStatusType.Done]: doneList,
          [AssignmentStatusType.Aborted]: rejectedList,
        };

        const listFromTaskWillBeUpdated = tasksListMap[task.status];
        const index = listFromTaskWillBeUpdated.items.findIndex(x => x.id === task.id);
        listFromTaskWillBeUpdated.items.splice(index, 1, task);
        this._updateTasksListMap[task.status](listFromTaskWillBeUpdated.items, listFromTaskWillBeUpdated.totalResults);
        this._loggerMessageService.successMsg('Successfully updated task.');
      });
  }

  public deleteTask(task: AssignmentDto): void {
    this._tasksClient
      .assignmentDelete(task.id)
      .pipe(
        catchError((err: any | ApiException, _) => {
          this._loggerMessageService.errorMsg(err, JSON.parse(err.response)?.reason);
          return throwError(() => err);
        }),
      )
      .subscribe(() => {
        combineLatest([this._todoTasks, this._inProgressTasks, this._doneTasks, this._rejectedTasks])
          .pipe(take(1))
          .subscribe(([todoList, inProgressList, doneList, rejectedList]) => {
            const tasksListMap: Record<AssignmentStatusType, AssignmentDtoPagedResult> = {
              [AssignmentStatusType.ToDo]: todoList,
              [AssignmentStatusType.InProgress]: inProgressList,
              [AssignmentStatusType.Done]: doneList,
              [AssignmentStatusType.Aborted]: rejectedList,
            };

            const listFromTaskWillBeRemoved = tasksListMap[task.status];
            const index = listFromTaskWillBeRemoved.items.findIndex(x => x.id === task.id);
            listFromTaskWillBeRemoved.items.splice(index, 1);
            this._updateTasksListMap[task.status](listFromTaskWillBeRemoved.items, listFromTaskWillBeRemoved.totalResults - 1);
            this._loggerMessageService.successMsg('Successfully deleted task.');
          });
      });
  }

  public editDroppedTask(prevStatus: AssignmentStatusType, currStatus: AssignmentStatusType, prevIndex: number, currIndex: number): void {
    combineLatest([this._todoTasks, this._inProgressTasks, this._doneTasks, this._rejectedTasks])
      .pipe(take(1))
      .subscribe(([todoList, inProgressList, doneList, rejectedList]) => {
        const tasksListMap: Record<AssignmentStatusType, AssignmentDtoPagedResult> = {
          [AssignmentStatusType.ToDo]: todoList,
          [AssignmentStatusType.InProgress]: inProgressList,
          [AssignmentStatusType.Done]: doneList,
          [AssignmentStatusType.Aborted]: rejectedList,
        };

        const task = (tasksListMap[prevStatus].items[prevIndex]);

        this._tasksClient
          .assignmentPatch({
            id: task.id,
            status: currStatus,
          }).subscribe(() => {
          if (prevStatus !== currStatus) {
            const listFromTaskWillBeRemoved = tasksListMap[prevStatus];
            listFromTaskWillBeRemoved.items.splice(prevIndex, 1);
            this._updateTasksListMap[prevStatus](listFromTaskWillBeRemoved.items, listFromTaskWillBeRemoved.totalResults - 1);

            task.status = currStatus;
            const listFromTaskWillBeAdded = tasksListMap[currStatus];
            listFromTaskWillBeAdded.items.splice(currIndex, 0, task);
            this._updateTasksListMap[currStatus](listFromTaskWillBeAdded.items, listFromTaskWillBeAdded.totalResults + 1);
          } else {
            const listFromTaskWillBeMoved = tasksListMap[prevStatus];
            listFromTaskWillBeMoved.items.splice(prevIndex, 1);
            listFromTaskWillBeMoved.items.splice(currIndex, 0, task);
            this._updateTasksListMap[prevStatus](listFromTaskWillBeMoved.items, listFromTaskWillBeMoved.totalResults);
          }
        });
      });
  }

  public loadTaskByStatus(type: AssignmentStatusType): void {
    combineLatest([this._todoTasks, this._inProgressTasks, this._doneTasks, this._rejectedTasks])
      .pipe(take(1))
      .subscribe(([todoList, inProgressList, doneList, rejectedList]) => {
          const tasksListMap: Record<AssignmentStatusType, AssignmentDtoPagedResult> = {
            [AssignmentStatusType.ToDo]: todoList,
            [AssignmentStatusType.InProgress]: inProgressList,
            [AssignmentStatusType.Done]: doneList,
            [AssignmentStatusType.Aborted]: rejectedList,
          };

          const task = tasksListMap[type];
          const currentPage = Math.ceil(task.items.length / this._itemsPerPage);

          this._tasksClient
            .list(type, currentPage + 1, this._itemsPerPage)
            .subscribe(result => {
              const extendedTasksList = task.items.concat(result.items);
              this._updateTasksListMap[type](extendedTasksList, result.totalResults);
            });

        },
      );
  }

  private loadTasks(): void {
    this._tasksClient
      .lists(this._itemsPerPage)
      .subscribe(tasks => {
        this._todoTasks.next(tasks.todo);
        this._inProgressTasks.next(tasks.inProgress);
        this._doneTasks.next(tasks.done);
        this._rejectedTasks.next(tasks.aborted);
      });
  }
}
