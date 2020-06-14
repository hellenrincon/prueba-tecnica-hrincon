import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepQuantityComponent } from './step-quantity.component';

describe('StepQuantityComponent', () => {
  let component: StepQuantityComponent;
  let fixture: ComponentFixture<StepQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
