import { Injectable, OnDestroy } from '@angular/core';
import { ScreenSizesEnum } from '@shared/enums/screen-sizes.enum';
import { BehaviorSubject, fromEvent, map, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowPropsService implements OnDestroy {
  private _breakpoint$ = new BehaviorSubject<ScreenSizesEnum>(null);
  private _destroy$ = new Subject<void>();

  get breakpoint$(): Observable<ScreenSizesEnum> {
    return this._breakpoint$;
  }

  get isSM$(): Observable<boolean> {
    return this._breakpoint$.pipe(map(x => x === ScreenSizesEnum.Mobile));
  }

  get isMD$(): Observable<boolean> {
    return this._breakpoint$.pipe(map(x => x === ScreenSizesEnum.Mobile || x === ScreenSizesEnum.Tablet));
  }

  get isLG$(): Observable<boolean> {
    return this._breakpoint$.pipe(map(x => x === ScreenSizesEnum.Mobile || x === ScreenSizesEnum.Tablet || x === ScreenSizesEnum.Desktop));
  }

  get isXL$(): Observable<boolean> {
    return this._breakpoint$.pipe(map(x => x === ScreenSizesEnum.DesktopXL));
  }

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.setMediaBreakpoint(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this._destroy$),
      ).subscribe((evt: any) => {
      this.setMediaBreakpoint(evt.target.innerWidth);
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private setMediaBreakpoint(width: number): void {
    if (width <= 640) {
      this._breakpoint$.next(ScreenSizesEnum.Mobile);
    } else if (width >= 641 && width <= 768) {
      this._breakpoint$.next(ScreenSizesEnum.Tablet);
    } else if (width >= 769 && width <= 1024) {
      this._breakpoint$.next(ScreenSizesEnum.Desktop);
    } else {
      this._breakpoint$.next(ScreenSizesEnum.DesktopXL);
    }
  }
}
