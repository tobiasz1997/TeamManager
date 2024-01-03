import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInjector } from '@shared/services/app-injector.service';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { identityInterceptor } from '@core/interceptors/identity.interceptor';
import { loaderInterceptor } from '@core/interceptors/loader.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [identityInterceptor, loaderInterceptor],
})
export class AppModule implements DoBootstrap {
  constructor(
    private readonly injector: Injector,
  ) {
    AppInjector.injector = this.injector;
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.bootstrap(AppComponent);
  }
}
