import { TestBed, inject } from '@angular/core/testing';

import { SecureHttpClientService } from './secure-http-client.service';

describe('SecureHttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureHttpClientService]
    });
  });

  it('should be created', inject([SecureHttpClientService], (service: SecureHttpClientService) => {
    expect(service).toBeTruthy();
  }));
});
