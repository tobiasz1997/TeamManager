import { Injectable } from '@angular/core';
import { TimerService } from '@core/services/timer.service';

@Injectable()
export class TimersService {
  public timers$ = this._timerService.timers$;

  constructor(
    private readonly _timerService: TimerService,
  ) {
  }
}
