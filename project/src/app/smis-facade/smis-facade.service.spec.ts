import { TestBed } from '@angular/core/testing';

import { SMISFacadeService } from './smis-facade.service';
import { SMISFacadeModule } from './smis-facade.service.module';

describe('SmisFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      SMISFacadeModule
    ]
  }));

  it('should be created', () => {
    const service: SMISFacadeService = TestBed.get(SMISFacadeService);
    expect(service).toBeTruthy();
  });
});
