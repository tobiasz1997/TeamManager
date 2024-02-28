import { LoaderService } from '@shared/services/loader.service';
import { loggerMock } from '@mocks/global-mocks';
import { first } from 'rxjs';

describe('LoaderService', () => {
  let service: LoaderService;
  let logger = loggerMock;

  beforeEach(() => {
    service = new LoaderService(logger);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error because no url', () => {
    const errorMethod = jest.spyOn(logger, 'error').mockReset();
    service.setLoading(true, null);
    expect(errorMethod).toHaveBeenCalled();
  });

  it('should loading be true', (done) => {
    const url = 'test';
    service.setLoading(true, url);

    service.loading$
      .pipe(first())
      .subscribe(result => {
        expect(result).toBeTruthy();
        done();
      });
  });

  it('should loading be false for the same url', (done) => {
    const url = 'test';
    service.setLoading(true, url);
    service.setLoading(false, url);

    service.loading$
      .pipe(first())
      .subscribe(result => {
        expect(result).not.toBeTruthy();
        done();
      });
  });

  it('should loading be true for different urls', (done) => {
    const url = 'test';
    service.setLoading(true, url);
    service.setLoading(false, url + url);

    service.loading$
      .pipe(first())
      .subscribe(result => {
        expect(result).toBeTruthy();
        done();
      });
  });
});
