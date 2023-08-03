import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DummyDataArrayOfProjects, IProjectModel } from '@core/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly _projects$ = new BehaviorSubject<Array<IProjectModel>>([]);

  constructor() {
    this.loadProjects();
  }

  get projects$(): Observable<Array<IProjectModel>> {
    return this._projects$;
  }

  public addNewProject(project: Omit<IProjectModel, 'id'>): void {
    const newProject: IProjectModel = {
      ...project,
      id: Math.floor(Math.random() * 1000).toString(),
    };
    this._projects$.next([...this._projects$.value, newProject]);
  }

  public editProject(project: IProjectModel): void {
    const list = this._projects$.value;
    const index = list.findIndex(x => x.id === project.id);
    list.splice(index, 1, project);
    this._projects$.next([...list]);
  }

  public deleteProject(project: IProjectModel): void {
    const list = this._projects$.value;
    const index = list.findIndex(x => x.id === project.id);
    list.splice(index, 1);
    this._projects$.next([...list]);
  }

  public getProject(id: string): IProjectModel {
    return this._projects$.value.find(x => x.id === id);
  }

  private loadProjects(): void {
    this._projects$.next(DummyDataArrayOfProjects);
  }
}
