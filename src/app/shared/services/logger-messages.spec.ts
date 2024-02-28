import { loggerMock } from '@mocks/global-mocks';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { fakeAsync, tick } from '@angular/core/testing';
import { ILoggerMessage } from '@shared/interfaces/logger.interface';
import { LoggerMessageEnum } from '@shared/enums/logger-message.enum';

describe('LoggerMessagesService', () => {
  const message = 'testMessage';
  const timeout = 50;
  let service: LoggerMessagesService;
  let logger = loggerMock;

  beforeEach(() => {
    service = new LoggerMessagesService(logger);
    service.timeToCloseMessage = timeout;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return error message', fakeAsync(() => {
    const method = jest.spyOn(service.message$, 'next').mockReset();
    service.errorMsg(new Error(), message);
    tick(timeout);
    expect(method).toHaveBeenCalledWith({ message, type: LoggerMessageEnum.Error } as ILoggerMessage);
  }));

  it('should return success message', fakeAsync(() => {
    const method = jest.spyOn(service.message$, 'next').mockReset();
    service.successMsg(message);
    tick(timeout);
    expect(method).toHaveBeenCalledWith({ message, type: LoggerMessageEnum.Success } as ILoggerMessage);
  }));

  it('should return warning message', fakeAsync(() => {
    const method = jest.spyOn(service.message$, 'next').mockReset();
    service.warnMsg(message);
    tick(timeout);
    expect(method).toHaveBeenCalledWith({ message, type: LoggerMessageEnum.Warning } as ILoggerMessage);
  }));

  it('should return info message', fakeAsync(() => {
    const method = jest.spyOn(service.message$, 'next').mockReset();
    service.infoMsg(message);
    tick(timeout);
    expect(method).toHaveBeenCalledWith({ message, type: LoggerMessageEnum.Info } as ILoggerMessage);
  }));
});
