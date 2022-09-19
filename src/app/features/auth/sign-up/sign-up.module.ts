import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from '@features/auth/sign-up/sign-up-routing.module';
import { SignUpComponent } from '@features/auth/sign-up/sign-up.component';
import { SignUpService } from '@features/auth/sign-up/sign-up.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SignUpRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [SignUpComponent],
  providers: [SignUpService],
})
export class SignUpModule {}
