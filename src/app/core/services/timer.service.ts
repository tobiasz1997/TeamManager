import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DummyDataArrayOfTimers, ITimerModel } from '@core/models/timer.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly _timers$ = new BehaviorSubject<Array<ITimerModel>>([]);

  constructor() {
    this.loadTimers();
  }

  get timers$(): Observable<Array<ITimerModel>> {
    return this._timers$;
  }

  private loadTimers(): void {
    this._timers$.next(DummyDataArrayOfTimers);
  }
}
