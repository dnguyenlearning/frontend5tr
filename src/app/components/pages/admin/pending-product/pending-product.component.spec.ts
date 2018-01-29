import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProductComponent } from './pending-product.component';

describe('PendingProductComponent', () => {
  let component: PendingProductComponent;
  let fixture: ComponentFixture<PendingProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
