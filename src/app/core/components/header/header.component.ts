import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderAnimations } from '@core/components/header/animations/header.animation';
import { HeaderActionButtonsEnum } from '@core/components/header/enums/header-action-buttons.enum';
import { IdentityService } from '@core/services/identity.service';
import { AppRoutes } from '../../../app.routes';

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

  constructor(
    private readonly _router: Router,
    private readonly _identityService: IdentityService
  ) {}

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

  public async handleSignUp(): Promise<void> {
    await this._router.navigate([AppRoutes.signUp.absolutePath]);
  }

  public async handleLogout(): Promise<void> {
    this._identityService.logout();
    this.setActivePanel(HeaderActionButtonsEnum.Profile);
  }
}
