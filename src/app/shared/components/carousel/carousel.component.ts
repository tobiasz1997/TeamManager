import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @Input() isAuto = true;
  @Output() leftArrowClick$ = new EventEmitter<void>;
  @Output() rightArrowClick$ = new EventEmitter<void>;

  private _timeout: NodeJS.Timeout | null = null;

  ngAfterViewInit(): void {
    if (this.isAuto) {
      this.manageTimer();
    }
  }

  ngOnDestroy() {
    if (this._timeout) {
      clearInterval(this._timeout);
    }
  }

  public onLeftArrowClick(): void {
    this.leftArrowClick$.emit();
    this.manageTimer(true);
  }

  public onRightArrowClick(): void {
    this.rightArrowClick$.emit();
    this.manageTimer(true);
  }

  private manageTimer(shouldClear = false): void {
    if (this.isAuto) {
      if (shouldClear && this._timeout) {
        clearInterval(this._timeout);
      }
      this._timeout = setInterval(() => {
        this.rightArrowClick$.emit();
      }, 3000);
    }
  }
}
