import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logger } from '@shared/services/logger.abstract';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _loadingMap: Map<string, boolean> = new Map<string, boolean>();

  get loading$(): Observable<boolean> {
    return this._loading;
  }

  constructor(
    private readonly _logger: Logger,
  ) {
  }

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      this._logger.error(new Error('No request URL in loading service'));
    }
    if (loading === true) {
      this._loadingMap.set(url, loading);
      this._loading.next(true);
    } else if (loading === false && this._loadingMap.has(url)) {
      this._loadingMap.delete(url);
    }
    if (this._loadingMap.size === 0) {
      this._loading.next(false);
    }
  }
}
