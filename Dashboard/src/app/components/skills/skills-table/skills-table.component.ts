import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISkill, ISkillItem } from '../../../services/skills.service';

@Component({
  selector: 'app-skills-table',
  templateUrl: './skills-table.component.html',
  styleUrl: './skills-table.component.css',
})
export class SkillsTableComponent {
  @Input() skills: any[] = [];
  @Input() imageURL: string = '';

  @Output() addProject = new EventEmitter<void>();
  @Output() editSkill = new EventEmitter<{ index: number; skill: ISkill }>();
  @Output() deleteSkill = new EventEmitter<number>();

  @Output() addSkillItem = new EventEmitter<{
    skillIndex: number;
  }>();
  @Output() editSkillItem = new EventEmitter<{
    skillIndex: number;
    itemIndex: number;
    item: ISkillItem;
  }>();
  @Output() deleteSkillItem = new EventEmitter<{
    skillIndex: number;
    itemIndex: number;
  }>();
}
