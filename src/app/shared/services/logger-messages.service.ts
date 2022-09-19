import { Injectable } from '@angular/core';
import { Logger } from '@shared/services/logger.abstract';
import { Subject } from 'rxjs';
import { LoggerMessageEnum } from '@shared/enums/logger-message.enum';
import { ILoggerMessage } from '@shared/interfaces/logger.interface';

@Injectable({
  providedIn: 'root',
})
export class LoggerMessagesService {
  private _errorMessage$ = new Subject<ILoggerMessage | null>();
  private _timeout: NodeJS.Timeout | undefined = undefined;

  get errorMessage$(): Subject<ILoggerMessage | null> {
    return this._errorMessage$;
  }

  constructor(private readonly _logger: Logger) {}

  public errorMsg(error: Error, message: string, ...params: any[]): void {
    this._logger.error(error, params);
    this._errorMessage$.next({ type: LoggerMessageEnum.Error, message });
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() => this.clearErrorMessage(), 5000);
  }

  public infoMsg(message: string, ...params: any[]): void {
    this._logger.info(message, params);
    this._errorMessage$.next({ type: LoggerMessageEnum.Info, message });
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() => this.clearErrorMessage(), 5000);
  }

  public warnMsg(message: string, ...params: any[]): void {
    this._logger.warn(message, params);
    this._errorMessage$.next({ type: LoggerMessageEnum.Warning, message });
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() => this.clearErrorMessage(), 5000);
  }

  public successMsg(message: string, ...params: any[]): void {
    this._logger.success(message, params);
    this._errorMessage$.next({ type: LoggerMessageEnum.Success, message });
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(() => this.clearErrorMessage(), 5000);
  }

  public clearErrorMessage(): void {
    clearTimeout(this._timeout);
    this._errorMessage$.next(null);
  }
}
