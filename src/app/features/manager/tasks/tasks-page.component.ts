import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TasksPageService } from '@features/manager/tasks/tasks-page.service';
import { AssignmentDto, AssignmentStatusType } from '@core/api/assignment-client.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.sass'],
})
export class TasksPageComponent {
  public todoTasks$ = this.__tasksPageService.todoTasks$.pipe(map(x => x.items));
  public inProgressTasks$ = this.__tasksPageService.inProgressTasks$.pipe(map(x => x.items));
  public doneTasks$ = this.__tasksPageService.doneTasks$.pipe(map(x => x.items));
  public rejectedTasks$ = this.__tasksPageService.rejectedTasks$.pipe(map(x => x.items));

  public todoTasksLoadMore$ = this.__tasksPageService.todoTasks$.pipe(map(x => x.totalResults > x.items.length));
  public inProgressTasksLoadMore$ = this.__tasksPageService.inProgressTasks$.pipe(map(x => x.totalResults > x.items.length));
  public doneTasksLoadMore$ = this.__tasksPageService.doneTasks$.pipe(map(x => x.totalResults > x.items.length));
  public rejectedTasksLoadMore$ = this.__tasksPageService.rejectedTasks$.pipe(map(x => x.totalResults > x.items.length));

  public readonly tasksStatusEnum = AssignmentStatusType;

  constructor(
    private readonly __tasksPageService: TasksPageService,
  ) {
  }

  public handleDropTask(event: CdkDragDrop<Array<AssignmentDto>>): void {
    this.__tasksPageService.handleDroppedTask(
      event.previousContainer.id as AssignmentStatusType,
      event.container.id as AssignmentStatusType,
      event.previousIndex, event.currentIndex,
    );
  }

  public handleAddTask(type: AssignmentStatusType): void {
    this.__tasksPageService.showAddTaskModal(type);
  }

  public handleEditTask(task: AssignmentDto): void {
    this.__tasksPageService.showEditTaskModal(task);
  }

  public handleDeleteTask(task: AssignmentDto): void {
    this.__tasksPageService.deleteTask(task);
  }

  public handleLoadMore(type: AssignmentStatusType): void {
    this.__tasksPageService.loadMoreTasks(type);
  }
}
