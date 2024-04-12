import { TestBed } from '@angular/core/testing';

import { DonationsProfileServiceService } from './donations-profile-service.service';

describe('DonationsProfileServiceService', () => {
  let service: DonationsProfileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationsProfileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
