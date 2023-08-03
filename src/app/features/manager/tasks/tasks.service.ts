import { Injectable } from '@angular/core';
import { TaskService } from '@core/services/task.service';
import { IManageTaskModel, ITaskModel, TaskStatusEnum } from '@core/models/task.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageTaskComponent } from '@features/manager/tasks/components/manage-task/manage-task.component';
import { IManageTask } from '@features/manager/tasks/components/manage-task/manage-task.interface';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { Confirm } from '@shared/decorators/confirmation.decorator';

@Injectable()
export class TasksService {
  public todoTasks$ = this._taskService.todoTasks$;
  public inProgressTasks$ = this._taskService.inProgressTasks$;
  public doneTasks$ = this._taskService.doneTasks$;
  public rejectedTasks$ = this._taskService.rejectedTasks$;

  constructor(
    private readonly _taskService: TaskService,
    private readonly _matDialog: MatDialog,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  public handleDroppedTask(prevStatus: TaskStatusEnum, currStatus: TaskStatusEnum, prevIndex: number, currIndex: number): void {
    this._taskService.editDroppedTask(prevStatus, currStatus, prevIndex, currIndex);
  }

  public showAddTaskModal(status: TaskStatusEnum) {
    const dialogRef = this.createManageTaskModal(false, status);

    dialogRef.afterClosed().subscribe((result: IManageTaskModel | undefined) => {
      if (result) {
        this._taskService.addNewTask({ ...result, status });
        this._loggerMessageService.successMsg('Successfully added new task.');
      }
    });
  }

  public showEditTaskModal(task: ITaskModel) {
    const dialogRef = this.createManageTaskModal(true, task.status, {
      name: task.name,
      priority: task.priority,
      description: task.description,
    });

    dialogRef.afterClosed().subscribe((result: IManageTaskModel | undefined) => {
      if (result) {
        this._taskService.editTask({
          ...result,
          id: task.id,
          createdAt: task.createdAt,
          status: task.status,
        } as ITaskModel);
        this._loggerMessageService.successMsg('Successfully updated task.');
      }
    });
  }

  @Confirm({
    question: 'Are you sure you want to delete this task?',
    confirmButtonText: 'Delete',
  })
  public deleteTask(task: ITaskModel) {
    this._taskService.deleteTask(task);
    this._loggerMessageService.successMsg('Successfully deleted task.');
  }

  private createManageTaskModal(isEditTask: boolean, taskStatus: TaskStatusEnum, task?: IManageTaskModel): MatDialogRef<ManageTaskComponent> {
    return this._matDialog.open(ManageTaskComponent, {
      data: { isEdit: isEditTask, type: taskStatus, task: task } as IManageTask,
    });
  }
}
