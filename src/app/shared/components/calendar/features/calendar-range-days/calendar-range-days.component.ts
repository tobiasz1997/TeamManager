import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import {
  CalendarDayButtonComponent,
} from '@shared/components/calendar/components/calendar-day-button/calendar-day-button.component';
import {
  CalendarTableDaysComponent,
} from '@shared/components/calendar/components/calendar-table-days/calendar-table-days.component';

@Component({
  selector: 'tm-calendar-range-days',
  standalone: true,
  imports: [
    CalendarDayButtonComponent,
    CalendarTableDaysComponent,
  ],
  templateUrl: './calendar-range-days.component.html',
  styleUrl: './calendar-range-days.component.sass',
})
export class CalendarRangeDaysComponent {
  viewDate = input.required<Date | null>();
  selectedDateFrom = input.required<Date | null>();
  selectedDateTo = input.required<Date | null>();
  @Output() selectDayFrom = new EventEmitter<Date | null>();
  @Output() selectDayTo = new EventEmitter<Date | null>();

  hoveredDate = signal(null);

  public onDayClick(date: Date): void {
    if (!this.selectedDateFrom() && !this.selectedDateTo()) {
      // dateForm = null;
      // dateTo = null
      this.selectDayFrom.next(date);
    } else if (this.selectedDateFrom() && !this.selectedDateTo()) {
      // dateForm = Date;
      // dateTo = null
      this.selectDayTo.next(date);
      this.hoveredDate.set(null);
    } else {
      // dateForm = Date;
      // dateTo = Date;
      this.selectDayFrom.next(date);
      this.selectDayTo.next(null);
    }
  }

  public setHoveredDate(value: Date | null) {
    this.selectedDateFrom() && !this.selectedDateTo() && this.hoveredDate.set(value);
  }
}
