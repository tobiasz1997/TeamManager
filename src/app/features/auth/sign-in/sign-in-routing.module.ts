import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./sign-in.component";

const SignInRoutes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(SignInRoutes)],
  exports: [RouterModule]
})
export class SignInRoutingModule {}
