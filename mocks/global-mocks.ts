import { of } from 'rxjs';

export const activatedRouteMock: ReturnType<jest.Mock> = {
  queryParams: of({}),
};


export const routerMock: ReturnType<jest.Mock> = {
  navigate: jest.fn().mockReset(),
};

export const matDialogRefMock: ReturnType<jest.Mock> = {
  close: jest.fn().mockReset(),
};

export const firstLetterUppercaseMock: ReturnType<jest.Mock> = {
  transform: (value: string) => value,
};

export const elementRefMock: ReturnType<jest.Mock> = {
  nativeElement: {
    contains: (value: boolean) => value,
  },
};

export const loggerMock: ReturnType<jest.Mock> = {
  error: (error: Error, ...params: any[]) => jest.fn(),
  warn: (error: Error, ...params: any[]) => jest.fn(),
  info: (error: Error, ...params: any[]) => jest.fn(),
  success: (error: Error, ...params: any[]) => jest.fn(),
};
