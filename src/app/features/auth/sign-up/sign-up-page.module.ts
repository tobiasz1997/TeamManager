import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from '@features/auth/sign-up/sign-up-routing.module';
import { SignUpPageComponent } from '@features/auth/sign-up/sign-up-page.component';
import { SignUpPageService } from '@features/auth/sign-up/sign-up-page.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SignUpRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [SignUpPageComponent],
  providers: [SignUpPageService],
})
export class SignUpPageModule {
}
