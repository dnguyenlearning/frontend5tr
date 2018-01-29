import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProductDetailComponent } from './member-product-detail.component';

describe('MemberProductDetailComponent', () => {
  let component: MemberProductDetailComponent;
  let fixture: ComponentFixture<MemberProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
