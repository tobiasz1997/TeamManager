import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimersService } from '@features/manager/timers/timers.service';
import { TimerDto } from '@core/api/timer-client.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerFilterEnum } from '@features/manager/timers/enums/timer-filter.enum';
import { stringToIsoDate } from '@shared/functions/string-to-iso-date';
import { PAGE_NAME } from '@shared/constants/constant';

@Component({
  selector: 'tm-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.sass'],
})
export class TimersComponent implements OnInit, OnDestroy {
  public timers$ = this._timersService.timers$;
  public filterItems$ = this._timersService.filterItems$;
  public pageSize = 9;

  private _destroy = new Subject<void>();

  constructor(
    private readonly _timersService: TimersService,
    private readonly _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams
      .pipe(takeUntil(this._destroy))
      .subscribe(params => {
        this._timersService.init(
          stringToIsoDate(params[TimerFilterEnum.StartDate]),
          stringToIsoDate(params[TimerFilterEnum.EndDate]),
          params[TimerFilterEnum.Project],
          params[PAGE_NAME],
          this.pageSize,
        );
      });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  public handleAddTimer(): void {
    this._timersService.showAddTimerModal();
  }

  public handleEditTimer(timer: TimerDto): void {
    this._timersService.showEditTimerModal(timer);
  }

  public handleDeleteTimer(timer: TimerDto): void {
    this._timersService.deleteTimer(timer);
  }
}
