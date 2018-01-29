import { TestBed, inject } from '@angular/core/testing';

import { LoaisanphamService } from './loaisanpham.service';

describe('LoaisanphamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaisanphamService]
    });
  });

  it('should be created', inject([LoaisanphamService], (service: LoaisanphamService) => {
    expect(service).toBeTruthy();
  }));
});
