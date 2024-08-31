import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface IContact {
  _id: string;
  phone: string;
  email: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  mongodb = inject(MongodbService);

  private contactURL = 'contact';

  getContactData(): Observable<IContact> {
    return this.mongodb
      .getRequest<IContact>(this.contactURL)
      .pipe(map((response) => Object.values(response)[1]?.contact));
  }

  updateContactData(contactData: IContact): Observable<any> {
    return this.mongodb
      .patchRequest<IContact>(
        `${this.contactURL}/${contactData._id}`,
        contactData,
        {}
      )
      .pipe(map((response) => Object.values(response)[1]?.contact));
  }
}
