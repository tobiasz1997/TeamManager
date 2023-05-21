import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListHeaderComponent } from './tasks-list-header.component';

describe('TasksListHeaderComponent', () => {
  let component: TasksListHeaderComponent;
  let fixture: ComponentFixture<TasksListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksListHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
