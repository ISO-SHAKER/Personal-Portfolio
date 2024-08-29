import { inject, Injectable } from '@angular/core';
import { MongodbService } from './mongodb.service';
import { map, Observable } from 'rxjs';

export interface IAbout {
  name: string;
  title: string;
  imageSrc: string;
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
}
