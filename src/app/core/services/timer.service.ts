import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DummyDataArrayOfTimers, ITimerModel } from '@core/models/timer.model';
import { ProjectService } from '@core/services/project.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly _timers$ = new BehaviorSubject<Array<ITimerModel>>([]);

  constructor(
    private readonly _projectService: ProjectService,
  ) {
    this.loadTimers();
  }

  get timers$(): Observable<Array<ITimerModel>> {
    return this._timers$.pipe();
  }

  public addNewTimer(projectId: string, description: string, date: Date): void {
    const newTimer: ITimerModel = {
      id: Math.floor(Math.random() * 1000).toString(),
      description,
      date,
      project: this._projectService.getProject(projectId),
    };
    this.pushSortedTimers([newTimer, ...this._timers$.value]);
  }

  public editTimer(id: string, projectId: string, description: string, date: Date): void {
    const list = this._timers$.value;
    const timer: ITimerModel = {
      id,
      project: this._projectService.getProject(projectId),
      description,
      date,
    };
    const index = list.findIndex(x => x.id === id);
    list.splice(index, 1, timer);
    this.pushSortedTimers(list);
  }

  public deleteTimer(id: string): void {
    const list = this._timers$.value;
    const index = list.findIndex(x => x.id === id);
    list.splice(index, 1);
    this.pushSortedTimers(list);
  }

  private loadTimers(): void {
    this._timers$.next(DummyDataArrayOfTimers);
  }

  private pushSortedTimers(array: Array<ITimerModel>): void {
    const sortedArray = array.sort((a, b) => b.date.getTime() - a.date.getTime());
    this._timers$.next([...sortedArray]);
  }
}
