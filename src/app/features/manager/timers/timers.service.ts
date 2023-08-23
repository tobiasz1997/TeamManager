import { Injectable, OnDestroy } from '@angular/core';
import { TimerService } from '@core/services/timer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { ManageTimerComponent } from '@features/manager/timers/components/manage-timer/manage-timer.component';
import { IManageTimerModel, ITimerModel } from '@core/models/timer.model';
import { IManageTimer } from '@features/manager/timers/components/manage-timer/manage-timer.interface';
import './../../../shared/prototypes/date.prototype';
import { Confirm } from '@shared/decorators/confirmation.decorator';
import { IFilterItem } from '@shared/components/filter/filter.component';
import { ProjectService } from '@core/services/project.service';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { IOption } from '@shared/interfaces/option.interface';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class TimersService implements OnDestroy {
  public timers$ = this._timerService.timers$;
  private _filterItems$ = new BehaviorSubject<Array<IFilterItem>>(null);
  private _destroy$ = new Subject<void>();

  get filterItems$() {
    return this._filterItems$;
  }

  constructor(
    private readonly _timerService: TimerService,
    private readonly _projectService: ProjectService,
    private readonly _matDialog: MatDialog,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
    this._projectService.projects$
      .pipe(
        takeUntil(this._destroy$),
        map(data => data.map(x => ({
          label: x.label,
          value: x.id,
        } as IOption<string>))),
      )
      .subscribe(result => {
        this._filterItems$.next([
          {
            name: 'startDate',
            placeholder: 'Start Date',
            type: 'date',
          },
          {
            name: 'endDate',
            placeholder: 'End Date',
            type: 'date',
          },
          {
            name: 'project',
            placeholder: 'Project',
            type: 'select',
            options: result,
          },
        ]);
      });
  }

  ngOnDestroy() {
    console.log('destroy');
    this._destroy$.next();
    this._destroy$.complete();
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

  @Confirm({
    question: 'Are you sure you want to delete this timer?',
    confirmButtonText: 'Delete',
  })
  public deleteTimer(timer: ITimerModel) {
    this._timerService.deleteTimer(timer.id);
    this._loggerMessageService.successMsg('Successfully deleted project.');
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
}
