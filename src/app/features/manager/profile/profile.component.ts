import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@features/manager/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  public user$ = this._profileService.user$;

  constructor(
    private readonly _profileService: ProfileService,
  ) {
  }

  ngOnInit(): void {
    this._profileService.loadData();
  }
}
