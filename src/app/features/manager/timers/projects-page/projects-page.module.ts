import { NgModule } from '@angular/core';
import { ProjectsPageComponent } from '@features/manager/timers/projects-page/projects-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsPageService } from '@features/manager/timers/projects-page/projects-page.service';
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
    component: ProjectsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProjectsRoutes), SharedModule, CommonModule, MatDialogModule, ReactiveFormsModule],
  declarations: [ProjectsPageComponent, ProjectsHeaderComponent, ProjectComponent, ManageProjectComponent],
  providers: [ProjectsPageService],
})
export class ProjectsPageModule {
}

