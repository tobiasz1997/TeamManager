import { Component, Input, OnInit } from '@angular/core';
import { ITimerModel } from '@core/models/timer.model';

@Component({
  selector: 'tm-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass'],
})
export class TimerComponent implements OnInit {
  @Input() timer: ITimerModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
