import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;

  beforeEach(() => {
    component = new InputComponent(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
