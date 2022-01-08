import { TestBed } from '@angular/core/testing';

import { CyclicTransactionsService } from './cyclic-transactions.service';

describe('CyclicTransactionsService', () => {
  let service: CyclicTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CyclicTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
