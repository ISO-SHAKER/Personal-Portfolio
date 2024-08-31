import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService, IContact } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  contactData: IContact = {
    _id: '',
    phone: '',
    email: '',
    location: '',
  };

  popupActive: boolean = false;
  popupFooterActive: boolean = false;
  popupBtnActive: boolean = false;
  popupImgActive: boolean = true;

  myForm: FormGroup;
  modalTitle: string = '';
  modalButton: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.myForm = this.fb.group({
      contactPhone: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactLocation: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Api Call
    this.contactService.getContactData().subscribe((contactData) => {
      this.contactData = contactData;
    });
  }

  editData(): void {
    this.setModalValues(true, true, 'Edit', 'Edit Contact');
    this.myForm.enable();
  }

  private setModalValues(
    buttonVal: boolean,
    imageVal: boolean,
    button: string,
    title: string
  ) {
    this.popupActive = true;
    this.popupFooterActive = true;
    this.popupBtnActive = buttonVal;
    this.popupImgActive = imageVal;

    this.modalButton = button;
    this.modalTitle = title;

    this.myForm.patchValue({
      contactPhone: this.contactData.phone || '',
      contactEmail: this.contactData.email || '',
      contactLocation: this.contactData.location || '',
    });
  }

  onSubmit(): void {
    const formData: IContact = {
      _id: this.contactData._id,
      phone: this.myForm.get('contactPhone')?.value,
      email: this.myForm.get('contactEmail')?.value,
      location: this.myForm.get('contactLocation')?.value,
    };

    this.saveData(formData);
    this.closeModal();
  }

  closeModal(): void {
    this.popupActive = false;
  }

  private saveData(formData: IContact) {
    this.contactService.updateContactData(formData).subscribe((data) => {
      this.contactData = data;
      this.closeModal();
    });
  }
}
