import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPageComponent } from './tasks-page.component';

describe('TasksComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksPageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
