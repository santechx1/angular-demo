import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        AppConfig,
        { provide: HttpClient, useValue: spy }
      ]
    });
    authService = TestBed.get(AuthService);
    httpClientSpy = TestBed.get(HttpClient);

  });

  it('should compile', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
