// noinspection JSUnusedAssignment

import { Observable, of as _observableOf, throwError as _observableThrow } from 'rxjs';
import { API_BASE_URL, ApiException, ErrorResponse, ProblemDetails } from '@core/api/share';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { mergeMap as _observableMergeMap } from 'rxjs/operators';
import { catchError as _observableCatch } from 'rxjs/internal/operators/catchError';

export interface IUserClient {
  /**
   * Get logged user profile.
   * @return Success
   */
  me(): Observable<UserDto>;
}

@Injectable()
export class UserClient implements IUserClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  /**
   * Get logged user profile.
   * @return Success
   */
  me(): Observable<UserDto> {
    let url_ = this.baseUrl + '/user/me';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'text/plain',
      }),
    };

    return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processMe(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processMe(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<UserDto>;
        }
      } else
        return _observableThrow(response_) as any as Observable<UserDto>;
    }));
  }

  protected processMe(response: HttpResponseBase): Observable<UserDto> {
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
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as UserDto;
        return _observableOf(result200);
      }));
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result401: any = null;
        result401 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails;
        return throwException('Unauthorized', status, _responseText, _headers, result401);
      }));
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result404: any = null;
        result404 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ErrorResponse;
        return throwException('Not Found', status, _responseText, _headers, result404);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }
}

export interface UserDto {
  id: string;
  email: string;
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
