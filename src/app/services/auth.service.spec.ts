import { TestBed, inject } from '@angular/core/testing';

import { AuthServiceLogin } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServiceLogin]
    });
  });

  it('should be created', inject([AuthServiceLogin], (service: AuthServiceLogin) => {
    expect(service).toBeTruthy();
  }));
});
