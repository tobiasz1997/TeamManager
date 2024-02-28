import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ControlsOf } from '@shared/types/controls-of.type';
import {
  IManageProject,
  IManageProjectModel,
} from '@features/manager/timers/projects-page/components/manage-project/manage-project.interface';

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
    console.log(this.formGroup.value);
    this.data.command(this.formGroup.value);
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
          '#000000',
          Validators.required,
        ),
      },
      {
        updateOn: 'submit',
      },
    );
  }


}
