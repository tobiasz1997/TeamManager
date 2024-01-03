// noinspection JSUnusedAssignment

import { Observable, of as _observableOf, throwError as _observableThrow } from 'rxjs';
import { API_BASE_URL, ApiException, ErrorResponse, ProblemDetails } from '@core/api/share';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { mergeMap as _observableMergeMap } from 'rxjs/operators';
import { catchError as _observableCatch } from 'rxjs/internal/operators/catchError';
import { ProjectDto } from '@core/api/project-client.service';

export interface ITimerClient {
  /**
   * Get timers list.
   * @param startDate (optional)
   * @param endDate (optional)
   * @param projectId (optional)
   * @param page (optional)
   * @param pageSize (optional)
   * @return Success
   */
  list(startDate: Date | undefined, endDate: Date | undefined, projectId: string | undefined, page: number | undefined, pageSize: number | undefined): Observable<TimerDtoPagedResult>;

  /**
   * Create timer.
   * @param body (optional)
   * @return Success
   */
  timerPost(body: CreateTimerRequest | undefined): Observable<string>;

  /**
   * Update timer.
   * @param body (optional)
   * @return Success
   */
  timerPut(body: UpdateTimerRequest | undefined): Observable<void>;

  /**
   * Delete timer.
   * @return Success
   */
  timerDelete(id: string): Observable<void>;
}

@Injectable()
export class TimerClient implements ITimerClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  /**
   * Get timers list.
   * @param startDate (optional)
   * @param endDate (optional)
   * @param projectId (optional)
   * @param page (optional)
   * @param pageSize (optional)
   * @return Success
   */
  list(startDate: Date | undefined, endDate: Date | undefined, projectId: string | undefined, page: number | undefined, pageSize: number | undefined): Observable<TimerDtoPagedResult> {
    let url_ = this.baseUrl + '/timer/list?';
    if (startDate === null)
      throw new Error('The parameter \'startDate\' cannot be null.');
    else if (startDate !== undefined)
      url_ += 'startDate=' + encodeURIComponent(startDate ? '' + startDate.toISOString() : '') + '&';
    if (endDate === null)
      throw new Error('The parameter \'endDate\' cannot be null.');
    else if (endDate !== undefined)
      url_ += 'endDate=' + encodeURIComponent(endDate ? '' + endDate.toISOString() : '') + '&';
    if (projectId === null)
      throw new Error('The parameter \'projectId\' cannot be null.');
    else if (projectId !== undefined)
      url_ += 'projectId=' + encodeURIComponent('' + projectId) + '&';
    if (page === null)
      throw new Error('The parameter \'page\' cannot be null.');
    else if (page !== undefined)
      url_ += 'page=' + encodeURIComponent('' + page) + '&';
    if (pageSize === null)
      throw new Error('The parameter \'pageSize\' cannot be null.');
    else if (pageSize !== undefined)
      url_ += 'pageSize=' + encodeURIComponent('' + pageSize) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'text/plain',
      }),
    };

    return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processList(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processList(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<TimerDtoPagedResult>;
        }
      } else
        return _observableThrow(response_) as any as Observable<TimerDtoPagedResult>;
    }));
  }

  protected processList(response: HttpResponseBase): Observable<TimerDtoPagedResult> {
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
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as TimerDtoPagedResult;
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

  /**
   * Create timer.
   * @param body (optional)
   * @return Success
   */
  timerPost(body: CreateTimerRequest | undefined): Observable<string> {
    let url_ = this.baseUrl + '/timer';
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
      return this.processTimerPost(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processTimerPost(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<string>;
        }
      } else
        return _observableThrow(response_) as any as Observable<string>;
    }));
  }

  protected processTimerPost(response: HttpResponseBase): Observable<string> {
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
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as string;
        return _observableOf(result200);
      }));
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result401: any = null;
        result401 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails;
        return throwException('Unauthorized', status, _responseText, _headers, result401);
      }));
    } else if (status === 405) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result405: any = null;
        result405 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ErrorResponse;
        return throwException('Method Not Allowed', status, _responseText, _headers, result405);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * Update timer.
   * @param body (optional)
   * @return Success
   */
  timerPut(body: UpdateTimerRequest | undefined): Observable<void> {
    let url_ = this.baseUrl + '/timer';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.request('put', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processTimerPut(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processTimerPut(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processTimerPut(response: HttpResponseBase): Observable<void> {
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
        return _observableOf(null as any);
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
    } else if (status === 405) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result405: any = null;
        result405 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ErrorResponse;
        return throwException('Method Not Allowed', status, _responseText, _headers, result405);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * Delete timer.
   * @return Success
   */
  timerDelete(id: string): Observable<void> {
    let url_ = this.baseUrl + '/timer/{id}';
    if (id === undefined || id === null)
      throw new Error('The parameter \'id\' must be defined.');
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({}),
    };

    return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processTimerDelete(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processTimerDelete(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processTimerDelete(response: HttpResponseBase): Observable<void> {
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
        return _observableOf(null as any);
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

export interface CreateTimerRequest {
  description: string;
  projectId?: string | undefined;
  date: Date;
}

export interface TimerDtoPagedResult {
  totalResults: number;
  items: TimerDto[];
}

export interface TimerDto {
  id: string;
  project?: ProjectDto;
  description: string;
  date: Date;
}

export interface UpdateTimerRequest {
  id: string;
  description: string;
  projectId?: string | undefined;
  date: Date;
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
