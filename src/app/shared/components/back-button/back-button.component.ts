import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  @Input() label = 'back';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Output() action = new EventEmitter<void>();

  public handleClick(): void {
    this.action.emit();
  }

}
