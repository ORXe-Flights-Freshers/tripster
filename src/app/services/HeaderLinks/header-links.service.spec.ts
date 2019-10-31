import { TestBed } from '@angular/core/testing';

import { HeaderLinksService } from './header-links.service';

describe('HeaderLinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderLinksService = TestBed.get(HeaderLinksService);
    expect(service).toBeTruthy();
  });
});
