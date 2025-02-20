import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSingleDayComponent } from './calendar-single-day.component';

describe('CalendarDaysComponent', () => {
  let component: CalendarSingleDayComponent;
  let fixture: ComponentFixture<CalendarSingleDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarSingleDayComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarSingleDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
