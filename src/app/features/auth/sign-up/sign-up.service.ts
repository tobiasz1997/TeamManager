import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ISignInModel } from '@core/models/sign-in.model';
import { ISignUpModel } from '@core/models/sign-up.model';
import { AuthService } from '@core/services/auth.service';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { AppRoutes } from '../../../app.routes';

@Injectable()
export class SignUpService {
  constructor(
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _authService: AuthService,
    private readonly _loggerMessageService: LoggerMessagesService
  ) {}

  public signUp(payload: ISignUpModel): void {
    this._authService
      .signUp(payload)
      .then(() => {
        this._loggerMessageService.successMsg('Successfully created account.');
        void this._router.navigate([AppRoutes.signIn.absolutePath]);
      })
      .catch(error =>
        this._loggerMessageService.errorMsg(
          error,
          'Something went wrong. Please try again.'
        )
      );
  }

  public navigateBack(): void {
    this._location.back();
  }

  public showWarningMessage(message: string): void {
    this._loggerMessageService.warnMsg(message);
  }

  public showSuccessMessage(message: string): void {
    this._loggerMessageService.successMsg(message);
  }
}
