import { LessDayPipe } from './less-day.pipe';

describe('SmallerDayPipe', () => {
  it('create an instance', () => {
    const pipe = new LessDayPipe();
    expect(pipe).toBeTruthy();
  });
});
