import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@core/components/layouts/full-layout/components/footer/footer.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './components/layouts/full-layout/components/header/header.component';
import { BlankLayoutComponent } from './components/layouts/blank-layout/blank-layout.component';
import { FullLayoutComponent } from './components/layouts/full-layout/full-layout.component';
import { ManagerLayoutComponent } from './components/layouts/manager-layout/manager-layout.component';
import { SidebarComponent } from './components/layouts/manager-layout/components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [
    BlankLayoutComponent,
    FullLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ManagerLayoutComponent,
    SidebarComponent,
    PageNotFoundComponent,
  ],
  providers: [],
})
export class CoreModule {
}
