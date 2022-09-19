import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[csClickOutside]',
})
/**
 * @ngdoc directive
 * @name csClickOutside
 * @description This is the directive that tells whether the user has clicked inside or outside the component.
 * @param isActive Boolean, which checks if component is visible.
 * @param clickOutside Event Emitter, which emit when user has clicked outside the component.
 */
export class ClickOutsideDirective {
  @Input() isActive = false;
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private readonly _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  documentClick(event: PointerEvent): void {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isActive) {
      this.clickOutside.emit();
    }
  }
}
