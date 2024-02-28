import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardPageRoutingModule } from '@features/dashboard/dashboard-page-routing.module';
import { DashboardPageComponent } from '@features/dashboard/dashboard-page.component';
import { SharedModule } from '@shared/shared.module';
import { ShapeDividerSvgComponent } from './components/shape-divider-svg/shape-divider-svg.component';
import { DashboardWelcomeComponent } from './components/dashboard-welcome/dashboard-welcome.component';
import { DashboardAppFeaturesComponent } from './components/dashboard-app-features/dashboard-app-features.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    DashboardPageRoutingModule,
  ],
  declarations: [
    DashboardPageComponent,
    ShapeDividerSvgComponent,
    DashboardWelcomeComponent,
    DashboardAppFeaturesComponent,
  ],
})
export class DashboardPageModule {
}
