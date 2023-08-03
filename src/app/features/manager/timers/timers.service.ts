import { Injectable } from '@angular/core';
import { TimerService } from '@core/services/timer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { ManageTimerComponent } from '@features/manager/timers/components/manage-timer/manage-timer.component';
import { IManageTimerModel, ITimerModel } from '@core/models/timer.model';
import { IManageTimer } from '@features/manager/timers/components/manage-timer/manage-timer.interface';
import { ConfirmModalComponent, IConfirmModal } from '@shared/components/confirm-modal/confirm-modal.component';
import './../../../shared/prototypes/date.prototype';

@Injectable()
export class TimersService {
  public timers$ = this._timerService.timers$;

  constructor(
    private readonly _timerService: TimerService,
    private readonly _matDialog: MatDialog,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  public showAddTimerModal(): void {
    const dialogRef = this.createManageTimerModal(false);

    dialogRef.afterClosed().subscribe((result: IManageTimerModel | undefined) => {
      if (result) {
        this._timerService.addNewTimer(result.projectId, result.description, new Date(result.date));
        this._loggerMessageService.successMsg('Successfully added new timer.');
      }
    });
  }

  public showEditTimerModal(timer: ITimerModel): void {
    const dialogRef = this.createManageTimerModal(true, timer);

    dialogRef.afterClosed().subscribe((result: IManageTimerModel | undefined) => {
      if (result) {
        this._timerService.editTimer(
          timer.id,
          result.projectId,
          result.description,
          new Date(result.date),
        );
        this._loggerMessageService.successMsg('Successfully edited timer.');
      }
    });
  }

  public showDeleteTimerModal(timer: ITimerModel): void {
    const dialogRef = this.createConfirmModal({
      question: 'Are you sure you want to delete this timer?',
      confirmButtonText: 'Delete',
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this._timerService.deleteTimer(timer.id);
        this._loggerMessageService.successMsg('Successfully deleted project.');
      }
    });
  }

  private createManageTimerModal(isEditTask: boolean, timer?: ITimerModel): MatDialogRef<ManageTimerComponent> {
    return this._matDialog.open(ManageTimerComponent, {
      data: {
        isEdit: isEditTask, timer: timer ? {
          date: timer.date.toIsoDate(),
          description: timer.description,
          projectId: timer.project?.id,
        } : undefined,
      } as IManageTimer,
    });
  }

  private createConfirmModal(data: IConfirmModal): MatDialogRef<ConfirmModalComponent> {
    return this._matDialog.open(ConfirmModalComponent, {
      data,
    });
  }
}
