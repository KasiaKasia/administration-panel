import { TestBed, inject, async, getTestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let injector: TestBed;
  let serviceGet: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClient],
      providers: [AuthService]
    });
    injector = getTestBed();
    serviceGet = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', async(inject([HttpTestingController, AuthService],
    (httpClient: HttpTestingController, service: AuthService) => {
      expect(service).toBeTruthy();
    })));
});
