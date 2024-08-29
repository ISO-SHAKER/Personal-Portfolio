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
}
