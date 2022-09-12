import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TasksComponent } from "./tasks.component";

const TasksRoutes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(TasksRoutes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
