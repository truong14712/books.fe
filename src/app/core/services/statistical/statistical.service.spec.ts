/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatisticalService } from './statistical.service';

describe('Service: Statistical', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatisticalService],
    });
  });

  it('should ...', inject([StatisticalService], (service: StatisticalService) => {
    expect(service).toBeTruthy();
  }));
});
