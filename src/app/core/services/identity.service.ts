import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '@shared/constants/local-storage-keys';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { AuthResultDto, IdentityClient, SignInRequest, SignUpRequest } from '@core/api/identity-client.service';
import { LoggerMessagesService } from '@shared/services/logger-messages.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';
import { ErrorResponse } from '@core/api/share';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  private readonly _accessToken = new BehaviorSubject<string>(null);
  private readonly _refreshToken = new BehaviorSubject<string>(null);

  get isAuthenticated$(): Observable<boolean> {
    return this._refreshToken.pipe(map(x => x !== null));
  }

  get accessToken(): string | null {
    return this._accessToken.value;
  }

  get refreshToken(): string | null {
    return this._refreshToken.value;
  }

  // get identity$(): Observable<UserDto> {
  //   return this._identity;
  // }

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _identityClient: IdentityClient,
    private readonly _loggerMessageService: LoggerMessagesService,
    private readonly _router: Router,
  ) {
    this.checkIdentity();
  }

  public getTokens(): [string, string] {
    return [this._accessToken.value, this._refreshToken.value];
  }


  public setRefreshToken(token: string): void {
    this._localStorageService.set<string>(
      LocalStorageKeys.RefreshTokenKey,
      token,
    );
    this._refreshToken.next(token);
  }

  public setAccessToken(token: string): void {
    this._accessToken.next(token);
  }

  // public checkTokenExpiry(): Promise<string> {
  //   if (!this._accessToken.value) {
  //     if (!this._refreshToken.value) {
  //       //log out
  //       return Promise.reject('log out');
  //     }
  //     return this.refreshToken();
  //   }
  //
  //   const token = jwtDecode(this._accessToken.value);
  //   console.log(token);
  //   return Promise.resolve(this._accessToken.value);
  // }

  public clearIdentity(): void {
    // this._localStorageService.clear();
    // this._identity.next(null);
  }

  // public refreshToken(): Promise<string> {
  //   return new Promise<string>(resolve => {
  //     this._identityClient.refresh({ refreshToken: this._refreshToken.value })
  //       .pipe()
  //       .subscribe(result => {
  //         this.setRefreshToken(result.refreshToken);
  //         this.setAccessToken(result.accessToken);
  //         return Promise.resolve(result.accessToken);
  //       });
  //   });
  // }

  public async logout(redirect = false): Promise<void> {
    this._accessToken.next(null);
    this._refreshToken.next(null);
    this._localStorageService.remove(LocalStorageKeys.RefreshTokenKey);
    if (redirect) {
      await this._router.navigate([AppRoutes.signIn.absolutePath]);
    }
  }

  private checkIdentity(): void {
    const identity = this._localStorageService.get<string>(
      LocalStorageKeys.RefreshTokenKey,
    );
    this._refreshToken.next(identity ?? null);
  }

  public signIn(payload: SignInRequest, redirect?: string): void {
    this._identityClient
      .signIn(payload)
      .pipe(
        catchError((err: any, caught: Observable<AuthResultDto>) => {
          console.log(err);
          caught.subscribe(console.log);
          this._loggerMessageService.errorMsg(
            err,
            'Something went wrong. Please try again.',
          );
          return of(null);
        }),
      )
      .subscribe(tokens => {
        if (tokens) {
          this._accessToken.next(tokens.accessToken);
          this.setRefreshToken(tokens.refreshToken);
          this._loggerMessageService.successMsg('Successfully log in.');
          if (redirect !== undefined) {
            void this._router.navigate([redirect]);
          }
        }
      });
  }

  public signUp(payload: SignUpRequest, redirect?: string): void {
    this._identityClient
      .signUp(payload)
      .pipe(
        catchError((err: ErrorResponse, caught: Observable<AuthResultDto>) => {
          this._loggerMessageService.errorMsg(
            new Error(err.type),
            err.reason,
          );
          return of(null);
        }),
      )
      .subscribe(tokens => {
        if (tokens) {
          this._accessToken.next(tokens.accessToken);
          this.setRefreshToken(tokens.refreshToken);
          this._loggerMessageService.successMsg('Successfully log in.');
          if (redirect !== undefined) {
            void this._router.navigate([redirect]);
          }
        }
      });
  }
}
