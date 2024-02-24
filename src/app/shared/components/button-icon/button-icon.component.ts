import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconComponent {
  @Input() color: 'primary' | 'secondary' | 'transparent' | 'danger' = 'primary';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() action = new EventEmitter<void>();

  public handleClick(): void {
    !this.disabled && this.action.emit();
  }
}
