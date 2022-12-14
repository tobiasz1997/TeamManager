import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  @Input() isSidebarOpen: boolean;
  @Output() onSidebarMove = new EventEmitter<void>();

  public isMobileMenuOpen = false;
  public activePanel: HeaderActionButtonsEnum = null;
  public readonly ActiveButtonsEnum = HeaderActionButtonsEnum;
  public readonly isLoggedIn$ = this._identityService.isAuthenticated$;
  public readonly identity$ = this._identityService.identity$;
  public readonly breakpoint$ = this._windowPropsService.breakpoint$;
  public readonly isSM$ = this._windowPropsService.isSM$;

  public readonly sidebarMenuRoutes: Array<{ route: IRoute, icon: string }> = [
    { route: AppRoutes.home, icon: 'home' },
    { route: AppRoutes.tasks, icon: 'task' },
    { route: AppRoutes.bundy, icon: 'access_time' },
    { route: AppRoutes.profile, icon: 'account_circle' },
  ];

  get activeUrl() {
    return this._router.url;
  }

  constructor(
    private readonly _router: Router,
    private readonly _identityService: IdentityService,
    private readonly _loggerMessageService: LoggerMessagesService,
    private readonly _windowPropsService: WindowPropsService,
  ) {
  }

  ngOnInit(): void {
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

  public handleMobileSidebar(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public async handleRouteClick(path: string): Promise<void> {
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
