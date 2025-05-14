import { Inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, retry, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenericRequestService<T> {
  private readonly URI = environment.apiURI;
  private readonly TIMEOUT = environment.timeout;

  constructor(
    @Inject(String) private path: string = '',
    private http: HttpClient
  ) {}

  private getGeneric(id?: string, params?: any): Observable<T> {
    const url = id
      ? `${this.URI}${this.path}/${id}`
      : `${this.URI}${this.path}`;
    return params ? this.http.get<T>(url, { params }) : this.http.get<T>(url);
  }

  private postGeneric(body: any = {}, id?: string): Observable<T> {
    const url = id
      ? `${this.URI}${this.path}/${id}`
      : `${this.URI}${this.path}`;
    return this.http.post<T>(url, body);
  }

  private putGeneric(body: any = {}, id?: string): Observable<T> {
    const url = id
      ? `${this.URI}${this.path}/${id}`
      : `${this.URI}${this.path}`;
    return this.http.put<T>(url, body);
  }

  getPaginated(page: number, name: string): Observable<T> {
    const params = { name, page: page.toString() };
    return new Observable<T>((observer) => {
      this.getGeneric(undefined, params).subscribe({
        next: (res) => observer.next(res),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    }).pipe(retry(2), timeout(this.TIMEOUT));
  }

  get(params?: any, id?: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.getGeneric(id, params).subscribe({
        next: (res) => observer.next(res),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    }).pipe(retry(2), timeout(this.TIMEOUT));
  }

  post(body: any, id?: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.postGeneric(body, id).subscribe({
        next: (res) => observer.next(res),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    }).pipe(retry(2), timeout(this.TIMEOUT));
  }

  put(body: any, id?: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.putGeneric(body, id).subscribe({
        next: (res) => observer.next(res),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    }).pipe(retry(2), timeout(this.TIMEOUT));
  }
}
