import { Component, computed, inject, Input, input, TemplateRef } from '@angular/core';
import {
  CalendarDayButtonComponent,
} from '@shared/components/calendar/components/calendar-day-button/calendar-day-button.component';
import { CalendarService } from '@shared/components/calendar/services/calendar.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'tm-calendar-table-days',
  standalone: true,
  imports: [
    CalendarDayButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './calendar-table-days.component.html',
  styleUrl: './calendar-table-days.component.sass',
})
export class CalendarTableDaysComponent {
  viewDate = input.required<Date>();
  @Input() buttonTemplate: TemplateRef<any>;
  private calendarService = inject(CalendarService);
  daysMatrix = computed(() => this.calendarService.buildMatrix(this.viewDate()));
}
