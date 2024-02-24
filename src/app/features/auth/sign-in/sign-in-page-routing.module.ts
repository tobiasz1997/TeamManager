import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in-page.component';

const SignInPageRoutes: Routes = [
  {
    path: '',
    component: SignInPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(SignInPageRoutes)],
  exports: [RouterModule],
})
export class SignInPageRoutingModule {
}
