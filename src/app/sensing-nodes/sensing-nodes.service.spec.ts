import { TestBed } from '@angular/core/testing';

import { SensingNodesService } from './sensing-nodes.service';

describe('SensingNodesService', () => {
  let service: SensingNodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensingNodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
