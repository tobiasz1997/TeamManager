import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;

  beforeEach(() => {
    component = new CarouselComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on click emit left action', () => {
    const emit = jest.spyOn(component.leftArrowClick$, 'emit').mockReset();
    component.onLeftArrowClick();

    expect(emit).toHaveBeenCalled();
  });

  it('should on click emit right action', () => {
    const emit = jest.spyOn(component.rightArrowClick$, 'emit').mockReset();
    component.onRightArrowClick();

    expect(emit).toHaveBeenCalled();
  });
});
