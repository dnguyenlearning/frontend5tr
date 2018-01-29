import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraicayComponent } from './traicay.component';

describe('TraicayComponent', () => {
  let component: TraicayComponent;
  let fixture: ComponentFixture<TraicayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraicayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraicayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
