import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from '@features/manager/profile/profile-page.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass'],
})
export class ProfilePageComponent implements OnInit {
  public user$ = this._profilePageService.user$;

  constructor(
    private readonly _profilePageService: ProfilePageService,
  ) {
  }

  ngOnInit(): void {
    this._profilePageService.loadData();
  }
}
