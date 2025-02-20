import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRangeDaysComponent } from './calendar-range-days.component';

describe('CalendarRangeDaysComponent', () => {
  let component: CalendarRangeDaysComponent;
  let fixture: ComponentFixture<CalendarRangeDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarRangeDaysComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarRangeDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
