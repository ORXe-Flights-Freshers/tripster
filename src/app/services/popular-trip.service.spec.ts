import { TestBed } from '@angular/core/testing';

import { PopularTripService } from './popular-trip.service';

describe('PopularTripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopularTripService = TestBed.get(PopularTripService);
    expect(service).toBeTruthy();
  });
});
