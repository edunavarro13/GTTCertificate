import { TestBed } from '@angular/core/testing';

import { GttJiraService } from './gtt-jira.service';

describe('GttJiraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GttJiraService = TestBed.get(GttJiraService);
    expect(service).toBeTruthy();
  });
});
