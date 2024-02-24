import { Injectable, OnDestroy } from '@angular/core';
import { TimerService } from '@core/services/timer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import {
  ManageTimerComponent,
} from '@features/manager/timers/timers-page/components/manage-timer/manage-timer.component';
import {
  IManageTimer,
  IManageTimerModel,
} from '@features/manager/timers/timers-page/components/manage-timer/manage-timer.interface';
import { Confirm } from '@shared/decorators/confirmation.decorator';
import { IFilterItem } from '@shared/components/filter/filter.component';
import { ProjectService } from '@core/services/project.service';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { IOption } from '@shared/interfaces/option.interface';
import { takeUntil } from 'rxjs/operators';
import { TimerDto } from '@core/api/timer-client.service';
import { LoaderService } from '@shared/services/loader.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { TimerFilterEnum } from '@features/manager/timers/timers-page/enums/timer-filter.enum';

@Injectable()
export class TimersPageService implements OnDestroy {
  public timers$ = this._timerService.timers$;
  private _filterItems$ = new BehaviorSubject<Array<IFilterItem>>(null);
  private _destroy$ = new Subject<void>();

  private _manageTimerDialogRef: MatDialogRef<ManageTimerComponent>;

  get filterItems$(): Observable<IFilterItem[]> {
    return this._filterItems$;
  }

  constructor(
    private readonly _timerService: TimerService,
    private readonly _projectService: ProjectService,
    private readonly _matDialog: MatDialog,
    private readonly _loggerMessageService: LoggerMessagesService,
    private readonly _loaderService: LoaderService,
    private readonly _datePipe: DatePipe,
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
            name: TimerFilterEnum.StartDate,
            placeholder: 'Start Date',
            type: 'date',
          },
          {
            name: TimerFilterEnum.EndDate,
            placeholder: 'End Date',
            type: 'date',
          },
          {
            name: TimerFilterEnum.Project,
            placeholder: 'Project',
            type: 'select',
            options: result,
          },
        ]);
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public init(startDate?: Date, endDate?: Date, projectId?: string, page?: number, pageSize?: number): void {
    this._timerService.loadData(startDate, endDate, projectId, page, pageSize);
  }

  public showAddTimerModal(): void {
    this._manageTimerDialogRef = this.createManageTimerModal(
      false,
      (payload) => this.handleAddTimer(payload),
    );
  }

  private handleAddTimer(result: IManageTimerModel) {
    this._timerService.addNewTimer(result.projectId, result.description, new Date(result.date))
      .subscribe((_) => this._manageTimerDialogRef.close(null));
  }

  public showEditTimerModal(timer: TimerDto): void {
    this._manageTimerDialogRef = this.createManageTimerModal(
      true,
      (payload) => this.handleEditTimer(payload, timer),
      timer,
    );
  }

  private handleEditTimer(result: IManageTimerModel, timer: TimerDto) {
    this._timerService.editTimer(
      timer.id,
      result.projectId,
      result.description,
      new Date(result.date),
    )
      .subscribe((_) => this._manageTimerDialogRef.close(null));
  }

  @Confirm({
    question: 'Are you sure you want to delete this timer?',
    confirmButtonText: 'Delete',
  })
  public deleteTimer(timer: TimerDto): void {
    this._timerService.deleteTimer(timer.id);
    this._loggerMessageService.successMsg('Successfully deleted project.');
  }

  private createManageTimerModal(isEditTask: boolean, command: (payload: IManageTimerModel) => void, timer?: TimerDto): MatDialogRef<ManageTimerComponent> {
    return this._matDialog.open(ManageTimerComponent, {
      data: {
        isEdit: isEditTask, timer: timer ? {
          date: moment.utc(timer.date).toDate(),
          description: timer.description,
          projectId: timer.project?.id,
        } : undefined,
        loading: this._loaderService.loading$,
        command: command.bind(this),
      } as IManageTimer,
    });
  }
}
