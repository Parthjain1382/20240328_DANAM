import { TestBed } from '@angular/core/testing';

import { CreateCauseServiceService } from './create-cause-service.service';

describe('CreateCauseServiceService', () => {
  let service: CreateCauseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCauseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
