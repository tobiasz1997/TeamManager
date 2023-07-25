import { Component, OnInit } from '@angular/core';
import { TimersService } from '@features/manager/timers/timers.service';

@Component({
  selector: 'tm-timers',
  templateUrl: './timers.component.html',
  styleUrls: ['./timers.component.sass'],
})
export class TimersComponent implements OnInit {
  public timers$ = this._timersService.timers$;

  constructor(
    private readonly _timersService: TimersService,
  ) {
  }

  ngOnInit(): void {
  }

}
