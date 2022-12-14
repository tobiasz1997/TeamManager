import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerLayoutComponent } from '@core/components/layouts/manager-layout/manager-layout.component';
import { AppRoutes } from './app.routes';
import { BlankLayoutComponent } from '@core/components/layouts/blank-layout/blank-layout.component';
import { FullLayoutComponent } from '@core/components/layouts/full-layout/full-layout.component';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: AppRoutes.home.path,
        pathMatch: 'full',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            m => m.DashboardModule,
          ),
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: AppRoutes.signIn.path,
        loadChildren: () =>
          import('./features/auth/sign-in/sign-in.module').then(
            m => m.SignInModule,
          ),
      },
      {
        path: AppRoutes.signUp.path,
        loadChildren: () =>
          import('./features/auth/sign-up/sign-up.module').then(
            m => m.SignUpModule,
          ),
      },
    ],
  },
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      {
        path: AppRoutes.tasks.path,
        loadChildren: () =>
          import('./features/manager/tasks/tasks.module').then(
            m => m.TasksModule,
          ),
      },
      {
        path: AppRoutes.profile.path,
        loadChildren: () =>
          import('./features/manager/profile/profile.module').then(
            m => m.ProfileModule,
          ),
      },
    ],
  },
  {
    path: '**', pathMatch: 'full',
    component: BlankLayoutComponent,
    children: [
      {
        path: '',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
