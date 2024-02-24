import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() label = '';
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() disabled = false;
  @Output() action = new EventEmitter<void>();

  public handleClick(): void {
    this.action.emit();
  }

}
