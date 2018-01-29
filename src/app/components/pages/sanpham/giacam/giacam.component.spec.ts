import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiacamComponent } from './giacam.component';

describe('GiacamComponent', () => {
  let component: GiacamComponent;
  let fixture: ComponentFixture<GiacamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiacamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiacamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
