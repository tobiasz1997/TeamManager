import { Injectable } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Injectable()
export class ProfilePageService {
  public user$ = this._userService.user$;

  constructor(
    private readonly _userService: UserService,
  ) {
  }

  public loadData() {
    this._userService.loadData();
  }
}
