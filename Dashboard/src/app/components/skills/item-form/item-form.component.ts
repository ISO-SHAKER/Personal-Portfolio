import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent {
  @Input() itemForm!: FormGroup;
  @Input() popupActive: boolean = false;
  @Input() imageURL: string = '';
  @Input() selectedImage: string = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() onSubmitItem = new EventEmitter<void>();
  @Output() onFileChange = new EventEmitter<Event>();

  handleFileChange(event: Event): void {
    this.onFileChange.emit(event);
  }
}
