import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tm-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.sass'],
})
export class ProfilePanelComponent {
  @Input() firstName = '';
  @Input() lastName = '';
  @Input() avatar: string | undefined = undefined;
  @Output() logoutButtonClick$ = new EventEmitter<void>();

  constructor() {}

  public handleLogout(): void {
    this.logoutButtonClick$.emit();
  }
}
