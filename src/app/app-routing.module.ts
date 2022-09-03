import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from "./app.routes";
import { BlankLayoutComponent } from "./core/components/layouts/blank-layout/blank-layout.component";
import { FullLayoutComponent } from "./core/components/layouts/full-layout/full-layout.component";

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: AppRoutes.home.path,
        pathMatch: 'full',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: AppRoutes.login.path,
        loadChildren: () => import('./features/auth/sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: AppRoutes.tasks.path,
        loadChildren: () => import('./features/manager/tasks/tasks.module').then(m => m.TasksModule)
      }
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
