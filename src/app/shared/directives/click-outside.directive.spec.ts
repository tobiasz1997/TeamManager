import { ClickOutsideDirective } from './click-outside.directive';
import { elementRefMock } from '@mocks/global-mocks';

describe('ClickOutsideDirective', () => {
  let component: ClickOutsideDirective;

  beforeEach(() => {
    component = new ClickOutsideDirective(elementRefMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on click outside emit action', () => {
    const emit = jest.spyOn(component.clickOutside, 'emit').mockReset();
    const event: ReturnType<jest.Mock> = {
      target: false,
    };
    component.isActive = true;
    component.documentClick(event);

    expect(emit).toHaveBeenCalled();
  });

  it('should on click inside no emit action', () => {
    const emit = jest.spyOn(component.clickOutside, 'emit').mockReset();
    const event: ReturnType<jest.Mock> = {
      target: true,
    };
    component.isActive = true;
    component.documentClick(event);

    expect(emit).not.toHaveBeenCalled();
  });
});
