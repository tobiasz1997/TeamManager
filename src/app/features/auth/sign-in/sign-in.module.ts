import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from '@features/auth/sign-in/sign-in.component';
import { SignInService } from '@features/auth/sign-in/sign-in.service';
import { SharedModule } from '@shared/shared.module';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
  imports: [SignInRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [SignInComponent],
  providers: [SignInService],
})
export class SignInModule {}
