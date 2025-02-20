import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'rangeDays',
  standalone: true,
})
export class RangeDaysPipe implements PipeTransform {
  transform(day: Date, dateFrom: Date | null, dateTo: Date | null): boolean {
    if (!day || !dateFrom || !dateTo) {
      return false;
    }

    return moment(day).isBetween(dateFrom, dateTo);
  }

}
