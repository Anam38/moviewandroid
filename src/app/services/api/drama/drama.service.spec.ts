import { TestBed } from '@angular/core/testing';

import { DramaService } from './drama.service';

describe('DramaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DramaService = TestBed.get(DramaService);
    expect(service).toBeTruthy();
  });
});
