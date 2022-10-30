import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.routes';
import { Location } from '@angular/common';

@Component({
  selector: 'tm-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass'],
})
export class PageNotFoundComponent {

  constructor(
    private readonly _router: Router,
    private readonly _location: Location,
  ) {
  }

  public handleRefreshPage(): void {
    window.location.reload();
  }

  public async handleBackToDashboard(): Promise<void> {
    await this._router.navigate([AppRoutes.home.absolutePath]);
  }

}
