import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LoguinService } from './loguin.service';

describe('LoguinService', () => {
  let service: LoguinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LoguinService, provideHttpClient()
      ]
    });
    service = TestBed.inject(LoguinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
