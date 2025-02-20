import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day',
  pure: true,
  standalone: true,
})
export class DayPipe implements PipeTransform {
  transform(value: Date | null): number {
    return value?.getDate();
  }
}
