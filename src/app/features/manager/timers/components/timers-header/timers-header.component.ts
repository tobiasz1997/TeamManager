import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../../../app.routes';

@Component({
  selector: 'tm-timers-header',
  templateUrl: './timers-header.component.html',
  styleUrls: ['./timers-header.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimersHeaderComponent {
  @Output() onAdd = new EventEmitter<void>();

  constructor(
    private readonly _router: Router,
  ) {
  }

  public onAddButtonClick(): void {
    this.onAdd.next();
  }

  public navigateToProjects(): void {
    void this._router.navigate([AppRoutes.projects.absolutePath]);
  }
}
