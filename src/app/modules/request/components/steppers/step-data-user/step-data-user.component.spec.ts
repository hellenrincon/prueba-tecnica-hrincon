import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDataUserComponent } from './step-data-user.component';

describe('StepDataUserComponent', () => {
  let component: StepDataUserComponent;
  let fixture: ComponentFixture<StepDataUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepDataUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDataUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
