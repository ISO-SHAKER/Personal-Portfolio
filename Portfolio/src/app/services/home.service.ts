import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface IHome {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  facebook: string;
  linkedin: string;
  github: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  mongodb = inject(MongodbService);

  private homeURL = 'home';

  getHomeData(): Observable<IHome> {
    return this.mongodb
      .getRequest<IHome>(this.homeURL)
      .pipe(map((response) => Object.values(response)[1]?.home));
  }
}
