import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from '@shared/components/types/controls-of.type';
import { IManageTimerModel } from '@core/models/timer.model';
import { IOption } from '@shared/interfaces/option.interface';
import { ProjectService } from '@core/services/project.service';
import { map, take } from 'rxjs';
import { IManageTimer } from '@features/manager/timers/components/manage-timer/manage-timer.interface';

@Component({
  selector: 'app-manage-timer',
  templateUrl: './manage-timer.component.html',
  styleUrls: ['./manage-timer.component.sass'],
})
export class ManageTimerComponent {
  public formGroup: FormGroup;

  public options: Array<IOption<string>> = [];

  constructor(
    public dialogRef: MatDialogRef<ManageTimerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IManageTimer,
    private readonly _projectService: ProjectService,
  ) {
    this.buildForm();
    this._projectService.projects$
      .pipe(
        take(1),
        map(data => data.map(x => ({
          label: x.label,
          value: x.id,
        } as IOption<string>))),
      )
      .subscribe(result => this.options = result);
    data.timer && this.updateForm(data.timer);
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

  private updateForm(data: IManageTimerModel) {
    this.formGroup.patchValue({ ...data });
  }

  private buildForm(): void {
    this.formGroup = new FormGroup<ControlsOf<IManageTimerModel>>(
      {
        projectId: new FormControl(
          null,
        ),
        description: new FormControl(
          null,
          Validators.required,
        ),
        date: new FormControl(
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
