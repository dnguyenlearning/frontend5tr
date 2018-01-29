import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThucphamchayComponent } from './thucphamchay.component';

describe('ThucphamchayComponent', () => {
  let component: ThucphamchayComponent;
  let fixture: ComponentFixture<ThucphamchayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThucphamchayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThucphamchayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
