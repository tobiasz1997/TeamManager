import { Component } from '@angular/core';
import {
  CalendarRangeWrapperComponent,
} from '@shared/components/calendar/wrappers/calendar-range-wrapper/calendar-range-wrapper.component';
import {
  CalendarSingleWrapperComponent,
} from '@shared/components/calendar/wrappers/calendar-single-wrapper/calendar-single-wrapper.component';

@Component({
  selector: 'tm-calendar',
  standalone: true,
  imports: [CalendarRangeWrapperComponent, CalendarSingleWrapperComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.sass',
})
export class CalendarComponent {
  showValue(v: any) {
    console.log(v);
  }
}
