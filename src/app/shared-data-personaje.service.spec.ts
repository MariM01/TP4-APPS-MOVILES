import { TestBed } from '@angular/core/testing';

import { SharedDataPersonajeService } from './shared-data-personaje.service';

describe('SharedDataPersonajeService', () => {
  let service: SharedDataPersonajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataPersonajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
