import { Component, OnInit } from '@angular/core';
import { ProjectsPageService } from '@features/manager/timers/projects-page/projects-page.service';
import { ProjectDto } from '@core/api/project-client.service';

@Component({
  selector: 'tm-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.sass'],
})
export class ProjectsPageComponent implements OnInit {
  public projects$ = this._projectsPageService.projects$;

  constructor(
    private readonly _projectsPageService: ProjectsPageService,
  ) {
  }

  ngOnInit() {
    this._projectsPageService.init();
  }

  public handleAddProject(): void {
    this._projectsPageService.showAddProjectModal();
  }

  public handleEditProject(project: ProjectDto): void {
    this._projectsPageService.showEditProjectModal(project);
  }

  public handleDeleteProject(project: ProjectDto): void {
    this._projectsPageService.deleteProject(project);
  }

}
