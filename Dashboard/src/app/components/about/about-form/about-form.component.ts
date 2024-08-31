import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrl: './about-form.component.css',
})
export class AboutFormComponent {
  @Input() myForm!: FormGroup;
  @Input() popupActive: boolean = false;
  @Input() popupFooterActive: boolean = false;
  @Input() popupBtnActive: boolean = false;
  @Input() popupImgActive: boolean = true;
  @Input() modalTitle: string = 'Edit About';
  @Input() modalButton: string = 'Add';
  @Input() imageURL: string = '';
  @Input() selectedImage: string = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onFileChange = new EventEmitter<Event>();

  handleFileChange(event: Event): void {
    this.onFileChange.emit(event);
  }
}
