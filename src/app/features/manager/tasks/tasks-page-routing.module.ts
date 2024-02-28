import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './tasks-page.component';

const TasksPageRoutes: Routes = [
  {
    path: '',
    component: TasksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(TasksPageRoutes)],
  exports: [RouterModule],
})
export class TasksPageRoutingModule {
}
