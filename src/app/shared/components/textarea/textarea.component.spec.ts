import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;

  beforeEach(async () => {
    component = new TextareaComponent(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
