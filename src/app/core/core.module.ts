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
import { API_BASE_URL } from '@core/api/share';
import { AssignmentClient } from '@core/api/assignment-client.service';
import { IdentityClient } from '@core/api/identity-client.service';
import { ProjectClient } from '@core/api/project-client.service';
import { TimerClient } from '@core/api/timer-client.service';
import { UserClient } from '@core/api/user-client.service';
import { environment } from '@environment/environment';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, MatProgressSpinnerModule],
  declarations: [
    BlankLayoutComponent,
    FullLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ManagerLayoutComponent,
    SidebarComponent,
    PageNotFoundComponent,
    PageLoaderComponent,
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.baseApiUrl,
    },
    AssignmentClient,
    IdentityClient,
    ProjectClient,
    TimerClient,
    UserClient,
  ],
})
export class CoreModule {
}
