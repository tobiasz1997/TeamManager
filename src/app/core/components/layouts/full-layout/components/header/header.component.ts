import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  HeaderActionButtonsEnum,
} from '@core/components/layouts/full-layout/components/header/enums/header-action-buttons.enum';
import { IdentityService } from '@core/services/identity.service';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { AppRoutes } from '../../../../../../app.routes';
import { HeaderAnimations } from '@shared/components/header/animations/header.animation';
import { ProfileService } from '@core/services/profile.service';

@Component({
  selector: 'tm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  animations: [HeaderAnimations.panelAnimation],
})
export class HeaderComponent {
  public activePanel: HeaderActionButtonsEnum = null;
  public readonly ActiveButtonsEnum = HeaderActionButtonsEnum;
  public readonly isLoggedIn$ = this._identityService.isAuthenticated$;
  public readonly identity$ = this._profileService.profile$;

  constructor(
    private readonly _router: Router,
    private readonly _profileService: ProfileService,
    private readonly _identityService: IdentityService,
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  public setActivePanel(value: HeaderActionButtonsEnum | null): void {
    if (value === null) {
      this.activePanel = null;
      return;
    }
    this.activePanel = this.activePanel === value ? null : value;
  }

  public async handleSignIn(): Promise<void> {
    await this._router.navigate([AppRoutes.signIn.absolutePath]);
  }

  public async handleNavigateToManager(): Promise<void> {
    await this._router.navigate([AppRoutes.tasks.absolutePath]);
  }

  public async handleSignUp(): Promise<void> {
    await this._router.navigate([AppRoutes.signUp.absolutePath]);
  }

  public async handleLogout(): Promise<void> {
    this._identityService
      .logout()
      .then(() => {
        this._loggerMessageService.successMsg('Successfully logged out.');
        this.setActivePanel(HeaderActionButtonsEnum.Profile);
      })
      .catch(error =>
        this._loggerMessageService.errorMsg(
          error,
          'Something went wrong. Please try again.',
        ),
      );
  }
}
