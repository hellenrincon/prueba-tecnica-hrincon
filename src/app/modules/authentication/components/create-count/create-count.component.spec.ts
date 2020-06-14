import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCountComponent } from './create-count.component';

describe('CreateCountComponent', () => {
  let component: CreateCountComponent;
  let fixture: ComponentFixture<CreateCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
