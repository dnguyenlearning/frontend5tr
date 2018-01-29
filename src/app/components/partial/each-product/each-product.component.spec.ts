import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachProductComponent } from './each-product.component';

describe('EachProductComponent', () => {
  let component: EachProductComponent;
  let fixture: ComponentFixture<EachProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
