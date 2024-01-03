import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '@features/auth/sign-in/sign-in.service';
import { ControlsOf } from '@shared/components/types/controls-of.type';
import { passwordValidator } from '@shared/validators/password.validator';
import { SignInRequest } from '@core/api/identity-client.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent {
  public formGroup: FormGroup;

  constructor(private readonly _signInService: SignInService) {
    this.buildForm();
  }

  public backToPreviousPage(): void {
    this._signInService.navigateBack();
  }

  public async handleSubmit(): Promise<void> {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      this._signInService.showErrorMessage('Invalid form.');
      return;
    }

    await this._signInService.signIn(this.formGroup.value);
  }

  public handleForgotPassword(): void {
    this._signInService.navigateToForgotPasswordPage();
  }

  public handleCreateAccount(): void {
    this._signInService.navigateToCreateAccountPage();
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
