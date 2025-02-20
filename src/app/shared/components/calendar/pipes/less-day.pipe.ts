import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lessDay',
  standalone: true,
  pure: true,
})
export class LessDayPipe implements PipeTransform {
  transform(value: Date, selectedDate: Date | null): boolean {
    if (!selectedDate || !value) {
      return false;
    }

    const year1 = value.getFullYear();
    const year2 = selectedDate.getFullYear();

    if (year1 < year2) return true;
    if (year1 > year2) return false;

    const month1 = value.getMonth();
    const month2 = selectedDate.getMonth();

    if (month1 < month2) return true;
    if (month1 > month2) return false;

    const day1 = value.getDate();
    const day2 = selectedDate.getDate();
    return day1 < day2;
  }

}
