import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tmTimerStylesColor]',
})
export class TimerStylesColorDirective implements AfterViewInit {
  @Input('tmTimerStylesColor') color: string | null = null;
  private readonly customColor: string = '#2b6777';

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _renderer: Renderer2,
  ) {
  }

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.style.border = `2px solid  ${this.color ?? this.customColor}`;

    const children: HTMLCollection = this._elementRef.nativeElement.children;
    const project = children.namedItem('project');
    if (project) {
      this._renderer.setStyle(project, 'color', this.color);
    }
  }

}
