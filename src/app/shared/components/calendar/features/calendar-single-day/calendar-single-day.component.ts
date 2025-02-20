import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { CalendarService } from '@shared/components/calendar/services/calendar.service';
import {
  CalendarDayButtonComponent,
} from '@shared/components/calendar/components/calendar-day-button/calendar-day-button.component';
import {
  CalendarTableDaysComponent,
} from '@shared/components/calendar/components/calendar-table-days/calendar-table-days.component';

@Component({
  selector: 'tm-calendar-single-day',
  standalone: true,
  imports: [
    CalendarDayButtonComponent,
    CalendarTableDaysComponent,
  ],
  templateUrl: './calendar-single-day.component.html',
  styleUrl: './calendar-single-day.component.sass',
})
export class CalendarSingleDayComponent {
  viewDate = input.required<Date>();
  selectedDate = input.required<Date | null>();

  @Output() selectDay = new EventEmitter<Date>();

  private calendarService = inject(CalendarService);

  public onDayClick(date: Date): void {
    this.selectDay.next(date);
  }
}
