import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import { DayPipe } from '@shared/components/calendar/pipes/day.pipe';
import { EqualDayPipe } from '@shared/components/calendar/pipes/equal-day.pipe';
import { LessDayPipe } from '@shared/components/calendar/pipes/less-day.pipe';
import { RangeDaysPipe } from '@shared/components/calendar/pipes/range-days.pipe';
import { CalendarType } from '@shared/components/calendar/models/calendar-type';

@Component({
  selector: 'tm-calendar-day-button',
  standalone: true,
  imports: [
    DayPipe,
    EqualDayPipe,
    LessDayPipe,
    RangeDaysPipe,
  ],
  templateUrl: './calendar-day-button.component.html',
  styleUrl: './calendar-day-button.component.sass',
})
export class CalendarDayButtonComponent {
  type = input.required<CalendarType>();
  day = input.required<Date | null>();
  @Output() dayClicked = new EventEmitter<Date>();
  @Output() dayHovered = new EventEmitter<Date | null>();

  // single
  selectedDate = input<Date | null>(null);

  // range
  selectedDateFrom = input<Date | null>(null);
  selectedDateTo = input<Date | null>(null);
  hoveredDate = input<Date | null>(null);
  isDayFromSelected = computed(() => this.selectedDateFrom() && !this.selectedDateTo());

  today = signal(new Date());
}
