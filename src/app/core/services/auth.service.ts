import { Injectable } from '@angular/core';
import { IdentityService } from '@core/services/identity.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { IdentityClient } from '@core/api/identity-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly _identityService: IdentityService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _identityClient: IdentityClient,
  ) {
  }


}
