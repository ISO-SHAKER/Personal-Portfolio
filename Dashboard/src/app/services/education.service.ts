import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface IEducation {
  _id: string;
  mainTitle: string;
  subTitle: string;
  calendar: string;
}

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  mongodb = inject(MongodbService);

  private educationURL = 'educations';

  getAllEducations(): Observable<Array<IEducation>> {
    return this.mongodb
      .getRequest<IEducation>(this.educationURL)
      .pipe(map((response) => Object.values(response)[1]?.educations));
  }

  updateEducation(educationData: IEducation): Observable<IEducation> {
    return this.mongodb
      .patchRequest<IEducation>(
        `${this.educationURL}/${educationData._id}`,
        educationData,
        {}
      )
      .pipe(map((response) => Object.values(response)[1]?.education));
  }

  addEducation(educationData: IEducation): Observable<IEducation> {
    return this.mongodb
      .postRequest<IEducation>(this.educationURL, educationData)
      .pipe(map((response) => Object.values(response)[1]?.education));
  }

  deleteEducation(id: string): Observable<IEducation> {
    return this.mongodb
      .deleteRequest<IEducation>(`${this.educationURL}/${id}`)
      .pipe(map((response) => Object.values(response)[1]?.education));
  }
}
