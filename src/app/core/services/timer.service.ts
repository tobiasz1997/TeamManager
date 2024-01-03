import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ProjectService } from '@core/services/project.service';
import { TimerClient, TimerDto, TimerDtoPagedResult } from '@core/api/timer-client.service';
import { ApiException } from '@core/api/share';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly _defaultValue: TimerDtoPagedResult = { items: [], totalResults: 0 };
  private readonly _timers$ = new BehaviorSubject<TimerDtoPagedResult>(this._defaultValue);

  constructor(
    private readonly _projectService: ProjectService,
    private readonly _timerClient: TimerClient,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  get timers$(): Observable<TimerDtoPagedResult> {
    return this._timers$;
  }

  public addNewTimer(projectId: string, description: string, date: Date): Observable<string> {
    return this._timerClient.timerPost({
      projectId,
      description,
      date,
    }).pipe(
      catchError((err: any | ApiException, _) => {
        this._loggerMessageService.errorMsg(err, JSON.parse(err.response)?.reason);
        return throwError(() => err);
      }),
      tap((id) => this.handleAddedTimer(id, projectId, description, date)),
    );
  }

  private handleAddedTimer(id: string, projectId: string, description: string, date: Date): void {
    const newTimer: TimerDto = {
      id,
      description,
      date,
      project: this._projectService.getProject(projectId),
    };
    this.pushSortedTimers([newTimer, ...this._timers$.value.items], this._timers$.value.totalResults + 1);
    this._loggerMessageService.successMsg('Successfully added timer.');
  }

  public editTimer(id: string, projectId: string, description: string, date: Date): Observable<void> {
    return this._timerClient
      .timerPut({ id, projectId, description, date })
      .pipe(
        catchError((err: any | ApiException, _) => {
          this._loggerMessageService.errorMsg(err, JSON.parse(err.response)?.reason);
          return throwError(() => err);
        }),
        tap(() => this.handleEditedTimer(id, projectId, description, date)),
      );
  }

  public handleEditedTimer(id: string, projectId: string, description: string, date: Date): void {
    const list = [...this._timers$.value.items];
    const timer: TimerDto = {
      id,
      project: this._projectService.getProject(projectId),
      description,
      date,
    };
    const index = list.findIndex(x => x.id === id);
    list.splice(index, 1, timer);
    this.pushSortedTimers(list, this._timers$.value.totalResults);
  }

  public deleteTimer(id: string): void {
    this._timerClient
      .timerDelete(id)
      .subscribe(_ => {
        const list = [...this._timers$.value.items];
        const index = list.findIndex(x => x.id === id);
        list.splice(index, 1);
        this.pushSortedTimers(list, this._timers$.value.totalResults - 1);
      });
  }

  public loadData(startDate?: Date, endDate?: Date, projectId?: string, page?: number, pageSize?: number): void {
    this._timerClient
      .list(startDate, endDate, projectId, page ?? 1, pageSize ?? 10)
      .subscribe(x => {
        this._timers$.next(x);
        this._projectService.loadData();
      });
  }

  private pushSortedTimers(array: Array<TimerDto>, totalResults: number): void {
    const sortedArray = array.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this._timers$.next({
      items: [...sortedArray,
      ], totalResults,
    });
  }
}
