import { Injectable } from '@angular/core';
import { ConfirmModalComponent, IConfirmModal } from '@shared/components/confirm-modal/confirm-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  constructor(
    private readonly _matDialog: MatDialog,
  ) {
  }

  public showDeleteTimerModal(data: IConfirmModal): Observable<any> {
    const dialogRef = this.createConfirmModal(data);

    return dialogRef.afterClosed();
  }

  private createConfirmModal(data: IConfirmModal): MatDialogRef<ConfirmModalComponent> {
    return this._matDialog.open(ConfirmModalComponent, {
      data,
    });
  }
}
