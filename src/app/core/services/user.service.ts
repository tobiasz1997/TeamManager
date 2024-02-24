import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserClient, UserDto } from '@core/api/user-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _user$ = new BehaviorSubject<UserDto>(null);

  get user$(): Observable<UserDto> {
    return this._user$;
  }

  constructor(
    private readonly _userClient: UserClient,
  ) {
  }

  public loadData(): void {
    if (!this._user$.value) {
      this.loadUser();
    }
  }

  public clearData(): void {
    this._user$.next(null);
  }

  private loadUser(): void {
    this._userClient
      .me()
      .subscribe(user => this._user$.next(user));
  }
}
