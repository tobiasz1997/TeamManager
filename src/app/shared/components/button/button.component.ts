import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input() label = '';
  @Input() color: 'primary' | 'secondary' | 'transparent' = 'primary';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() action = new EventEmitter<void>();

  constructor() { }

  public handleClick(): void {
    !this.disabled && this.action.emit();
  }

}
