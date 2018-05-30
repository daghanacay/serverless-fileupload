import { TestBed, inject } from '@angular/core/testing';
import { SecurityService } from './security.service';


describe('SecurityServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityService]
    });
  });

  it('should be created', inject([SecurityService], (service: SecurityService) => {
    expect(service).toBeTruthy();
  }));

  it('should be false', inject([SecurityService], (service: SecurityService) => {
    expect(!service.isValid()).toBeTruthy();
  }));
});
