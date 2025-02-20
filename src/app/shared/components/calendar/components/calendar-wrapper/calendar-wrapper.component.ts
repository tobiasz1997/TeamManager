import { Component } from '@angular/core';

@Component({
  selector: 'tm-calendar-wrapper',
  standalone: true,
  imports: [],
  template: `
    <div class='wrapper'>
      <ng-content />
    </div>
  `,
  styleUrl: './calendar-wrapper.component.sass',
})
export class CalendarWrapperComponent {

}
