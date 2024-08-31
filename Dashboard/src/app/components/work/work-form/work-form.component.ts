import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrl: './work-form.component.css',
})
export class WorkFormComponent {
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
