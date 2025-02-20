import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayButtonComponent } from './calendar-day-button.component';

describe('CalendarDayButtonComponent', () => {
  let component: CalendarDayButtonComponent;
  let fixture: ComponentFixture<CalendarDayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDayButtonComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarDayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
