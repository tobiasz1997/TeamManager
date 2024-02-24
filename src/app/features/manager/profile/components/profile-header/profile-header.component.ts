import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tm-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.sass'],
})
export class ProfileHeaderComponent {
  @Output() onEdit = new EventEmitter<void>();

  public onEditButtonClick(): void {
    this.onEdit.next();
  }
}
