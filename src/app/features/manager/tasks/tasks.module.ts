import { NgModule } from '@angular/core';
import { TasksComponent } from '@features/manager/tasks/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [TasksRoutingModule],
  declarations: [TasksComponent],
})
export class TasksModule {}
