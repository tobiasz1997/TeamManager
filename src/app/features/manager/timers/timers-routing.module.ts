import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimersComponent } from '@features/manager/timers/timers.component';
import { AppRoutes } from '../../../app.routes';

const TimersRoutes: Routes = [
  {
    path: '',
    component: TimersComponent,
  },
  {
    path: AppRoutes.projects.path,
    loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(TimersRoutes)],
  exports: [RouterModule],
})
export class TimersRoutingModule {
}
