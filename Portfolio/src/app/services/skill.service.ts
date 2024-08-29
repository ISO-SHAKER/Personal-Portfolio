import { inject, Injectable } from '@angular/core';
import { MongodbService } from './mongodb.service';
import { map, Observable } from 'rxjs';

export interface ISkill {
  category: String;
  experience: String;
  skillsList: ISkillItem[];
}

export interface ISkillItem {
  name: String;
  image: String;
}

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  mongodb = inject(MongodbService);

  private skillsURL = 'skills';

  getAllSkills(): Observable<Array<ISkill>> {
    return this.mongodb
      .getRequest<ISkill>(this.skillsURL)
      .pipe(map((response) => Object.values(response)[1]?.skills));
  }
}
