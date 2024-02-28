import { NgModule } from '@angular/core';
import { TasksPageComponent } from '@features/manager/tasks/tasks-page.component';
import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TasksPageService } from '@features/manager/tasks/tasks-page.service';
import { TaskComponent } from './components/task/task.component';
import { TasksListHeaderComponent } from './components/tasks-list-header/tasks-list-header.component';
import { ManageTaskComponent } from './components/manage-task/manage-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskStatusToTextPipe } from './pipes/task-status-to-text.pipe';
import { LoadMoreButtonComponent } from './components/load-more-button/load-more-button.component';

@NgModule({
  imports: [TasksPageRoutingModule, SharedModule, DragDropModule, CommonModule, MatDialogModule, ReactiveFormsModule],
  declarations: [TasksPageComponent, TaskComponent, TasksListHeaderComponent, ManageTaskComponent, TaskStatusToTextPipe, LoadMoreButtonComponent],
  providers: [TasksPageService],
})
export class TasksPageModule {
}
