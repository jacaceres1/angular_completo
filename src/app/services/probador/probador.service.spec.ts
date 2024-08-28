import { TestBed } from '@angular/core/testing';

import { ProbadorService } from './probador.service';

describe('ProbadorService', () => {
  let service: ProbadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProbadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
