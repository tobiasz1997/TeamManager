import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimersPageComponent } from './timers-page.component';

describe('TimersComponent', () => {
  let component: TimersPageComponent;
  let fixture: ComponentFixture<TimersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimersPageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
