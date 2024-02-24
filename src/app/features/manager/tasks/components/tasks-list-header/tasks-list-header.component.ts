import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-tasks-list-header',
  templateUrl: './tasks-list-header.component.html',
  styleUrls: ['./tasks-list-header.component.sass'],
})
export class TasksListHeaderComponent {
  @Input() title: string;
  @Output() onAdd = new EventEmitter<void>();

  public onAddButtonClick() {
    this.onAdd.next();
  }
}
