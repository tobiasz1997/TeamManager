import { NgModule } from '@angular/core';
import { ProjectsComponent } from '@features/manager/timers/pages/projects/projects.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsService } from '@features/manager/timers/pages/projects/projects.service';
import { ProjectsHeaderComponent } from './components/projects-header/projects-header.component';
import { SharedModule } from '@shared/shared.module';
import { ProjectComponent } from './components/project/project.component';
import { CommonModule } from '@angular/common';
import { ManageProjectComponent } from './components/manage-project/manage-project.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

const ProjectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProjectsRoutes), SharedModule, CommonModule, MatDialogModule, ReactiveFormsModule],
  declarations: [ProjectsComponent, ProjectsHeaderComponent, ProjectComponent, ManageProjectComponent],
  providers: [ProjectsService],
})
export class ProjectsModule {
}

