import { NgModule } from '@angular/core';
import { TasksComponent } from '@features/manager/tasks/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TasksService } from '@features/manager/tasks/tasks.service';
import { TaskComponent } from './components/task/task.component';
import { TasksListHeaderComponent } from './components/tasks-list-header/tasks-list-header.component';
import { ManageTaskComponent } from './components/manage-task/manage-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskStatusToTextPipe } from './pipes/task-status-to-text.pipe';
import { LoadMoreButtonComponent } from './components/load-more-button/load-more-button.component';

@NgModule({
  imports: [TasksRoutingModule, SharedModule, DragDropModule, CommonModule, MatDialogModule, ReactiveFormsModule],
  declarations: [TasksComponent, TaskComponent, TasksListHeaderComponent, ManageTaskComponent, TaskStatusToTextPipe, LoadMoreButtonComponent],
  providers: [TasksService],
})
export class TasksModule {
}
