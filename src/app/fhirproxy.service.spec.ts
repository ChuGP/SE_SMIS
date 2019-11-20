import { TestBed } from '@angular/core/testing';

import { FHIRProxyService } from './fhirproxy.service';

describe('FHIRProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FHIRProxyService = TestBed.get(FHIRProxyService);
    expect(service).toBeTruthy();
  });
});
