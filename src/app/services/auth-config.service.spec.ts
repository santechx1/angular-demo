import { TestBed } from '@angular/core/testing';

import { AuthConfigService } from './auth-config.service';

describe('AuthConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthConfigService = TestBed.get(AuthConfigService);
    expect(service).toBeTruthy();
  });
});
