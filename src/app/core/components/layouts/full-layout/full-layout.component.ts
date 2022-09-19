import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastAnimation } from '@shared/components/toast/toast.animation';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.sass'],
  animations: [ToastAnimation.toastAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullLayoutComponent {
  public errorMessage$ = this._loggerMessageService.errorMessage$;

  constructor(private readonly _loggerMessageService: LoggerMessagesService) {}

  public handleCloseLoggerMessage(): void {
    this._loggerMessageService.clearErrorMessage();
  }
}
