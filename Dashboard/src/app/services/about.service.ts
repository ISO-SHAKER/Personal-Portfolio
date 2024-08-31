import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface IAbout {
  _id: string;
  imageSrc: string;
  name: string;
  title: string;
  description: string;
  experienceYears: number;
  successProjects: number;
  cvURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  mongodb = inject(MongodbService);

  private aboutURL = 'about';

  getAboutData(): Observable<IAbout> {
    return this.mongodb
      .getRequest<IAbout>(this.aboutURL)
      .pipe(map((response) => Object.values(response)[1]?.about));
  }

  updateAboutData(aboutData: FormData, id: string): Observable<IAbout> {
    return this.mongodb
      .patchRequest<IAbout>(`${this.aboutURL}/${id}`, aboutData, {})
      .pipe(map((response) => Object.values(response)[1]?.about));
  }
}
