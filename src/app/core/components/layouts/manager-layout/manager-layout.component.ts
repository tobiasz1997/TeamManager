import { Component } from '@angular/core';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { ToastAnimation } from '@shared/components/toast/toast.animation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { LocalStorageKeys } from '@shared/constants/local-storage-keys';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.sass'],
  animations: [ToastAnimation.toastAnimation, trigger('openClose', [
    state('true', style({ 'padding-left': '16rem' })),
    state('false', style({ 'padding-left': '3rem' })),
    transition('false <=> true', animate(500)),
  ])],
})
export class ManagerLayoutComponent {
  public isSidebarOpen = true;
  public errorMessage$ = this._loggerMessageService.errorMessage$;

  constructor(
    private readonly _loggerMessageService: LoggerMessagesService,
    private readonly _localStorageService: LocalStorageService,
  ) {
    let isSidebarOpenStorageValue = this._localStorageService.get<boolean | undefined>(LocalStorageKeys.SidebarOpenKey);
    this.isSidebarOpen = isSidebarOpenStorageValue ?? true;
  }

  public handleSidebarOpen(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this._localStorageService.set(LocalStorageKeys.SidebarOpenKey, this.isSidebarOpen);
  }

  public handleCloseLoggerMessage(): void {
    this._loggerMessageService.clearErrorMessage();
  }
}
