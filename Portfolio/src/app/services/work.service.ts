import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface IWork {
  mainTitle: string;
  subTitle: string;
  calendar: string;
}

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  mongodb = inject(MongodbService);

  private worksURL = 'works';

  getAllWorks(): Observable<Array<IWork>> {
    return this.mongodb
      .getRequest<IWork>(this.worksURL)
      .pipe(map((response) => Object.values(response)[1]?.works));
  }
}
