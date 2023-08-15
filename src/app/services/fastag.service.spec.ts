import { TestBed } from '@angular/core/testing';

import { FastagService } from './fastag.service';

describe('FastagService', () => {
  let service: FastagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
