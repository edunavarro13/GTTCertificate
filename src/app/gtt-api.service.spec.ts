import { TestBed } from '@angular/core/testing';

import { GttApiService } from './gtt-api.service';

describe('GttApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GttApiService = TestBed.get(GttApiService);
    expect(service).toBeTruthy();
  });
});
