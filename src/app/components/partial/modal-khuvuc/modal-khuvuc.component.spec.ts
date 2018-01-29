import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKhuvucComponent } from './modal-khuvuc.component';

describe('ModalKhuvucComponent', () => {
  let component: ModalKhuvucComponent;
  let fixture: ComponentFixture<ModalKhuvucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalKhuvucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKhuvucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
