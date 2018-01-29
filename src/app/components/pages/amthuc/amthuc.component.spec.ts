import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmthucComponent } from './amthuc.component';

describe('AmthucComponent', () => {
  let component: AmthucComponent;
  let fixture: ComponentFixture<AmthucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmthucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmthucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
