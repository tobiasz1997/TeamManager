import { Component } from '@angular/core';
import { TimersService } from '@features/manager/timers/timers.service';
import { ITimerModel } from '@core/models/timer.model';

@Component({
  selector: 'tm-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.sass'],
})
export class TimersComponent {
  public timers$ = this._timersService.timers$;
  public filterItems$ = this._timersService.filterItems$;

  constructor(
    private readonly _timersService: TimersService,
  ) {
  }

  public handleAddTimer(): void {
    this._timersService.showAddTimerModal();
  }

  public handleEditTimer(timer: ITimerModel): void {
    this._timersService.showEditTimerModal(timer);
  }

  public handleDeleteTimer(timer: ITimerModel): void {
    this._timersService.deleteTimer(timer);
  }

}
