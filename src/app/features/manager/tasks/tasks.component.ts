import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TasksService } from '@features/manager/tasks/tasks.service';
import { AssignmentDto, AssignmentStatusType } from '@core/api/assignment-client.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent {
  public todoTasks$ = this._tasksService.todoTasks$.pipe(map(x => x.items));
  public inProgressTasks$ = this._tasksService.inProgressTasks$.pipe(map(x => x.items));
  public doneTasks$ = this._tasksService.doneTasks$.pipe(map(x => x.items));
  public rejectedTasks$ = this._tasksService.rejectedTasks$.pipe(map(x => x.items));

  public todoTasksLoadMore$ = this._tasksService.todoTasks$.pipe(map(x => x.totalResults > x.items.length));
  public inProgressTasksLoadMore$ = this._tasksService.inProgressTasks$.pipe(map(x => x.totalResults > x.items.length));
  public doneTasksLoadMore$ = this._tasksService.doneTasks$.pipe(map(x => x.totalResults > x.items.length));
  public rejectedTasksLoadMore$ = this._tasksService.rejectedTasks$.pipe(map(x => x.totalResults > x.items.length));

  public readonly tasksStatusEnum = AssignmentStatusType;

  constructor(
    private readonly _tasksService: TasksService,
  ) {
  }

  public handleDropTask(event: CdkDragDrop<Array<AssignmentDto>>): void {
    this._tasksService.handleDroppedTask(
      event.previousContainer.id as AssignmentStatusType,
      event.container.id as AssignmentStatusType,
      event.previousIndex, event.currentIndex,
    );
  }

  public handleAddTask(type: AssignmentStatusType): void {
    this._tasksService.showAddTaskModal(type);
  }

  public handleEditTask(task: AssignmentDto): void {
    this._tasksService.showEditTaskModal(task);
  }

  public handleDeleteTask(task: AssignmentDto): void {
    this._tasksService.deleteTask(task);
  }

  public handleLoadMore(type: AssignmentStatusType): void {
    this._tasksService.loadMoreTasks(type);
  }
}
