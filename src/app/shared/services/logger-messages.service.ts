import { Injectable } from '@angular/core';
import { Logger } from '@shared/services/logger.abstract';
import { Subject } from 'rxjs';
import { LoggerMessageEnum } from '@shared/enums/logger-message.enum';
import { ILoggerMessage } from '@shared/interfaces/logger.interface';

@Injectable({
  providedIn: 'root',
})
export class LoggerMessagesService {
  public timeToCloseMessage = 5_000;

  constructor(private readonly _logger: Logger) {
  }

  private _timeout: NodeJS.Timeout | undefined = undefined;

  private _message$ = new Subject<ILoggerMessage | null>();

  get message$(): Subject<ILoggerMessage | null> {
    return this._message$;
  }

  public errorMsg(error: Error, message: string, ...params: any[]): void {
    this._logger.error(error, params);
    this._message$.next({ type: LoggerMessageEnum.Error, message });
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() => this.clearErrorMessage(), this.timeToCloseMessage);
  }

  public infoMsg(message: string, ...params: any[]): void {
    this._logger.info(message, params);
    this._message$.next({ type: LoggerMessageEnum.Info, message });
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() => this.clearErrorMessage(), this.timeToCloseMessage);
  }

  public warnMsg(message: string, ...params: any[]): void {
    this._logger.warn(message, params);
    this._message$.next({ type: LoggerMessageEnum.Warning, message });
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() => this.clearErrorMessage(), this.timeToCloseMessage);
  }

  public successMsg(message: string, ...params: any[]): void {
    this._logger.success(message, params);
    this._message$.next({ type: LoggerMessageEnum.Success, message });
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() => this.clearErrorMessage(), this.timeToCloseMessage);
  }

  public clearErrorMessage(): void {
    clearTimeout(this._timeout);
    this._message$.next(null);
  }
}
