import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendarMonthName',
  pure: true,
  standalone: true,
})
export class CalendarMonthNamePipe implements PipeTransform {
  private readonly _monthRecord: Record<number, string> = {
    0: 'Styczeń',
    1: 'Luty',
    2: 'Marzec',
    3: 'Kwiecień',
    4: 'Maj',
    5: 'Czerwiec',
    6: 'Lipiec',
    7: 'Sierpień',
    8: 'Wrzesień',
    9: 'Październik',
    10: 'Listopad',
    11: 'Grudzień',
  };

  transform(value: number): string {
    return this._monthRecord[value];
  }

}
