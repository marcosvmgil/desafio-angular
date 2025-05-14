import { GenericRequestService } from './generic-request.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from '../environments/environment';

describe('GenericRequestService', () => {
  let service: GenericRequestService<any>;
  let httpMock: jest.Mocked<HttpClient>;

  const mockResponse = { data: 'ok' };
  const apiURI = environment.apiURI;
  const timeoutValue = environment.timeout;

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
    } as any;

    service = new GenericRequestService<any>('characters', httpMock);
  });

  it('should call getPaginated with correct params', (done) => {
    httpMock.get.mockReturnValue(of(mockResponse));

    service.getPaginated(2, 'Rick').subscribe((res) => {
      expect(httpMock.get).toHaveBeenCalledWith(`${apiURI}characters`, {
        params: { name: 'Rick', page: '2' },
      });
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('should call get with id', (done) => {
    httpMock.get.mockReturnValue(of(mockResponse));

    service.get({}, '123').subscribe((res) => {
      expect(httpMock.get).toHaveBeenCalledWith(`${apiURI}characters/123`, {
        params: {},
      });
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('should call get without id', (done) => {
    httpMock.get.mockReturnValue(of(mockResponse));

    service.get({ status: 'Alive' }).subscribe((res) => {
      expect(httpMock.get).toHaveBeenCalledWith(`${apiURI}characters`, {
        params: { status: 'Alive' },
      });
      done();
    });
  });

  it('should call post with body and id', (done) => {
    httpMock.post.mockReturnValue(of(mockResponse));

    const body = { name: 'Morty' };

    service.post(body, '123').subscribe((res) => {
      expect(httpMock.post).toHaveBeenCalledWith(
        `${apiURI}characters/123`,
        body
      );
      expect(res).toEqual(mockResponse);
      done();
    });
  });

  it('should call post without id', (done) => {
    httpMock.post.mockReturnValue(of(mockResponse));

    const body = { name: 'Rick' };

    service.post(body).subscribe((res) => {
      expect(httpMock.post).toHaveBeenCalledWith(`${apiURI}characters`, body);
      done();
    });
  });

  it('should call put with body and id', (done) => {
    httpMock.put.mockReturnValue(of(mockResponse));

    const body = { name: 'Rick' };

    service.put(body, '321').subscribe((res) => {
      expect(httpMock.put).toHaveBeenCalledWith(
        `${apiURI}characters/321`,
        body
      );
      done();
    });
  });

  it('should call put without id', (done) => {
    httpMock.put.mockReturnValue(of(mockResponse));

    const body = { name: 'Morty' };

    service.put(body).subscribe((res) => {
      expect(httpMock.put).toHaveBeenCalledWith(`${apiURI}characters`, body);
      done();
    });
  });

  it('should propagate errors from getPaginated', (done) => {
    httpMock.get.mockReturnValue(throwError(() => new Error('API Error')));

    service.getPaginated(1, 'Summer').subscribe({
      error: (err) => {
        expect(err.message).toBe('API Error');
        done();
      },
    });
  });
});
