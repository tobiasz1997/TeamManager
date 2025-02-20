import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTableDaysComponent } from './calendar-table-days.component';

describe('CalendarTableDaysComponent', () => {
  let component: CalendarTableDaysComponent;
  let fixture: ComponentFixture<CalendarTableDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarTableDaysComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarTableDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
