import { Injectable } from '@angular/core';
import { DaysMatrixType } from '@shared/components/calendar/models/days-matrix.type';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private readonly _daysOrderInMatrix: Record<number, number> = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
  };

  public buildMatrix(date: Date): DaysMatrixType {
    const result: DaysMatrixType = this.buildDaysMatrixOfNulls();
    const days = this.getDaysInMonth(date);

    const rows = 6;
    const columns = 7;
    let daysIndex = 0;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        if (daysIndex === 0) {
          if (this._daysOrderInMatrix[days[daysIndex].getDay()] === column) {
            result[row][column] = days[daysIndex];
            daysIndex++;
          }
        } else if (daysIndex > 0 && daysIndex < days.length) {
          result[row][column] = days[daysIndex];
          daysIndex++;
        }
      }
    }

    return result;

    /* matrix 6 x 7
        1 , 2 , 3 , 4 , 5 , 6 , 0
     [ _ , _ , _ , _ , _ , _ , _ ] 0
     [ _ , _ , _ , _ , _ , _ , _ ] 1
     [ _ , _ , _ , _ , _ , _ , _ ] 2
     [ _ , _ , _ , _ , _ , _ , _ ] 3
     [ _ , _ , _ , _ , _ , _ , _ ] 4
     [ _ , _ , _ , _ , _ , _ , _ ] 5

    */
  }

  private getDaysInMonth(dateProps: Date): Date[] {
    const year = dateProps.getFullYear();
    const month = dateProps.getMonth();
    const date = new Date(year, month, 1);
    let days: Date[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  private buildDaysMatrixOfNulls(): DaysMatrixType {
    return [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];
  }
}
