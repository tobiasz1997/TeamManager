import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../../../app.routes';

const TimersRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./timers-page/timers-page.module').then(m => m.TimersPageModule),
  },
  {
    path: AppRoutes.projects.path,
    loadChildren: () => import('./projects-page/projects-page.module').then(m => m.ProjectsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(TimersRoutes)],
  exports: [RouterModule],
})
export class TimersRoutingModule {
}
