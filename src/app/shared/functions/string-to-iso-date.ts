import * as moment from 'moment';

export function stringToIsoDate(date?: string): Date | undefined {
  return typeof date === 'string' ? moment.utc(date).toDate() : undefined;
}
