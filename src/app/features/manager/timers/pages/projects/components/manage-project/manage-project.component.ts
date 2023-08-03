import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ControlsOf } from '@shared/components/types/controls-of.type';
import {
  IManageProject,
} from '@features/manager/timers/pages/projects/components/manage-project/manage-project.interface';
import { IManageProjectModel } from '@core/models/project.model';

@Component({
  selector: 'tm-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.sass'],
})
export class ManageProjectComponent {
  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ManageProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IManageProject,
  ) {
    this.buildForm();
    data.project && this.updateForm(data.project);
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public async handleSubmit(): Promise<void> {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      return;
    }
    this.dialogRef.close(this.formGroup.value);
  }

  private updateForm(data: IManageProjectModel): void {
    this.formGroup.patchValue({ ...data });
  }

  private buildForm(): void {
    this.formGroup = new FormGroup<ControlsOf<IManageProjectModel>>(
      {
        label: new FormControl(
          null,
          Validators.required,
        ),
        color: new FormControl(
          null,
          Validators.required,
        ),
      },
      {
        updateOn: 'submit',
      },
    );
  }


}
