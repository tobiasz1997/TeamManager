import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IManageTask, IManageTaskModel } from '@features/manager/tasks/components/manage-task/manage-task.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from '@shared/types/controls-of.type';

@Component({
  selector: 'tm-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.sass'],
})
export class ManageTaskComponent {
  public formGroup: FormGroup;

  public readonly priorityErrorMessage = 'Field is required and value must be between 1 and 4.';

  constructor(
    public dialogRef: MatDialogRef<ManageTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IManageTask,
  ) {
    this.buildForm();
    data.task && this.updateForm(data.task);
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
    this.data.command(this.formGroup.value);
  }

  private updateForm(data: IManageTaskModel): void {
    this.formGroup.patchValue({ ...data, description: data.description ?? '' });
  }

  private buildForm(): void {
    this.formGroup = new FormGroup<ControlsOf<IManageTaskModel>>(
      {
        name: new FormControl(
          '',
          Validators.compose([Validators.required]),
        ),
        description: new FormControl(
          '',
        ),
        priority: new FormControl(
          1,
          Validators.compose([Validators.required, Validators.min(1), Validators.max(4)]),
        ),
      },
      {
        updateOn: 'submit',
      },
    );
  }

}
