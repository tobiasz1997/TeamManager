import { FirstLetterUppercasePipe } from './first-letter-uppercase.pipe';

describe('FirstLetterUppercasePipe', () => {
  let pipe: FirstLetterUppercasePipe;

  beforeEach(() => {
    pipe = new FirstLetterUppercasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform first letter to uppercase', () => {
    const result = pipe.transform('test');
    expect(result).toBe('Test');
  });
});
