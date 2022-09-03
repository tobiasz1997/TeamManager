import { NgModule } from "@angular/core";
import { SignInComponent } from "@features/auth/sign-in/sign-in.component";
import { SignInRoutingModule } from "./sign-in-routing.module";

@NgModule({
  imports: [
    SignInRoutingModule,
  ],
  declarations: [
    SignInComponent
  ]
})
export class SignInModule {}
