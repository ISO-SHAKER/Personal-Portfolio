import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MongodbService {
  http = inject(HttpClient);

  private apiURL = 'http://localhost:5000/api';

  getRequest<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${path}`);
  }

  postRequest<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiURL}/${path}`, body);
  }

  patchRequest<T>(
    path: string,
    body: any,
    options: any
  ): Observable<ArrayBuffer> {
    return this.http.patch(`${this.apiURL}/${path}`, body, options);
  }

  deleteRequest<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiURL}/${path}`);
  }
}
