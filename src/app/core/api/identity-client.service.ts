// noinspection JSUnusedAssignment

import { Observable, of as _observableOf, throwError as _observableThrow } from 'rxjs';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { mergeMap as _observableMergeMap } from 'rxjs/operators';
import { catchError as _observableCatch } from 'rxjs/internal/operators/catchError';
import { API_BASE_URL, ApiException, ErrorResponse } from '@core/api/share';

export interface IIdentityClient {
  /**
   * Sign up and create new account.
   * @param body (optional)
   * @return Success
   */
  signUp(body: SignUpRequest | undefined): Observable<AuthResultDto>;

  /**
   * Refresh token.
   * @param body (optional)
   * @return Success
   */
  refresh(body: RefreshTokenRequest | undefined): Observable<AuthResultDto>;

  /**
   * Sign in to user account.
   * @param body (optional)
   * @return Success
   */
  signIn(body: SignInRequest | undefined): Observable<AuthResultDto>;
}

@Injectable()
export class IdentityClient implements IIdentityClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  /**
   * Sign up and create new account.
   * @param body (optional)
   * @return Success
   */
  signUp(body: SignUpRequest | undefined): Observable<AuthResultDto> {
    let url_ = this.baseUrl + '/identity/sign-up';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      }),
    };

    return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processSignUp(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processSignUp(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<AuthResultDto>;
        }
      } else
        return _observableThrow(response_) as any as Observable<AuthResultDto>;
    }));
  }

  protected processSignUp(response: HttpResponseBase): Observable<AuthResultDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthResultDto;
        return _observableOf(result200);
      }));
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result400: any = null;
        result400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ErrorResponse;
        return throwException('Bad Request', status, _responseText, _headers, result400);
      }));

    } else if (status === 405) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result405: any = null;
        result405 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ErrorResponse;
        return throwException('Method not allowed', status, _responseText, _headers, result405);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * Refresh token.
   * @param body (optional)
   * @return Success
   */
  refresh(body: RefreshTokenRequest | undefined): Observable<AuthResultDto> {
    let url_ = this.baseUrl + '/identity/token/refresh';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      }),
    };

    return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processRefresh(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processRefresh(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<AuthResultDto>;
        }
      } else
        return _observableThrow(response_) as any as Observable<AuthResultDto>;
    }));
  }

  protected processRefresh(response: HttpResponseBase): Observable<AuthResultDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthResultDto;
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * Sign in to user account.
   * @param body (optional)
   * @return Success
   */
  signIn(body: SignInRequest | undefined): Observable<AuthResultDto> {
    let url_ = this.baseUrl + '/identity/sign-in';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      }),
    };

    return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processSignIn(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processSignIn(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<AuthResultDto>;
        }
      } else
        return _observableThrow(response_) as any as Observable<AuthResultDto>;
    }));
  }

  protected processSignIn(response: HttpResponseBase): Observable<AuthResultDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (response as any).error instanceof Blob ? (response as any).error : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result200: any = null;
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthResultDto;
        return _observableOf(result200);
      }));
    } else if (status === 400) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result400: any = null;
        result400 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ErrorResponse;
        return throwException('Bad Request', status, _responseText, _headers, result400);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }
}

export interface AuthResultDto {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

function throwException(message: string, status: number, response: string, headers: {
  [key: string]: any;
}, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return _observableThrow(result);
  else
    return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
