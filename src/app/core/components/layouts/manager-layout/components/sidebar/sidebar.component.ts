import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  HeaderActionButtonsEnum,
} from '@core/components/layouts/full-layout/components/header/enums/header-action-buttons.enum';
import { Router } from '@angular/router';
import { IdentityService } from '@core/services/identity.service';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { WindowPropsService } from '@shared/services/window-props.service';
import { HeaderAnimations } from '@shared/components/header/animations/header.animation';
import { AppRoutes } from '../../../../../../app.routes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IRoute } from '@shared/interfaces/route.interface';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'tm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
  animations: [HeaderAnimations.panelAnimation, trigger('openClose', [
    state('true', style({ width: '16rem' })),
    state('false', style({ width: '3rem' })),
    transition('false <=> true', animate(500)),
  ])],
})
export class SidebarComponent {
  @Input() isSidebarOpen: boolean;
  @Output() onSidebarMove = new EventEmitter<void>();

  public isMobileMenuOpen = false;
  public activePanel: HeaderActionButtonsEnum = null;
  public readonly ActiveButtonsEnum = HeaderActionButtonsEnum;
  public readonly isLoggedIn$ = this._identityService.isAuthenticated$;
  public readonly identity$ = this._userService.user$;
  public readonly breakpoint$ = this._windowPropsService.breakpoint$;
  public readonly isSM$ = this._windowPropsService.isSM$;

  public readonly sidebarMenuRoutes: Array<{ route: IRoute, icon: string }> = [
    { route: AppRoutes.home, icon: 'home' },
    { route: AppRoutes.tasks, icon: 'task' },
    { route: AppRoutes.timers, icon: 'access_time' },
    { route: AppRoutes.profile, icon: 'account_circle' },
  ];

  constructor(
    private readonly _router: Router,
    private readonly _identityService: IdentityService,
    private readonly _userService: UserService,
    private readonly _loggerMessageService: LoggerMessagesService,
    private readonly _windowPropsService: WindowPropsService,
  ) {
  }

  public setActivePanel(value: HeaderActionButtonsEnum | null): void {
    if (value === null) {
      this.activePanel = null;
      return;
    }
    this.activePanel = this.activePanel === value ? null : value;
  }

  public handleSidebarOpen(): void {
    this.onSidebarMove.emit();
  }

  public isActiveUrl(path: string): boolean {
    return path === '' ? false : this._router.url.includes(path);
  }

  public handleMobileSidebar(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public async handleRouteClick(path: string, mobile = false): Promise<void> {
    if (mobile) this.isMobileMenuOpen = !this.isMobileMenuOpen;
    await this._router.navigate([path]);
  }

  public async handleLogout(): Promise<void> {
    this._identityService
      .logout()
      .then(() => {
        this._loggerMessageService.successMsg('Successfully logged out.');
        this._router.navigate([AppRoutes.home.absolutePath]);
      })
      .catch(error =>
        this._loggerMessageService.errorMsg(
          error,
          'Something went wrong. Please try again.',
        ),
      );
  }
}
