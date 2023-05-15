import { Component, OnInit } from '@angular/core';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TasksService } from '@features/manager/tasks/tasks.service';
import { ITaskModel, TaskStatusEnum } from '@core/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent implements OnInit {
  public todoTasks$ = this._tasksService.todoTasks$;
  public inProgressTasks$ = this._tasksService.inProgressTasks$;
  public doneTasks$ = this._tasksService.doneTasks$;
  public rejectedTasks$ = this._tasksService.rejectedTasks$;
  public readonly tasksStatusEnum = TaskStatusEnum;

  constructor(
    private readonly _loggerService: LoggerMessagesService,
    private readonly _tasksService: TasksService,
  ) {
  }

  ngOnInit(): void {
  }

  public drop(event: CdkDragDrop<Array<ITaskModel>>): void {
    this._tasksService.handleDroppedTask(
      event.previousContainer.id as TaskStatusEnum,
      event.container.id as TaskStatusEnum,
      event.previousIndex, event.currentIndex,
    );
  }

  handleClick(i: number) {
    console.log(i);
  }

}
