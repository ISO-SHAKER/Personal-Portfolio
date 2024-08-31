import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface IProject {
  _id: string;
  title: string;
  modalTitle: string;
  description: string;
  imgSrc: string;
  githubURL: string;
  features: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  mongodb = inject(MongodbService);

  private projectsURL = 'projects';

  getAllProjects(): Observable<Array<IProject>> {
    return this.mongodb
      .getRequest<IProject>(this.projectsURL)
      .pipe(map((response) => Object.values(response)[1]?.projects));
  }

  updateProject(projectData: any, _id: string): Observable<IProject> {
    return this.mongodb
      .patchRequest<IProject>(`${this.projectsURL}/${_id}`, projectData, {})
      .pipe(map((response) => Object.values(response)[1]?.project));
  }

  addProject(projectData: IProject): Observable<IProject> {
    return this.mongodb
      .postRequest<IProject>(this.projectsURL, projectData)
      .pipe(map((response) => Object.values(response)[1]?.project));
  }

  deleteProject(id: string): Observable<IProject> {
    return this.mongodb
      .deleteRequest<IProject>(`${this.projectsURL}/${id}`)
      .pipe(map((response) => Object.values(response)[1]?.project));
  }
}
