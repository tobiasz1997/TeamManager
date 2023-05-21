import { TaskStatusToTextPipe } from './task-status-to-text.pipe';

describe('TaskStatusToTextPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskStatusToTextPipe();
    expect(pipe).toBeTruthy();
  });
});
