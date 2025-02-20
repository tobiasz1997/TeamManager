import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSingleWrapperComponent } from './calendar-single-wrapper.component';

describe('CalendarSingleSelectDayComponent', () => {
  let component: CalendarSingleWrapperComponent;
  let fixture: ComponentFixture<CalendarSingleWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarSingleWrapperComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarSingleWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
