import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;

  beforeEach(() => {
    component = new ToastComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on click emit action', () => {
    const emit = jest.spyOn(component.closeLoggerClick$, 'emit').mockReset();
    component.handleClose();

    expect(emit).toHaveBeenCalled();
  });
});
