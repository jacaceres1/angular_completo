import { TestBed } from '@angular/core/testing';

import { RoutesAuthGuard } from './routes-auth.guard';

describe('RoutesAuthGuard', () => {
  let guard: RoutesAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoutesAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
