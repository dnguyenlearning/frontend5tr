import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoluganComponent } from './solugan.component';

describe('SoluganComponent', () => {
  let component: SoluganComponent;
  let fixture: ComponentFixture<SoluganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoluganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoluganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
