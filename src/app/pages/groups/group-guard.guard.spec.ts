import { TestBed } from '@angular/core/testing';

import { GroupGuardGuard } from './group-guard.guard';

describe('GroupGuardGuard', () => {
  let guard: GroupGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GroupGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
