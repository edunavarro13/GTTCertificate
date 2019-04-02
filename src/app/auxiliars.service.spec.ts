import { TestBed } from '@angular/core/testing';

import { AuxiliarsService } from './auxiliars.service';

describe('AuxiliarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuxiliarsService = TestBed.get(AuxiliarsService);
    expect(service).toBeTruthy();
  });
});
