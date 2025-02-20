import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equalDay',
  pure: true,
  standalone: true,
})
export class EqualDayPipe implements PipeTransform {
  transform(value: Date | null, selectedDate: Date | null): boolean {
    return value?.getDate() === selectedDate?.getDate() &&
      value?.getMonth() === selectedDate?.getMonth() &&
      value?.getFullYear() === selectedDate?.getFullYear();
  }
}
