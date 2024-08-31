import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrl: './portfolio-form.component.css',
})
export class PortfolioFormComponent {
  @Input() myForm!: FormGroup;
  @Input() features!: any;
  @Input() popupActive: boolean = false;
  @Input() popupFooterActive: boolean = false;
  @Input() popupBtnActive: boolean = false;
  @Input() popupImgActive: boolean = true;
  @Input() modalTitle: string = 'New Service';
  @Input() modalButton: string = 'Add';
  @Input() imageURL: string = '';
  @Input() selectedImage: string | ArrayBuffer | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
  @Output() addFeature = new EventEmitter<void>();
  @Output() onFileChange = new EventEmitter<Event>();

  handleFileChange(event: Event): void {
    this.onFileChange.emit(event);
  }
}
