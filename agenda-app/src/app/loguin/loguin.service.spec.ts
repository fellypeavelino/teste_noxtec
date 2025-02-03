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

  it('should login a user', async () => {
    const mockResponse = { id:1, loguin: 'test', senha: 'password' };
    const loguinData = { loguin: 'test', senha: 'password' };

    service.loguin(loguinData).then(response => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
