import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { ProjectService } from '@core/services/project.service';
import {
  ManageProjectComponent,
} from '@features/manager/timers/pages/projects/components/manage-project/manage-project.component';
import {
  IManageProject,
  IManageProjectModel,
} from '@features/manager/timers/pages/projects/components/manage-project/manage-project.interface';
import { Confirm } from '@shared/decorators/confirmation.decorator';
import { ProjectDto } from '@core/api/project-client.service';
import { LoaderService } from '@shared/services/loader.service';

@Injectable()
export class ProjectsService {
  public projects$ = this._projectService.projects$;

  private manageProjectDialogRef: MatDialogRef<ManageProjectComponent>;

  constructor(
    private readonly _projectService: ProjectService,
    private readonly _matDialog: MatDialog,
    private readonly _loggerMessageService: LoggerMessagesService,
    private readonly _loaderService: LoaderService,
  ) {
  }

  public init(): void {
    this._projectService.loadData();
  }

  public showAddProjectModal(): void {
    this.manageProjectDialogRef = this.createManageProjectModal(
      false,
      (payload) => this.handleAddProject(payload),
    );
  }

  private handleAddProject(result: IManageProjectModel): void {
    if (result) {
      this._projectService.addNewProject(result)
        .subscribe((_) => this.manageProjectDialogRef.close(null));
    }
  }

  public showEditProjectModal(project: ProjectDto): void {
    this.manageProjectDialogRef = this.createManageProjectModal(
      true,
      (payload) => this.handleEditProject(payload, project),
      project,
    );
  }

  private handleEditProject(result: IManageProjectModel | undefined, project: ProjectDto) {
    if (result) {
      this._projectService.editProject({
        ...result,
        id: project.id,
      }).subscribe((_) => this.manageProjectDialogRef.close(null),
      );
    }
  }

  @Confirm({
    question: 'Are you sure you want to delete this project?',
    confirmButtonText: 'Delete',
  })
  public deleteProject(project: ProjectDto) {
    this._projectService.deleteProject(project);
    this._loggerMessageService.successMsg('Successfully deleted project.');
  }

  private createManageProjectModal(isEditTask: boolean, command: (payload: IManageProjectModel) => void, project?: ProjectDto): MatDialogRef<ManageProjectComponent> {
    return this._matDialog.open(ManageProjectComponent, {
      data: {
        isEdit: isEditTask,
        project,
        command: command.bind(this),
        loading: this._loaderService.loading$,
      } as IManageProject,
    });
  }
}
