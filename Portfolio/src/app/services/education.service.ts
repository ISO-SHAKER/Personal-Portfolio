import { inject, Injectable } from '@angular/core';
import { MongodbService } from './mongodb.service';
import { map, Observable } from 'rxjs';

export interface IEducation {
  mainTitle: string;
  subTitle: string;
  calendar: string;
}

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  mongodb = inject(MongodbService);

  private educationsURL = 'educations';

  getAllEducations(): Observable<Array<IEducation>> {
    return this.mongodb
      .getRequest<IEducation>(this.educationsURL)
      .pipe(map((response) => Object.values(response)[1]?.educations));
  }
}
