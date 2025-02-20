import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRangeWrapperComponent } from './calendar-range-wrapper.component';

describe('CalendarSingleRangeDaysComponent', () => {
  let component: CalendarRangeWrapperComponent;
  let fixture: ComponentFixture<CalendarRangeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarRangeWrapperComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarRangeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
