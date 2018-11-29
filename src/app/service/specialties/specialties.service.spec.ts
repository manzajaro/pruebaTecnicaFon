import { TestBed } from '@angular/core/testing';

import { SpecialtiesService } from './specialties.service';

describe('SpecialtiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialtiesService = TestBed.get(SpecialtiesService);
    expect(service).toBeTruthy();
  });
});
