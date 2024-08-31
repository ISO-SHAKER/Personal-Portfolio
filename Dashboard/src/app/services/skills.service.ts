import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MongodbService } from './mongodb.service';

export interface ISkill {
  _id: string;
  category: string;
  experience: number;
  skillsList: ISkillItem[];
}

export interface ISkillItem {
  _id: string;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  mongodb = inject(MongodbService);

  private skillsURL = 'skills';

  /* ===== CRUD Of Skill ===== */

  getAllSkills(): Observable<Array<ISkill>> {
    return this.mongodb
      .getRequest<ISkill>(this.skillsURL)
      .pipe(map((response) => Object.values(response)[1]?.skills));
  }

  updateSkill(skillData: ISkill): Observable<ISkill> {
    return this.mongodb
      .patchRequest<ISkill>(`${this.skillsURL}/${skillData._id}`, skillData, {})
      .pipe(map((response) => Object.values(response)[1]?.skill));
  }

  addSkill(skillData: ISkill): Observable<ISkill> {
    return this.mongodb
      .postRequest<ISkill>(this.skillsURL, skillData)
      .pipe(map((response) => Object.values(response)[1]?.skill));
  }

  deleteSkill(id: string): Observable<ISkill> {
    return this.mongodb
      .deleteRequest<ISkill>(`${this.skillsURL}/${id}`)
      .pipe(map((response) => Object.values(response)[1]?.skill));
  }

  /* ===== CRUD Of Skill-Item ===== */

  addSkillItem(skillData: ISkillItem, skillId: string): Observable<ISkillItem> {
    return this.mongodb
      .postRequest<ISkillItem>(
        `${this.skillsURL}/${skillId}/skillsList`,
        skillData
      )
      .pipe(map((response) => Object.values(response)[1]?.skillItem));
  }

  updateSkillItem(
    itemData: ISkillItem,
    skillId: string,
    itemId: string
  ): Observable<ISkillItem> {
    return this.mongodb
      .patchRequest<ISkillItem>(
        `${this.skillsURL}/${skillId}/skillsList/${itemId}`,
        itemData,
        {}
      )
      .pipe(map((response) => Object.values(response)[1]?.skillItem));
  }

  deleteSkillItem(skillId: string, itemId: string): Observable<ISkillItem> {
    return this.mongodb
      .deleteRequest<ISkillItem>(
        `${this.skillsURL}/${skillId}/skillsList/${itemId}`
      )
      .pipe(map((response) => Object.values(response)[1]?.skillItem));
  }
}
