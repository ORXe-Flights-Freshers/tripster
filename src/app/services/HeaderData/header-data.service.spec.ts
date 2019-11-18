import {TestBed} from '@angular/core/testing';

import {HeaderDataService} from './header-data.service';

describe('HeaderLinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderDataService = TestBed.get(HeaderDataService);
    expect(service).toBeTruthy();
  });
});
