import { inject, Injectable } from '@angular/core';
import { MongodbService } from './mongodb.service';
import { map, Observable } from 'rxjs';

export interface IContact {
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
}
