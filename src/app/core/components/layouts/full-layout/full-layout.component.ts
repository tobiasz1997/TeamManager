import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastAnimation } from '@shared/components/toast/toast.animation';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.sass'],
  animations: [ToastAnimation.toastAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullLayoutComponent implements OnInit {
  public errorMessage$ = this._loggerMessageService.errorMessage$;

  constructor(
    private readonly _loggerMessageService: LoggerMessagesService,
    private readonly _userService: UserService,
  ) {
  }

  ngOnInit() {
    this._userService.loadData();
  }

  public handleCloseLoggerMessage(): void {
    this._loggerMessageService.clearErrorMessage();
  }
}
