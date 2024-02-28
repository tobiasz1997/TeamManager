import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInPageComponent } from '@features/auth/sign-in/sign-in-page.component';
import { SignInPageService } from '@features/auth/sign-in/sign-in-page.service';
import { SharedModule } from '@shared/shared.module';
import { SignInPageRoutingModule } from './sign-in-page-routing.module';

@NgModule({
  imports: [SignInPageRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [SignInPageComponent],
  providers: [SignInPageService],
})
export class SignInPageModule {
}
