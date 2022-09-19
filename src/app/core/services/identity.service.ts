import { Injectable } from '@angular/core';
import { IIdentityState } from '@core/models/identity-state.model';
import { ISignUpModel } from '@core/models/sign-up.model';
import { LocalStorageKeys } from '@shared/constants/local-storage-keys';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  private readonly _identity = new BehaviorSubject<IIdentityState>(null);

  get isAuthenticated$(): Observable<boolean> {
    return this._identity.pipe(map(x => x !== null));
  }

  constructor(private readonly _localStorageService: LocalStorageService) {}

  public setIdentity(identity: IIdentityState): void {
    this._localStorageService.set<IIdentityState>(
      LocalStorageKeys.IdentityKey,
      identity
    );
    this._identity.next(identity);
  }

  public clearIdentity(): void {
    this._localStorageService.clear();
    this._identity.next(null);
  }

  public async logout(): Promise<void> {
    return new Promise<void>(resolve => {
      try {
        this._localStorageService.remove(LocalStorageKeys.IdentityKey);
        this._identity.next(null);
        resolve();
      } catch {
        throw Error('Cannot logout. Please try again.');
      }
    });
  }
}
