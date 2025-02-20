import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { CalendarMonthNamePipe } from '@shared/components/calendar/pipes/calendar-month-name.pipe';

@Component({
  selector: 'tm-calendar-header',
  standalone: true,
  imports: [
    CalendarMonthNamePipe,
  ],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.sass',
})
export class CalendarHeaderComponent {
  viewDate = input.required<Date | null>();
  month = computed(() => this.viewDate().getMonth());
  year = computed(() => this.viewDate().getFullYear());
  @Output() previousClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();

  public onPreviousClick() {
    this.previousClick.emit();
  }

  public onNextClick() {
    this.nextClick.emit();
  }
}
