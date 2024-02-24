import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssignmentDto } from '@core/api/assignment-client.service';

@Component({
  selector: 'tm-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent {
  @Input() task: AssignmentDto;
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  public onEditClick(): void {
    this.onEdit.next();
  }

  public onDeleteClick(): void {
    this.onDelete.next();
  }
}
