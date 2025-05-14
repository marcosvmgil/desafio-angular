import { GenericRequestService } from './generic-request.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from '../environments/environment';

describe('GenericRequestService', () => {
  let service: GenericRequestService<any>;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    service = new GenericRequestService('test-path', httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a GET request', (done) => {
    const mockData = { id: 1, name: 'Test' };
    const params = { name: 'Test', page: '1' };

    httpClientMock.get.mockReturnValue(of(mockData));

    service.getPaginated(1, 'Test').subscribe((data) => {
      expect(data).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith(
        `${environment.apiURI}test-path`,
        { params }
      );
      done();
    });
  });

  it('should handle errors in GET request', (done) => {
    const errorMessage = 'Failed to fetch data';
    const params = { name: 'Test', page: '1' };

    httpClientMock.get.mockReturnValue(
      throwError(() => new Error(errorMessage))
    );

    service.getPaginated(1, 'Test').subscribe({
      next: () => fail('Should have failed with an error'),
      error: (error) => {
        expect(error.message).toBe(errorMessage);
        expect(httpClientMock.get).toHaveBeenCalledWith(
          `${environment.apiURI}test-path`,
          { params }
        );
        done();
      },
    });
  });

  it('should perform a POST request', (done) => {
    const mockData = { id: 1, name: 'Test' };
    const body = { name: 'Test' };
    httpClientMock.post.mockReturnValue(of(mockData));

    service.post(body).subscribe((data) => {
      expect(data).toEqual(mockData);
      expect(httpClientMock.post).toHaveBeenCalledWith(
        `${environment.apiURI}test-path`,
        body
      );
      done();
    });
  });

  it('should perform a PUT request', (done) => {
    const mockData = { id: 1, name: 'Updated Test' };
    const body = { name: 'Updated Test' };
    httpClientMock.put.mockReturnValue(of(mockData));

    service.put(body, '1').subscribe((data) => {
      expect(data).toEqual(mockData);
      expect(httpClientMock.put).toHaveBeenCalledWith(
        `${environment.apiURI}test-path/1`,
        body
      );
      done();
    });
  });
});
