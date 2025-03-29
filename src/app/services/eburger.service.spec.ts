import { TestBed } from '@angular/core/testing';

import { EburgerService } from './eburger.service';

describe('EburgerService', () => {
  let service: EburgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EburgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
