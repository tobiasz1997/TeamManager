import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpPageService } from '@features/auth/sign-up/sign-up-page.service';
import { ControlsOf } from '@shared/types/controls-of.type';
import { FormPasswordRulesMessage } from '@shared/constants/form-error-messages';
import { matchedPasswordsValidator } from '@shared/validators/matched-passwords.validator';
import { passwordValidator } from '@shared/validators/password.validator';
import { SignUpRequest } from '@core/api/identity-client.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.sass'],
})
export class SignUpPageComponent {
  public formGroup: FormGroup;
  public readonly formPasswordRulesMessage = FormPasswordRulesMessage;


  constructor(
    private readonly _signUpPageService: SignUpPageService,
  ) {
    this.buildForm();
  }

  public backToPreviousPage(): void {
    this._signUpPageService.navigateBack();
  }

  public handleSubmit(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      this._signUpPageService.showWarningMessage('Invalid form.');
      return;
    }
    this._signUpPageService.signUp(this.formGroup.value);
  }

  private buildForm(): void {
    this.formGroup = new FormGroup<ControlsOf<SignUpRequest & { repeatPassword: string }>>(
      {
        firstName: new FormControl(
          '',
          Validators.compose([Validators.required]),
        ),
        lastName: new FormControl(
          '',
          Validators.compose([Validators.required]),
        ),
        email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email]),
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, passwordValidator]),
        ),
        repeatPassword: new FormControl(
          '',
          Validators.compose([Validators.required, passwordValidator]),
        ),
      },
      {
        updateOn: 'submit',
        validators: [matchedPasswordsValidator('password', 'repeatPassword')],
      },
    );
  }
}
