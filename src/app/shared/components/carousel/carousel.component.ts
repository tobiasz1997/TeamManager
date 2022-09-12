import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @Input() isAuto = true;
  @Output() leftArrowClick$ = new EventEmitter<void>;
  @Output() rightArrowClick$ = new EventEmitter<void>;

  private _timeout: NodeJS.Timer | null = null;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.isAuto) {
      this._timeout = setInterval(() => {
        this.rightArrowClick$.emit();
      }, 3000)
    }
  }

  public ngOnDestroy() {
    if (this._timeout) {
      clearInterval(this._timeout);
    }
  }


  public onLeftArrowClick(): void {
    this.leftArrowClick$.emit();
  }

  public onRightArrowClick(): void {
    this.rightArrowClick$.emit()
  }


}
