import { Injectable } from '@angular/core';
import { ISignInModel } from '@core/models/sign-in.model';
import { ISignUpModel } from '@core/models/sign-up.model';
import { IdentityService } from '@core/services/identity.service';
import { LocalStorageKeys } from '@shared/constants/local-storage-keys';
import { LocalStorageService } from '@shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly _identityService: IdentityService,
    private readonly _localStorageService: LocalStorageService
  ) {}

  public signIn(payload: ISignInModel): Promise<void> {
    return new Promise((resolve, reject) => {
      const object = this._localStorageService.get<ISignUpModel>(
        LocalStorageKeys.ProfileKey
      );
      if (
        object.email === payload.email &&
        object.password === payload.password
      ) {
        this._identityService.setIdentity({
          firstName: object.firstName,
          lastName: object.lastName,
          email: object.email,
        });
        resolve();
      } else {
        reject();
      }
    });
  }

  public signUp(payload: ISignUpModel): Promise<void> {
    return new Promise<void>(resolve => {
      try {
        this._localStorageService.set<ISignUpModel>(
          LocalStorageKeys.ProfileKey,
          payload
        );
        resolve();
      } catch {
        throw Error('Cannot save to local storage');
      }
    });
  }
}
