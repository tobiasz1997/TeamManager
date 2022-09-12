import { Component } from '@angular/core';
import { debounceTime, fromEvent, map, Observable, tap } from "rxjs";

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.sass']
})
export class ScrollTopButtonComponent {
  private readonly _scrollObserver$: Observable<boolean> = new Observable<boolean>();

  get isButtonVisible$(): Observable<boolean> {
    return this._scrollObserver$;
  }

  constructor() {
    this._scrollObserver$ = fromEvent(document, 'scroll').pipe(
      debounceTime(50),
      map(() => window.scrollY > 500)
    );
  }

  public scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

}
