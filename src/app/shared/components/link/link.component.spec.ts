import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;

  beforeEach(() => {
    component = new LinkComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on click emit action', () => {
    const emit = jest.spyOn(component.action, 'emit').mockReset();
    component.handleClick();

    expect(emit).toHaveBeenCalled();
  });

  it('should on click no emit action because disabled', () => {
    const emit = jest.spyOn(component.action, 'emit').mockReset();
    component.disabled = true;
    component.handleClick();

    expect(emit).not.toHaveBeenCalled();
  });
});
