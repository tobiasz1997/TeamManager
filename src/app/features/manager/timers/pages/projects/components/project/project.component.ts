import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectDto } from '@core/api/project-client.service';

@Component({
  selector: 'tm-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
  @Input() project: ProjectDto;
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
