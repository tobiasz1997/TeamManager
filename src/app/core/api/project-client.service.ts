// noinspection JSUnusedAssignment

import { Observable, of as _observableOf, throwError as _observableThrow } from 'rxjs';
import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { mergeMap as _observableMergeMap } from 'rxjs/operators';
import { catchError as _observableCatch } from 'rxjs/internal/operators/catchError';
import { API_BASE_URL, ApiException, ErrorResponse, ProblemDetails } from '@core/api/share';

export interface IProjectClient {
  /**
   * Get all projects.
   * @return Success
   */
  list(): Observable<ProjectDto[]>;

  /**
   * Create project.
   * @param body (optional)
   * @return Success
   */
  projectPost(body: CreateProjectRequest | undefined): Observable<string>;

  /**
   * Update project.
   * @param body (optional)
   * @return Success
   */
  projectPut(body: UpdateProjectRequest | undefined): Observable<void>;

  /**
   * Delete project.
   * @return Success
   */
  projectDelete(id: string): Observable<void>;
}

@Injectable()
export class ProjectClient implements IProjectClient {
  private http: HttpClient;
  private baseUrl: string;
  private loadingContext = new HttpContextToken<boolean>(() => true);
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  /**
   * Get all projects.
   * @return Success
   */
  list(): Observable<ProjectDto[]> {
    let url_ = this.baseUrl + '/project/list';
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
          return _observableThrow(e) as any as Observable<ProjectDto[]>;
        }
      } else
        return _observableThrow(response_) as any as Observable<ProjectDto[]>;
    }));
  }

  protected processList(response: HttpResponseBase): Observable<ProjectDto[]> {
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
        result200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ProjectDto[];
        return _observableOf(result200);
      }));
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        let result401: any = null;
        result401 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver) as ProblemDetails;
        return throwException('Unauthorized', status, _responseText, _headers, result401);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
      }));
    }
    return _observableOf(null as any);
  }

  /**
   * Create project.
   * @param body (optional)
   * @return Success
   */
  projectPost(body: CreateProjectRequest | undefined): Observable<string> {
    let url_ = this.baseUrl + '/project';
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
      return this.processProjectPost(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processProjectPost(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<string>;
        }
      } else
        return _observableThrow(response_) as any as Observable<string>;
    }));
  }

  protected processProjectPost(response: HttpResponseBase): Observable<string> {
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
   * Update project.
   * @param body (optional)
   * @return Success
   */
  projectPut(body: UpdateProjectRequest | undefined): Observable<void> {
    let url_ = this.baseUrl + '/project';
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
      return this.processProjectPut(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processProjectPut(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processProjectPut(response: HttpResponseBase): Observable<void> {
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
   * Delete project.
   * @return Success
   */
  projectDelete(id: string): Observable<void> {
    let url_ = this.baseUrl + '/project/{id}';
    if (id === undefined || id === null)
      throw new Error('The parameter \'id\' must be defined.');
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({}),
      context: new HttpContext().set(this.loadingContext, true),
    };

    return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processProjectDelete(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processProjectDelete(response_ as any);
        } catch (e) {
          return _observableThrow(e) as any as Observable<void>;
        }
      } else
        return _observableThrow(response_) as any as Observable<void>;
    }));
  }

  protected processProjectDelete(response: HttpResponseBase): Observable<void> {
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

export interface CreateProjectRequest {
  label: string;
  color: string;
}

export interface ProjectDto {
  id: string;
  label: string;
  color: string;
}

export interface UpdateProjectRequest {
  id: string;
  label: string;
  color: string;
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
