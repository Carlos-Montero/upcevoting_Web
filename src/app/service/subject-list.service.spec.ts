import { TestBed, inject } from '@angular/core/testing';

import { SubjectListService } from './subject-list.service';

describe('SubjectListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectListService]
    });
  });

  it('should be created', inject([SubjectListService], (service: SubjectListService) => {
    expect(service).toBeTruthy();
  }));
});
