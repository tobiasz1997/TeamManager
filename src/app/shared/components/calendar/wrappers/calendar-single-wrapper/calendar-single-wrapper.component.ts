import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  CalendarHeaderComponent,
} from '@shared/components/calendar/components/calendar-header/calendar-header.component';
import {
  CalendarSingleDayComponent,
} from '@shared/components/calendar/features/calendar-single-day/calendar-single-day.component';
import {
  CalendarWrapperComponent,
} from '@shared/components/calendar/components/calendar-wrapper/calendar-wrapper.component';

@Component({
  selector: 'tm-calendar-single-wrapper',
  standalone: true,
  imports: [
    CalendarSingleDayComponent,
    CalendarHeaderComponent,
    CalendarWrapperComponent,
  ],
  templateUrl: './calendar-single-wrapper.component.html',
  styleUrl: './calendar-single-wrapper.component.sass',
})
export class CalendarSingleWrapperComponent {
  viewDate = signal<Date>(null);
  selectedDate = signal<Date | null>(null);
  @Output() pickedDate = new EventEmitter<Date | null>();

  constructor() {
    this.viewDate.set(new Date());
    this.selectedDate.set(new Date());
  }

  public handleDaySelected(day: Date): void {
    this.selectedDate.set(new Date(day.getFullYear(), day.getMonth(), day.getDate()));
    this.pickedDate.next(this.selectedDate());
  }

  public handlePreviousMonth(): void {
    this.viewDate.update(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  public handleNextMonth(): void {
    this.viewDate.update(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }
}
