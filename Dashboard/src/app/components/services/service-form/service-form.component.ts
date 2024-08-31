import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css',
})
export class ServiceFormComponent {
  @Input() myForm!: FormGroup;
  @Input() provisions!: FormArray;
  @Input() popupActive: boolean = false;
  @Input() popupFooterActive: boolean = false;
  @Input() popupBtnActive: boolean = false;
  @Input() popupImgActive: boolean = true;
  @Input() modalTitle: string = 'New Service';
  @Input() modalButton: string = 'Add';

  @Output() closeModal = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
  @Output() addProvision = new EventEmitter<void>();
}
