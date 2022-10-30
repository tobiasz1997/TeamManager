import { NgModule } from '@angular/core';
import { TasksComponent } from '@features/manager/tasks/tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [TasksRoutingModule, SharedModule],
  declarations: [TasksComponent],
})
export class TasksModule {
}
