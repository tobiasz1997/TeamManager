import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from '@features/auth/sign-up/sign-up-page.component';

const SignUpPageRoutes: Routes = [
  {
    path: '',
    component: SignUpPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(SignUpPageRoutes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {
}
