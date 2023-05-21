import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, take } from 'rxjs';
import { DummyDataArrayOfTasks, ITaskModel, TaskStatusEnum } from '@core/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _todoTasks = new BehaviorSubject<Array<ITaskModel>>([]);
  private readonly _inProgressTasks = new BehaviorSubject<Array<ITaskModel>>([]);
  private readonly _doneTasks = new BehaviorSubject<Array<ITaskModel>>([]);
  private readonly _rejectedTasks = new BehaviorSubject<Array<ITaskModel>>([]);

  private readonly _updateTasksListMap: Record<TaskStatusEnum, (values: ITaskModel[]) => void> = {
    [TaskStatusEnum.ToDo]: (values) => this._todoTasks.next([...values]),
    [TaskStatusEnum.InProgress]: (values) => this._inProgressTasks.next([...values]),
    [TaskStatusEnum.Done]: (values) => this._doneTasks.next([...values]),
    [TaskStatusEnum.Rejected]: (values) => this._rejectedTasks.next([...values]),
  };

  private readonly _addTasksListMap: Record<TaskStatusEnum, (value: ITaskModel) => void> = {
    [TaskStatusEnum.ToDo]: (value) => this._todoTasks.next([value, ...this._todoTasks.value]),
    [TaskStatusEnum.InProgress]: (value) => this._inProgressTasks.next([value, ...this._inProgressTasks.value]),
    [TaskStatusEnum.Done]: (value) => this._doneTasks.next([value, ...this._doneTasks.value]),
    [TaskStatusEnum.Rejected]: (value) => this._rejectedTasks.next([value, ...this._rejectedTasks.value]),
  };

  get todoTasks$(): Observable<Array<ITaskModel>> {
    return this._todoTasks;
  }

  get inProgressTasks$(): Observable<Array<ITaskModel>> {
    return this._inProgressTasks;
  }

  get doneTasks$(): Observable<Array<ITaskModel>> {
    return this._doneTasks;
  }

  get rejectedTasks$(): Observable<Array<ITaskModel>> {
    return this._rejectedTasks;
  }

  constructor() {
    this.loadTasks();
  }

  public addNewTask(task: Omit<ITaskModel, 'id' | 'createdAt'>): void {
    const newTask: ITaskModel = {
      ...task,
      id: Math.floor(Math.random() * 1000).toString(),
      createdAt: new Date(),
    };
    this._addTasksListMap[task.status](newTask);
  }

  public editTask(task: ITaskModel): void {
    combineLatest([this._todoTasks, this._inProgressTasks, this._doneTasks, this._rejectedTasks])
      .pipe(take(1))
      .subscribe(([todoList, inProgressList, doneList, rejectedList]) => {
        const tasksListMap: Record<TaskStatusEnum, Array<ITaskModel>> = {
          [TaskStatusEnum.ToDo]: todoList,
          [TaskStatusEnum.InProgress]: inProgressList,
          [TaskStatusEnum.Done]: doneList,
          [TaskStatusEnum.Rejected]: rejectedList,
        };

        const listFromTaskWillBeUpdated = tasksListMap[task.status];
        const index = listFromTaskWillBeUpdated.findIndex(x => x.id === task.id);
        listFromTaskWillBeUpdated.splice(index, 1, task);
        this._updateTasksListMap[task.status](listFromTaskWillBeUpdated);
      });
  }

  public deleteTask(task: ITaskModel): void {
    combineLatest([this._todoTasks, this._inProgressTasks, this._doneTasks, this._rejectedTasks])
      .pipe(take(1))
      .subscribe(([todoList, inProgressList, doneList, rejectedList]) => {
        const tasksListMap: Record<TaskStatusEnum, Array<ITaskModel>> = {
          [TaskStatusEnum.ToDo]: todoList,
          [TaskStatusEnum.InProgress]: inProgressList,
          [TaskStatusEnum.Done]: doneList,
          [TaskStatusEnum.Rejected]: rejectedList,
        };

        const listFromTaskWillBeRemoved = tasksListMap[task.status];
        const index = listFromTaskWillBeRemoved.findIndex(x => x.id === task.id);
        listFromTaskWillBeRemoved.splice(index, 1);
        this._updateTasksListMap[task.status](listFromTaskWillBeRemoved);
      });
  }

  public editDroppedTask(prevStatus: TaskStatusEnum, currStatus: TaskStatusEnum, prevIndex: number, currIndex: number): void {
    console.log(prevStatus, currStatus, prevIndex, currIndex);
    combineLatest([this._todoTasks, this._inProgressTasks, this._doneTasks, this._rejectedTasks])
      .pipe(take(1))
      .subscribe(([todoList, inProgressList, doneList, rejectedList]) => {
        const tasksListMap: Record<TaskStatusEnum, Array<ITaskModel>> = {
          [TaskStatusEnum.ToDo]: todoList,
          [TaskStatusEnum.InProgress]: inProgressList,
          [TaskStatusEnum.Done]: doneList,
          [TaskStatusEnum.Rejected]: rejectedList,
        };

        const task = tasksListMap[prevStatus][prevIndex];

        if (prevStatus !== currStatus) {
          const listFromTaskWillBeRemoved = tasksListMap[prevStatus];
          listFromTaskWillBeRemoved.splice(prevIndex, 1);
          this._updateTasksListMap[prevStatus](listFromTaskWillBeRemoved);

          task.status = currStatus;
          const listFromTaskWillBeAdded = tasksListMap[currStatus];
          listFromTaskWillBeAdded.splice(currIndex, 0, task);
          this._updateTasksListMap[currStatus](listFromTaskWillBeAdded);
        } else {
          const listFromTaskWillBeMoved = tasksListMap[prevStatus];
          listFromTaskWillBeMoved.splice(prevIndex, 1);
          listFromTaskWillBeMoved.splice(currIndex, 0, task);
          this._updateTasksListMap[prevStatus](listFromTaskWillBeMoved);
        }
      });
  }

  private loadTasks(): void {
    this._todoTasks.next(DummyDataArrayOfTasks.filter(x => x.status === TaskStatusEnum.ToDo));
    this._inProgressTasks.next(DummyDataArrayOfTasks.filter(x => x.status === TaskStatusEnum.InProgress));
    this._doneTasks.next(DummyDataArrayOfTasks.filter(x => x.status === TaskStatusEnum.Done));
    this._rejectedTasks.next(DummyDataArrayOfTasks.filter(x => x.status === TaskStatusEnum.Rejected));
  }
}
