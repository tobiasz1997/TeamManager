import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '@features/manager/timers/pages/projects/projects.service';
import { ProjectDto } from '@core/api/project-client.service';

@Component({
  selector: 'tm-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit {
  public projects$ = this._projectsService.projects$;

  constructor(
    private readonly _projectsService: ProjectsService,
  ) {
  }

  ngOnInit() {
    this._projectsService.init();
  }

  public handleAddProject(): void {
    this._projectsService.showAddProjectModal();
  }

  public handleEditProject(project: ProjectDto): void {
    this._projectsService.showEditProjectModal(project);
  }

  public handleDeleteProject(project: ProjectDto): void {
    this._projectsService.deleteProject(project);
  }

}
