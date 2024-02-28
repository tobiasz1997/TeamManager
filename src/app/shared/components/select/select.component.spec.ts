import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;

  beforeEach(() => {
    component = new SelectComponent(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
