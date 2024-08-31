import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-skills-header',
  templateUrl: './skills-header.component.html',
  styleUrl: './skills-header.component.css',
})
export class SkillsHeaderComponent {
  @Output() addSkill = new EventEmitter<void>();
}
