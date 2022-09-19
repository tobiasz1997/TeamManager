import { LoggerMessageEnum } from '@shared/enums/logger-message.enum';

export interface ILoggerMessage {
  type: LoggerMessageEnum;
  message: string;
}
