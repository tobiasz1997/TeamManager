import { NgModule } from '@angular/core';
import { TasksComponent } from '@features/manager/tasks/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TasksService } from '@features/manager/tasks/tasks.service';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  imports: [TasksRoutingModule, SharedModule, DragDropModule, CommonModule],
  declarations: [TasksComponent, TaskComponent],
  providers: [TasksService],
})
export class TasksModule {
}
