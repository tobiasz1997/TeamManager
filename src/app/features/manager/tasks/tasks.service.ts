import { Injectable } from '@angular/core';
import { TaskService } from '@core/services/task.service';
import { TaskStatusEnum } from '@core/models/task.model';

@Injectable()
export class TasksService {
  public todoTasks$ = this._taskService.todoTasks$;
  public inProgressTasks$ = this._taskService.inProgressTasks$;
  public doneTasks$ = this._taskService.doneTasks$;
  public rejectedTasks$ = this._taskService.rejectedTasks$;

  constructor(
    private readonly _taskService: TaskService,
  ) {
  }

  public handleDroppedTask(prevStatus: TaskStatusEnum, currStatus: TaskStatusEnum, prevIndex: number, currIndex: number): void {
    this._taskService.editDroppedTask(prevStatus, currStatus, prevIndex, currIndex);
  }
}
