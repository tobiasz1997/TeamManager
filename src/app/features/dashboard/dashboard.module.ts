import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "@features/dashboard/dashboard-routing.module";
import { DashboardComponent } from "@features/dashboard/dashboard.component";
import { SharedModule } from "@shared/shared.module";
import { ShapeDividerSvgComponent } from './components/shape-divider-svg/shape-divider-svg.component';
import { DashboardWelcomeComponent } from './components/dashboard-welcome/dashboard-welcome.component';
import { DashboardAppFeaturesComponent } from './components/dashboard-app-features/dashboard-app-features.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    ShapeDividerSvgComponent,
    DashboardWelcomeComponent,
    DashboardAppFeaturesComponent
  ]
})
export class DashboardModule {}
