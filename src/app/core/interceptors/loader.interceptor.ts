import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private readonly _loaderService: LoaderService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loaderService.setLoading(true, request.url);
    return next.handle(request)
      .pipe(catchError((err) => {
        this._loaderService.setLoading(false, request.url);
        return throwError(() => err);
      }))
      .pipe(map<unknown, any>((evt: unknown) => {
        if (evt instanceof HttpResponse) {
          this._loaderService.setLoading(false, request.url);
        }
        return evt;
      }));
  }
}

export const loaderInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoaderInterceptor,
  multi: true,
};
