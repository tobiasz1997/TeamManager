import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-header-button-icon',
  templateUrl: './header-button-icon.component.html',
  styleUrls: ['./header-button-icon.component.sass'],
})
export class HeaderButtonIconComponent {
  @Input() title = '';
  @Input() indicator = 0;
  @Output() action = new EventEmitter<void>();

  constructor() {}

  public handleClick(): void {
    this.action.emit();
  }
}
