import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITaskModel } from '@core/models/task.model';

@Component({
  selector: 'tm-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent {
  @Input() task: ITaskModel;
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
