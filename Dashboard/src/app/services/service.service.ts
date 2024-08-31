import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface IService {
  _id: string;
  title: string;
  modalTitle: string;
  modalDescription: string;
  provisions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  mongodb = inject(MongodbService);

  private servicesURL = 'services';

  getAllServices(): Observable<Array<IService>> {
    return this.mongodb
      .getRequest<IService>(this.servicesURL)
      .pipe(map((response) => Object.values(response)[1]?.services));
  }

  updateService(serviceData: IService): Observable<IService> {
    return this.mongodb
      .patchRequest<IService>(
        `${this.servicesURL}/${serviceData._id}`,
        serviceData,
        {}
      )
      .pipe(map((response) => Object.values(response)[1]?.service));
  }

  addService(serviceData: IService): Observable<IService> {
    return this.mongodb
      .postRequest<IService>(this.servicesURL, serviceData)
      .pipe(map((response) => Object.values(response)[1]?.service));
  }

  deleteService(id: string): Observable<IService> {
    return this.mongodb
      .deleteRequest<IService>(`${this.servicesURL}/${id}`)
      .pipe(map((response) => Object.values(response)[1]?.service));
  }
}
