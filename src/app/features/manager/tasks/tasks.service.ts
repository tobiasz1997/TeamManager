import { Injectable } from '@angular/core';
import { TaskService } from '@core/services/task.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageTaskComponent } from '@features/manager/tasks/components/manage-task/manage-task.component';
import { IManageTask, IManageTaskModel } from '@features/manager/tasks/components/manage-task/manage-task.interface';
import { Confirm } from '@shared/decorators/confirmation.decorator';
import { AssignmentDto, AssignmentStatusType } from '@core/api/assignment-client.service';
import { LoaderService } from '@shared/services/loader.service';

@Injectable()
export class TasksService {
  public todoTasks$ = this._taskService.todoTasks$;
  public inProgressTasks$ = this._taskService.inProgressTasks$;
  public doneTasks$ = this._taskService.doneTasks$;
  public rejectedTasks$ = this._taskService.rejectedTasks$;

  private manageTaskDialogRef: MatDialogRef<ManageTaskComponent>;

  constructor(
    private readonly _taskService: TaskService,
    private readonly _matDialog: MatDialog,
    private readonly _loaderService: LoaderService,
  ) {
  }

  public handleDroppedTask(prevStatus: AssignmentStatusType, currStatus: AssignmentStatusType, prevIndex: number, currIndex: number): void {
    this._taskService.editDroppedTask(prevStatus, currStatus, prevIndex, currIndex);
  }

  public showAddTaskModal(status: AssignmentStatusType) {
    this.manageTaskDialogRef = this.createManageTaskModal(
      false,
      status,
      (payload) => this.handleAddNewTask(payload, status),
    );
  }

  public showEditTaskModal(task: AssignmentDto) {
    this.manageTaskDialogRef = this.createManageTaskModal(
      true,
      task.status,
      (payload) => this.handleEditTaskModal(payload, task),
      {
        name: task.name,
        priority: task.priority,
        description: task.description,
      },
    );
  }

  public loadMoreTasks(type: AssignmentStatusType): void {
    this._taskService.loadTaskByStatus(type);
  }

  @Confirm({
    question: 'Are you sure you want to delete this task?',
    confirmButtonText: 'Delete',
  })
  public deleteTask(task: AssignmentDto) {
    this._taskService.deleteTask(task);
  }

  private createManageTaskModal(isEditTask: boolean, taskStatus: AssignmentStatusType, command: (payload: IManageTaskModel) => void, task?: IManageTaskModel): MatDialogRef<ManageTaskComponent> {
    return this._matDialog.open(ManageTaskComponent, {
      data: {
        isEdit: isEditTask,
        type: taskStatus,
        task: task,
        loading: this._loaderService.loading$,
        command: command.bind(this),
      } as IManageTask,
    });
  }

  private handleAddNewTask(result: IManageTaskModel, status: AssignmentStatusType) {
    if (result) {
      this._taskService.addNewTask({ ...result, status })
        .subscribe((_) => this.manageTaskDialogRef.close(null));
    }
  }

  private handleEditTaskModal(result: IManageTaskModel, task: AssignmentDto) {
    if (result) {
      const createdTask = {
        name: result.name,
        priority: result.priority,
        description: result.description,
        id: task.id,
        createdAt: task.createdAt,
        status: task.status,
      } as AssignmentDto;
      this._taskService.editTask(createdTask)
        .subscribe(() => this.manageTaskDialogRef.close(null));
    }
  }

}
