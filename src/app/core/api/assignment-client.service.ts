// noinspection DuplicatedCode,JSUnusedAssignment

import { Observable, of as _observableOf, throwError, throwError as _observableThrow } from 'rxjs';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { mergeMap as _observableMergeMap } from 'rxjs/operators';
import { catchError as _observableCatch } from 'rxjs/internal/operators/catchError';
import { API_BASE_URL, ApiException, ErrorResponse, ProblemDetails } from '@core/api/share';

export interface IAssignmentClient {
  /**
   * Get assignment.
   * @return Success
   */
  assignmentGet(id: string): Observable<AssignmentDto>;

  /**
   * Delete assignment.
   * @return Success
   */
  assignmentDelete(id: string): Observable<void>;

  /**
   * Get assignments list.
   * @param type (optional)
   * @param page (optional)
   * @param pageSize (optional)
   * @return Success
   */
  list(type: AssignmentStatusType | undefined, page: number | undefined, pageSize: number | undefined): Observable<AssignmentDtoPagedResult>;

  /**
   * Get typed lists of assignments.
   * @param pageSize (optional)
   * @return Success
   */
  lists(pageSize: number | undefined): Observable<AssignmentsListsDto>;

  /**
   * Create assignment.
   * @param body (optional)
   * @return Success
   */
  assignmentPost(body: CreateAssignmentRequest | undefined): Observable<string>;

  /**
   * Update assignment.
   * @param body (optional)
   * @return Success
   */
  assignmentPut(body: UpdateAssignmentRequest | undefined): Observable<void>;

  /**
   * Update assignment status.
   * @param body (optional)
   * @return Success
   */
  assignmentPatch(body: UpdateAssignmentStatus | undefined): Observable<void>;
}

@Injectable()
export class AssignmentClient implements IAssignmentClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  /**
   * Get assignment.
   * @return Success
   */
  assignmentGet(id: string): Observable<AssignmentDto> {
    let url_ = this.baseUrl + '/assignment/{id}';
    if (id === undefined || id === null)
      throw new Error('The parameter \'id\' must be defined.');
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'text/plain',
      }),
    };

    return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processAssignmentGet(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processAssignmentGet(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<AssignmentDto>;
        }
      } else
        return _observableThrow(response_) as any as Observable<AssignmentDto>;
    }));
  }

  protected processAssignmentGet(response: HttpResponseBase): Observable<AssignmentDto> {
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
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as AssignmentDto;
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
   * Delete assignment.
   * @return Success
   */
  assignmentDelete(id: string): Observable<void> {
    let url_ = this.baseUrl + '/assignment/{id}';
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
      return this.processAssignmentDelete(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processAssignmentDelete(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processAssignmentDelete(response: HttpResponseBase): Observable<void> {
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

  /**
   * Get assignments list.
   * @param type (optional)
   * @param page (optional)
   * @param pageSize (optional)
   * @return Success
   */
  list(type: AssignmentStatusType | undefined, page: number | undefined, pageSize: number | undefined): Observable<AssignmentDtoPagedResult> {
    let url_ = this.baseUrl + '/assignment/list?';
    if (type === null)
      throw new Error('The parameter \'type\' cannot be null.');
    else if (type !== undefined)
      url_ += 'type=' + encodeURIComponent('' + type) + '&';
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
          return _observableThrow(e) as any as Observable<AssignmentDtoPagedResult>;
        }
      } else
        return _observableThrow(response_) as any as Observable<AssignmentDtoPagedResult>;
    }));
  }

  protected processList(response: HttpResponseBase): Observable<AssignmentDtoPagedResult> {
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
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as AssignmentDtoPagedResult;
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
   * Get typed lists of assignments.
   * @param pageSize (optional)
   * @return Success
   */
  lists(pageSize: number | undefined): Observable<AssignmentsListsDto> {
    let url_ = this.baseUrl + '/assignment/lists?';
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
      return this.processLists(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processLists(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<AssignmentsListsDto>;
        }
      } else
        return _observableThrow(response_) as any as Observable<AssignmentsListsDto>;
    }));
  }

  protected processLists(response: HttpResponseBase): Observable<AssignmentsListsDto> {
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
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as AssignmentsListsDto;
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
   * Create assignment.
   * @param body (optional)
   * @return Success
   */
  assignmentPost(body: CreateAssignmentRequest | undefined): Observable<string> {
    let url_ = this.baseUrl + '/assignment';
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
      return this.processAssignmentPost(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processAssignmentPost(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<string>;
        }
      } else
        return _observableThrow(response_) as any as Observable<string>;
    }));
  }

  protected processAssignmentPost(response: HttpResponseBase): Observable<string> {
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
   * Update assignment.
   * @param body (optional)
   * @return Success
   */
  assignmentPut(body: UpdateAssignmentRequest | undefined): Observable<void> {
    let url_ = this.baseUrl + '/assignment';
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
      return this.processAssignmentPut(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processAssignmentPut(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processAssignmentPut(response: HttpResponseBase): Observable<void> {
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

  /**
   * Update assignment status.
   * @param body (optional)
   * @return Success
   */
  assignmentPatch(body: UpdateAssignmentStatus | undefined): Observable<void> {
    let url_ = this.baseUrl + '/assignment';
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

    return this.http.request('patch', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processAssignmentPatch(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processAssignmentPatch(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processAssignmentPatch(response: HttpResponseBase): Observable<void> {
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

export interface AssignmentDto {
  id: string;
  name: string;
  description?: string;
  priority: number;
  status: AssignmentStatusType;
  createdAt: Date;
}

export interface AssignmentDtoPagedResult {
  totalResults: number;
  items: AssignmentDto[];
}

export enum AssignmentStatusType {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Done',
  Aborted = 'Aborted',
}

export interface AssignmentsListsDto {
  todo: AssignmentDtoPagedResult;
  inProgress: AssignmentDtoPagedResult;
  done: AssignmentDtoPagedResult;
  aborted: AssignmentDtoPagedResult;
}

export interface CreateAssignmentRequest {
  name: string;
  description: string;
  priority: number;
  status: AssignmentStatusType;
}

export interface UpdateAssignmentRequest {
  id: string;
  name: string;
  description: string;
  priority: number;
  status: AssignmentStatusType;
}

export interface UpdateAssignmentStatus {
  id?: string;
  status?: AssignmentStatusType;
}

function throwException(message: string, status: number, response: string, headers: {
  [key: string]: any;
}, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
    return throwError(() => result);
  else
    return throwError(() => new ApiException(message, status, response, headers, null));
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
