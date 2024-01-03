import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TimerDto } from '@core/api/timer-client.service';

@Component({
  selector: 'tm-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  @Input() timer: TimerDto;
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  constructor() {
  }

  public onEditClick(): void {
    this.onEdit.next();
  }

  public onDeleteClick(): void {
    this.onDelete.next();
  }

}
