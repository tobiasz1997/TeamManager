import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInPageService } from '@features/auth/sign-in/sign-in-page.service';
import { ControlsOf } from '@shared/types/controls-of.type';
import { passwordValidator } from '@shared/validators/password.validator';
import { SignInRequest } from '@core/api/identity-client.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.sass'],
})
export class SignInPageComponent {
  public formGroup: FormGroup;

  constructor(private readonly _signInPageService: SignInPageService) {
    this.buildForm();
  }

  public backToPreviousPage(): void {
    this._signInPageService.navigateBack();
  }

  public handleSubmit(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      this._signInPageService.showErrorMessage('Invalid form.');
      return;
    }

    this._signInPageService.signIn(this.formGroup.value);
  }

  public handleForgotPassword(): void {
    this._signInPageService.navigateToForgotPasswordPage();
  }

  public handleCreateAccount(): void {
    this._signInPageService.navigateToCreateAccountPage();
  }

  private buildForm(): void {
    this.formGroup = new FormGroup<ControlsOf<SignInRequest>>(
      {
        email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email]),
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, passwordValidator]),
        ),
      },
      {
        updateOn: 'submit',
      },
    );
  }
}
