import { TestBed } from '@angular/core/testing';

import { RecursoServiceService } from './recurso-service.service';

describe('RecursoServiceService', () => {
  let service: RecursoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
