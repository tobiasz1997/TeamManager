import { Logger } from "@shared/services/logger.abstract";

export class StageLoggerService implements Logger {

  constructor() { }

  public error(error: Error, message: string, ...params: any[]): void {
    console.error(message, error);
  }

  public info(message: string, ...params: any[]): void {
    // tslint:disable-next-line:no-console
    console.info(message);
  }

  public warn(message: string, ...params: any[]): void {
    console.warn(message);
  }

  public success(message: string, ...params: any[]): void {
    console.log(message);
  }
}
