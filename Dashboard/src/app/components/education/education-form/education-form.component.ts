import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.css',
})
export class EducationFormComponent {
  @Input() myForm!: FormGroup;
  @Input() popupActive: boolean = false;
  @Input() popupFooterActive: boolean = false;
  @Input() popupBtnActive: boolean = false;
  @Input() popupImgActive: boolean = true;
  @Input() modalTitle: string = 'New Service';
  @Input() modalButton: string = 'Add';
  @Input() selectedImage: string | ArrayBuffer | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
}
