import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css'], // Fix typo: `styleUrl` to `styleUrls`
})
export class HomeFormComponent {
  @Input() myForm!: FormGroup;
  @Input() popupActive = false;
  @Input() popupFooterActive = false;
  @Input() popupBtnActive = false;
  @Input() popupImgActive = true;
  @Input() modalTitle = 'New Service';
  @Input() modalButton = 'Add';
  @Input() selectedImage = '';
  @Input() imageURL = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onFileChange = new EventEmitter<Event>();

  handleFileChange(event: Event): void {
    this.onFileChange.emit(event);
  }
}
