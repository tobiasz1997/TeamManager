import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderButtonIconComponent } from './header-button-icon.component';

describe('HeaderButtonIconComponent', () => {
  let component: HeaderButtonIconComponent;
  let fixture: ComponentFixture<HeaderButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderButtonIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
