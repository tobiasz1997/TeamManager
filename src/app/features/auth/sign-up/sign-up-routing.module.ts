import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from '@features/auth/sign-up/sign-up.component';

const SignUpRoutes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(SignUpRoutes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
