import { Component } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';
import { delay } from 'rxjs';

@Component({
  selector: 'tm-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.sass'],
})
export class PageLoaderComponent {
  public loading$ = this._loaderService.loading$.pipe(delay(0));

  constructor(
    private readonly _loaderService: LoaderService,
  ) {
  }
}
