import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  CalendarRangeDaysComponent,
} from '@shared/components/calendar/features/calendar-range-days/calendar-range-days.component';
import {
  CalendarHeaderComponent,
} from '@shared/components/calendar/components/calendar-header/calendar-header.component';
import {
  CalendarWrapperComponent,
} from '@shared/components/calendar/components/calendar-wrapper/calendar-wrapper.component';

@Component({
  selector: 'tm-calendar-range-wrapper',
  standalone: true,
  imports: [
    CalendarRangeDaysComponent,
    CalendarHeaderComponent,
    CalendarWrapperComponent,
  ],
  templateUrl: './calendar-range-wrapper.component.html',
  styleUrl: './calendar-range-wrapper.component.sass',
})
export class CalendarRangeWrapperComponent {
  viewDate = signal<Date | null>(null);
  selectedDateFrom = signal<Date | null>(null);
  selectedDateTo = signal<Date | null>(null);
  @Output() pickedDates = new EventEmitter<{ from: Date, to: Date } | null>();

  constructor() {
    this.viewDate.set(new Date());
  }

  public handleDaySelectedFrom(day: Date | null): void {
    if (!day) {
      this.selectedDateFrom.set(null);
    } else {
      this.selectedDateFrom.set(new Date(day.getFullYear(), day.getMonth(), day.getDate()));
    }
  }

  public handleDaySelectedTo(day: Date | null): void {
    if (!day) {
      this.selectedDateTo.set(null);
    } else {
      this.selectedDateTo.set(new Date(day.getFullYear(), day.getMonth(), day.getDate()));
    }
    this.emitSelectedDates();
  }

  public handlePreviousMonth(): void {
    this.viewDate.update(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  public handleNextMonth(): void {
    this.viewDate.update(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  private emitSelectedDates() {
    if (this.selectedDateFrom() && this.selectedDateTo()) {
      this.pickedDates.next({ from: this.selectedDateFrom(), to: this.selectedDateTo() });
    }
  }
}
