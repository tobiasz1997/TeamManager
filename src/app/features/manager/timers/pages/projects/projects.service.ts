import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { ProjectService } from '@core/services/project.service';
import {
  ManageProjectComponent,
} from '@features/manager/timers/pages/projects/components/manage-project/manage-project.component';
import { IManageProjectModel, IProjectModel } from '@core/models/project.model';
import {
  IManageProject,
} from '@features/manager/timers/pages/projects/components/manage-project/manage-project.interface';
import { ConfirmModalComponent, IConfirmModal } from '@shared/components/confirm-modal/confirm-modal.component';

@Injectable()
export class ProjectsService {
  public projects$ = this._projectService.projects$;

  constructor(
    private readonly _projectService: ProjectService,
    private readonly _matDialog: MatDialog,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  public showAddProjectModal(): void {
    const dialogRef = this.createManageProjectModal(false);

    dialogRef.afterClosed().subscribe((result: IManageProjectModel | undefined) => {
      if (result) {
        this._projectService.addNewProject(result);
        this._loggerMessageService.successMsg('Successfully added new project.');
      }
    });
  }

  public showEditProjectModal(project: IProjectModel): void {
    const dialogRef = this.createManageProjectModal(true, project);

    dialogRef.afterClosed().subscribe((result: IManageProjectModel | undefined) => {
      if (result) {
        this._projectService.editProject({
          ...result,
          id: project.id,
        });
        this._loggerMessageService.successMsg('Successfully edited project.');
      }
    });
  }

  public showDeleteProjectModal(project: IProjectModel): void {
    const dialogRef = this.createConfirmModal({
      question: 'Are you sure you want to delete this project?',
      confirmButtonText: 'Delete',
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this._projectService.deleteProject(project);
        this._loggerMessageService.successMsg('Successfully deleted project.');
      }
    });
  }

  private createManageProjectModal(isEditTask: boolean, project?: IProjectModel): MatDialogRef<ManageProjectComponent> {
    return this._matDialog.open(ManageProjectComponent, {
      data: { isEdit: isEditTask, project } as IManageProject,
    });
  }

  private createConfirmModal(data: IConfirmModal): MatDialogRef<ConfirmModalComponent> {
    return this._matDialog.open(ConfirmModalComponent, {
      data,
    });
  }
}
