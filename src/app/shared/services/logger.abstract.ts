export abstract class Logger {
  abstract error(error: Error, ...params: any[]): void;
  abstract warn(message: string, ...params: any[]): void;
  abstract info(message: string, ...params: any[]): void;
  abstract success(message: string, ...params: any[]): void;
}
