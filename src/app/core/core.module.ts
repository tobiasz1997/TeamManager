import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { HeaderComponent } from './components/header/header.component';
import { BlankLayoutComponent } from './components/layouts/blank-layout/blank-layout.component';
import { FullLayoutComponent } from './components/layouts/full-layout/full-layout.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    BlankLayoutComponent,
    FullLayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
})
export class CoreModule {}
