import { Component, Input } from '@angular/core';
import { ITaskModel } from '@core/models/task.model';

@Component({
  selector: 'tm-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
})
export class TaskComponent {
  @Input() task: ITaskModel;

  constructor() {
  }

}
