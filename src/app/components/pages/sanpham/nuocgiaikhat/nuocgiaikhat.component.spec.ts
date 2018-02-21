import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuocgiaikhatComponent } from './nuocgiaikhat.component';

describe('NuocgiaikhatComponent', () => {
  let component: NuocgiaikhatComponent;
  let fixture: ComponentFixture<NuocgiaikhatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuocgiaikhatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuocgiaikhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
