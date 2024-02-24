import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from '@features/dashboard/dashboard-page.component';


const DashboardPageRoutes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(DashboardPageRoutes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {
}
