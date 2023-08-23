import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tm-filter-delete-button',
  styleUrls: ['../styles/filter-shared.sass'],
  template: `
    <button class='delete' (click)='action.emit()'>
      <span id='icon' class='material-icons-round'>close</span>
    </button>
  `,
})
export class FilterDeleteButtonComponent {
  @Output() action = new EventEmitter<void>();
}
