import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import {
  CreateProjectRequest,
  ProjectClient,
  ProjectDto,
  UpdateProjectRequest,
} from '@core/api/project-client.service';
import { ApiException } from '@core/api/share';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly _projects$ = new BehaviorSubject<Array<ProjectDto>>([]);

  constructor(
    private readonly _projectClient: ProjectClient,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  get projects$(): Observable<Array<ProjectDto>> {
    return this._projects$;
  }

  public addNewProject(project: Omit<ProjectDto, 'id'>): Observable<string> {
    return this._projectClient
      .projectPost(project as CreateProjectRequest)
      .pipe(
        catchError((err: any | ApiException, _) => {
          this._loggerMessageService.errorMsg(err, JSON.parse(err.response)?.reason);
          return throwError(() => err);
        }),
        tap((id) => this.handleAddedProject(id, project)),
      );
  }

  private handleAddedProject(id: string, project: Omit<ProjectDto, 'id'>): void {
    const newProject: ProjectDto = {
      ...project,
      id,
    };
    this._projects$.next([...this._projects$.value, newProject]);
    this._loggerMessageService.successMsg('Successfully added project.');
  }

  public editProject(project: ProjectDto): Observable<void> {
    return this._projectClient
      .projectPut(project as UpdateProjectRequest)
      .pipe(
        catchError((err: any | ApiException, _) => {
          this._loggerMessageService.errorMsg(err, JSON.parse(err.response)?.reason);
          return throwError(() => err);
        }),
        tap(() => this.handleEditedProject(project)),
      );
  }

  private handleEditedProject(project: ProjectDto): void {
    const list = this._projects$.value;
    const index = list.findIndex(x => x.id === project.id);
    list.splice(index, 1, project);
    this._projects$.next([...list]);
    this._loggerMessageService.successMsg('Successfully edited project.');
  }

  public deleteProject(project: ProjectDto): void {
    this._projectClient
      .projectDelete(project.id)
      .subscribe(_ => {
        const list = this._projects$.value;
        const index = list.findIndex(x => x.id === project.id);
        list.splice(index, 1);
        this._projects$.next([...list]);
      });
  }

  public getProject(id: string): ProjectDto {
    return this._projects$.value.find(x => x.id === id);
  }

  public loadData(force = false): void {
    this._projects$.asObservable().pipe(
      take(1),
      switchMap(value => {
        if (value.length === 0 || force) {
          return this._projectClient.list() as Observable<ProjectDto[]>;
        } else {
          return of(value);
        }
      }),
    )
      .subscribe(x => this._projects$.next(x));
  }

}
