import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RausachComponent } from './rausach.component';

describe('RausachComponent', () => {
  let component: RausachComponent;
  let fixture: ComponentFixture<RausachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RausachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RausachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
