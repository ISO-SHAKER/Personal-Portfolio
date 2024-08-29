import { inject, Injectable } from '@angular/core';
import { MongodbService } from './mongodb.service';
import { map, Observable } from 'rxjs';

export interface IProject {
  imgSrc: string;
  title: string;
  modalTitle: string;
  description: string;
  features: string[];
  githubURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  mongodb = inject(MongodbService);

  private projectsURL = 'projects';

  getAllProjects(): Observable<Array<IProject>> {
    return this.mongodb
      .getRequest<IProject>(this.projectsURL)
      .pipe(map((response) => Object.values(response)[1]?.projects));
  }
}
