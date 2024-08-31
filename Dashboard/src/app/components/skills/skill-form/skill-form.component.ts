import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrl: './skill-form.component.css',
})
export class SkillFormComponent {
  @Input() skillForm!: FormGroup;
  @Input() popupActive: boolean = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() onSubmitSkill = new EventEmitter<void>();
}
