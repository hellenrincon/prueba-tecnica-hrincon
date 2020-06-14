import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualRegLogComponent } from './dual-reg-log.component';

describe('DualRegLogComponent', () => {
  let component: DualRegLogComponent;
  let fixture: ComponentFixture<DualRegLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualRegLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualRegLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
