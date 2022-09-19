import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ISignInModel } from '@core/models/sign-in.model';
import { AuthService } from '@core/services/auth.service';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { AppRoutes } from '../../../app.routes';

@Injectable()
export class SignInService {
  constructor(
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _authService: AuthService,
    private readonly _loggerMessageService: LoggerMessagesService
  ) {}

  public signIn(payload: ISignInModel): void {
    this._authService
      .signIn(payload)
      .then(() => {
        this._loggerMessageService.successMsg('Successfully log in.');
        void this._router.navigate([AppRoutes.home.absolutePath]);
      })
      .catch(error =>
        this._loggerMessageService.errorMsg(
          error,
          'Something went wrong. Please try again.'
        )
      );
  }

  public navigateToCreateAccountPage(): void {
    void this._router.navigate([AppRoutes.signUp.absolutePath]);
  }

  public navigateToForgotPasswordPage(): void {
    this._loggerMessageService.warnMsg('Forgot password page is not ready.');
  }

  public navigateBack(): void {
    this._location.back();
  }

  public showErrorMessage(message: string): void {
    this._loggerMessageService.warnMsg(message);
  }
}
