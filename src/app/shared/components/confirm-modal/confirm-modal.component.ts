import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tm-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass'],
})
export class ConfirmModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmModal,
  ) {
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}

export interface IConfirmModal {
  question: string;
  confirmButtonText: string;
}
