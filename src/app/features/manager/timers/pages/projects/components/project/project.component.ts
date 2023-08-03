import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IProjectModel } from '@core/models/project.model';

@Component({
  selector: 'tm-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
  @Input() project: IProjectModel;
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
