import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuysanComponent } from './thuysan.component';

describe('ThuysanComponent', () => {
  let component: ThuysanComponent;
  let fixture: ComponentFixture<ThuysanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuysanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuysanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
