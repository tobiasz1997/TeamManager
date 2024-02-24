import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimersPageService } from '@features/manager/timers/timers-page/timers-page.service';
import { TimerDto } from '@core/api/timer-client.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerFilterEnum } from '@features/manager/timers/timers-page/enums/timer-filter.enum';
import { stringToIsoDate } from '@shared/functions/string-to-iso-date';
import { PAGE_NAME } from '@shared/constants/constant';

@Component({
  selector: 'tm-timers-page',
  templateUrl: './timers-page.component.html',
  styleUrls: ['./timers-page.component.sass'],
})
export class TimersPageComponent implements OnInit, OnDestroy {
  public timers$ = this._timersPageService.timers$;
  public filterItems$ = this._timersPageService.filterItems$;
  public pageSize = 9;

  private _destroy = new Subject<void>();

  constructor(
    private readonly _timersPageService: TimersPageService,
    private readonly _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams
      .pipe(takeUntil(this._destroy))
      .subscribe(params => {
        this._timersPageService.init(
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
    this._timersPageService.showAddTimerModal();
  }

  public handleEditTimer(timer: TimerDto): void {
    this._timersPageService.showEditTimerModal(timer);
  }

  public handleDeleteTimer(timer: TimerDto): void {
    this._timersPageService.deleteTimer(timer);
  }
}
