import { TestBed, inject } from '@angular/core/testing';

import { TintucService } from './tintuc.service';

describe('TintucService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TintucService]
    });
  });

  it('should be created', inject([TintucService], (service: TintucService) => {
    expect(service).toBeTruthy();
  }));
});
