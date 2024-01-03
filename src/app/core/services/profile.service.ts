import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserClient, UserDto } from '@core/api/user-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly _profile$ = new BehaviorSubject<UserDto>(null);

  get profile$(): Observable<UserDto> {
    return this._profile$;
  }

  constructor(
    private readonly _userClient: UserClient,
  ) {
  }

  public loadData(): void {
    if (!this._profile$.value) {
      this.loadProfile();
    }
  }

  public clearData(): void {
    this._profile$.next(null);
  }

  private loadProfile(): void {
    this._userClient
      .me()
      .subscribe(user => this._profile$.next(user));
  }
}
