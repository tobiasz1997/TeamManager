import { Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignUpModel } from '@core/models/sign-up.model';
import { SignUpService } from '@features/auth/sign-up/sign-up.service';
import { ControlsOf } from '@shared/components/types/controls-of.type';
import { FormPasswordRulesMessage } from '@shared/constants/form-error-messages';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { matchedPasswordsValidator } from '@shared/validators/matched-passwords.validator';
import { passwordValidator } from '@shared/validators/password.validator';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AppRoutes } from '../../../app.routes';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent {
  public formGroup: FormGroup;
  public readonly formPasswordRulesMessage = FormPasswordRulesMessage;

  private _isImageIncorrect = false;
  private _imageUrl: string = null;
  private _destroy$ = new Subject<void>();

  get imageUrl(): string {
    return this._imageUrl;
  }

  get isImageIncorrect(): boolean {
    return this._isImageIncorrect;
  }

  constructor(
    private readonly _signUpService: SignUpService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this.buildForm();
    this.subscribeToAvatarInputChanges();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public backToPreviousPage(): void {
    this._signUpService.navigateBack();
  }

  public handleSubmit(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      this._signUpService.showWarningMessage('Invalid form.');
      return;
    }
    this._signUpService.signUp(this.formGroup.value);
  }

  public handleImageError(event: Event): void {
    if (event.type === 'error') {
      this.formGroup.controls.avatar.setErrors({ urlImage: true });
      this._isImageIncorrect = true;
    }
  }

  private subscribeToAvatarInputChanges(): void {
    this.formGroup.controls.avatar.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(value => {
        console.log(value);
        this._isImageIncorrect = false;
        this._imageUrl = value || null;
        this._changeDetectorRef.detectChanges();
      });
  }

  private buildForm(): void {
    this.formGroup = new FormGroup<
      ControlsOf<ISignUpModel & { repeatPassword: string }>
    >(
      {
        firstName: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        lastName: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, passwordValidator])
        ),
        repeatPassword: new FormControl(
          '',
          Validators.compose([Validators.required, passwordValidator])
        ),
        avatar: new FormControl(null, { updateOn: 'change' }),
      },
      {
        updateOn: 'submit',
        validators: [matchedPasswordsValidator('password', 'repeatPassword')],
      }
    );
  }
}
