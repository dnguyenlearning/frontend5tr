import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTintucComponent } from './create-tintuc.component';

describe('CreateTintucComponent', () => {
  let component: CreateTintucComponent;
  let fixture: ComponentFixture<CreateTintucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTintucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
