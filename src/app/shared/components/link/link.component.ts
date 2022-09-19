import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.sass']
})
export class LinkComponent {
  @Input() label = '';
  @Input() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() disabled = false;
  @Output() action = new EventEmitter<void>();

  constructor() { }

  public handleClick(): void {
    this.action.emit();
  }

}
