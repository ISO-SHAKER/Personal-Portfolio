import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface IWork {
  _id: string;
  mainTitle: string;
  subTitle: string;
  calendar: string;
}

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  mongodb = inject(MongodbService);

  private workURL = 'works';

  getAllWorks(): Observable<Array<IWork>> {
    return this.mongodb
      .getRequest<IWork>(this.workURL)
      .pipe(map((response) => Object.values(response)[1]?.works));
  }

  updateWork(workData: IWork): Observable<IWork> {
    return this.mongodb
      .patchRequest<IWork>(`${this.workURL}/${workData._id}`, workData, {})
      .pipe(map((response) => Object.values(response)[1]?.work));
  }

  addWork(workData: IWork): Observable<IWork> {
    return this.mongodb
      .postRequest<IWork>(this.workURL, workData)
      .pipe(map((response) => Object.values(response)[1]?.work));
  }

  deleteWork(id: string): Observable<IWork> {
    return this.mongodb
      .deleteRequest<IWork>(`${this.workURL}/${id}`)
      .pipe(map((response) => Object.values(response)[1]?.work));
  }
}
