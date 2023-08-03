import { Component } from '@angular/core';
import { ProjectsService } from '@features/manager/timers/pages/projects/projects.service';
import { IProjectModel } from '@core/models/project.model';

@Component({
  selector: 'tm-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent {
  public projects$ = this._projectsService.projects$;

  constructor(
    private readonly _projectsService: ProjectsService,
  ) {
  }

  public handleAddProject(): void {
    this._projectsService.showAddProjectModal();
  }

  public handleEditProject(project: IProjectModel): void {
    this._projectsService.showEditProjectModal(project);
  }

  public handleDeleteProject(project: IProjectModel): void {
    this._projectsService.showDeleteProjectModal(project);
  }

}
