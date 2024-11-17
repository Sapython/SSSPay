import { TestBed } from '@angular/core/testing';

import { AdminDatabaseService } from './admin-database.service';

describe('AdminDatabaseService', () => {
  let service: AdminDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
