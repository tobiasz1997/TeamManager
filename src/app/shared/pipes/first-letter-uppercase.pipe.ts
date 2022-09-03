import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUppercase',
  pure: true
})
/**
 * @ngdoc pipe
 * @name firstLetterUppercase
 * @description This is the pipe that change the first letter in word/sentence to uppercase.
 */
export class FirstLetterUppercasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) { return ''; }
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }

}
