import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  @Input() myForm!: FormGroup;
  @Input() popupActive: boolean = false;
  @Input() popupFooterActive: boolean = false;
  @Input() popupBtnActive: boolean = false;
  @Input() popupImgActive: boolean = true;
  @Input() modalTitle: string = 'New Service';
  @Input() modalButton: string = 'Add';

  @Output() closeModal = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
}
