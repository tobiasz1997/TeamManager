import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastAnimation } from '@shared/components/toast/toast.animation';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.sass'],
  animations: [ToastAnimation.toastAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankLayoutComponent {
  public message$ = this._loggerMessageService.message$;

  constructor(
    private readonly _loggerMessageService: LoggerMessagesService,
  ) {
  }

  public handleCloseLoggerMessage(): void {
    this._loggerMessageService.clearErrorMessage();
  }

}
