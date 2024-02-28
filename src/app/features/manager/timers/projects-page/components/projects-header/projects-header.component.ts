import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../../../../app.routes';

@Component({
  selector: 'tm-projects-header',
  templateUrl: './projects-header.component.html',
  styleUrls: ['./projects-header.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsHeaderComponent {
  @Output() onAdd = new EventEmitter<void>();

  constructor(
    private readonly _router: Router,
  ) {
  }

  public onAddButtonClick(): void {
    this.onAdd.next();
  }

  public navigateToTimers(): void {
    void this._router.navigate([AppRoutes.timers.absolutePath]);
  }

}
