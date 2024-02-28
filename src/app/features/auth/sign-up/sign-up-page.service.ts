import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { AppRoutes } from '../../../app.routes';
import { SignUpRequest } from '@core/api/identity-client.service';
import { IdentityService } from '@core/services/identity.service';

@Injectable()
export class SignUpPageService {
  constructor(
    private readonly _location: Location,
    private readonly _identityService: IdentityService,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  public signUp(payload: SignUpRequest): void {
    this._identityService
      .signUp(payload, AppRoutes.signIn.absolutePath);
  }

  public navigateBack(): void {
    this._location.back();
  }

  public showWarningMessage(message: string): void {
    this._loggerMessageService.warnMsg(message);
  }
}
