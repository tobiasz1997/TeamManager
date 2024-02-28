import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { IdentityClient } from '@core/api/identity-client.service';
import { IdentityService } from '@core/services/identity.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { environment } from '@environment/environment';

@Injectable()
export class IdentityInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private readonly _identityClient: IdentityClient,
    private readonly _identityService: IdentityService,
  ) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (
      environment.publicUrlRoots.some((publicUrl) =>
        request.url.startsWith(publicUrl),
      )
    ) {
      return next.handle(request);
    }
    const accessToken = this._identityService.accessToken;
    if (!accessToken) {
      return this.handleRefreshToken(request, next);
    }
    if (!this.isAccessTokenValid(accessToken)) {
      return this.handleRefreshToken(request, next);
    }

    request = this.addToken(request, accessToken);

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 401 || error.status === 0)
        ) {
          return this.handleRefreshToken(request, next);
        }

        return throwError(() => error);
      }),
    );

  }

  private isAccessTokenValid(token: string): boolean {
    const decode = jwtDecode<JwtPayload>(token);
    const d = new Date(0); // The 0 here is the key, which sets the date to the epoch
    d.setUTCSeconds(decode.exp);
    return (d.valueOf() > (new Date().valueOf()));
  }

  private handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      const refreshToken = this._identityService.refreshToken;
      if (refreshToken) {
        return this._identityClient.refresh({ refreshToken }).pipe(
          switchMap((x) => {
            this.isRefreshing = false;
            this._identityService.setAccessToken(x.accessToken);
            this._identityService.setRefreshToken(x.refreshToken);
            request = this.addToken(request, x.accessToken);
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this._identityService.logout();
            return throwError(() => error);
          }),
        );
      } else {
        this.isRefreshing = false;
        return of(null);
      }
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


}


export const identityInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: IdentityInterceptor,
  multi: true,
};
