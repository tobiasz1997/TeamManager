import { BackButtonComponent } from './back-button.component';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;

  beforeEach(() => {
    component = new BackButtonComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on click emit action', () => {
    const emit = jest.spyOn(component.action, 'emit').mockReset();
    component.handleClick();

    expect(emit).toHaveBeenCalled();
  });
});
