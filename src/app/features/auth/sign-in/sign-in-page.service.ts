import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { AppRoutes } from '../../../app.routes';
import { SignInRequest } from '@core/api/identity-client.service';
import { IdentityService } from '@core/services/identity.service';

@Injectable()
export class SignInPageService {
  constructor(
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _identityService: IdentityService,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  public signIn(payload: SignInRequest): void {
    this._identityService
      .signIn(payload, AppRoutes.home.absolutePath);
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
