import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutService, IAbout } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'], // corrected styleUrls property
})
export class AboutComponent implements OnInit {
  aboutData: IAbout = {
    _id: '',
    imageSrc: '',
    name: '',
    title: '',
    description: '',
    experienceYears: 0,
    successProjects: 0,
    cvURL: '',
  };

  popupActive = false;
  popupFooterActive = false;
  popupBtnActive = false;
  popupImgActive = true;

  myForm: FormGroup;
  modalTitle = '';
  modalButton = '';
  imageURL = 'http://localhost:5000/';

  constructor(private fb: FormBuilder, private aboutService: AboutService) {
    this.myForm = this.fb.group({
      aboutImage: [null, Validators.required],
      aboutName: ['', Validators.required],
      aboutTitle: ['', Validators.required],
      aboutExperience: ['', [Validators.required, Validators.min(0)]], // Ensuring valid experience years
      aboutProjects: ['', [Validators.required, Validators.min(0)]], // Ensuring valid projects number
      aboutDescription: ['', Validators.required],
      aboutCV: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.aboutService.getAboutData().subscribe((aboutData) => {
      this.aboutData = aboutData;
      this.myForm.patchValue({
        aboutCV: this.aboutData.cvURL || '',
        aboutName: this.aboutData.name || '',
        aboutTitle: this.aboutData.title || '',
        aboutDescription: this.aboutData.description || '',
        aboutExperience: this.aboutData.experienceYears || 0,
        aboutProjects: this.aboutData.successProjects || 0,
      });
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.myForm.patchValue({
        aboutImage: file,
      });
    }
  }

  editData(): void {
    this.setModalValues(true, true, 'Edit', 'Edit About');
    this.myForm.enable();
  }

  private setModalValues(
    buttonVal: boolean,
    imageVal: boolean,
    button: string,
    title: string
  ): void {
    this.popupActive = true;
    this.popupFooterActive = true;
    this.popupBtnActive = buttonVal;
    this.popupImgActive = imageVal;

    this.modalButton = button;
    this.modalTitle = title;

    this.myForm.patchValue({
      aboutName: this.aboutData.name || '',
      aboutTitle: this.aboutData.title || '',
      aboutDescription: this.aboutData.description || '',
      aboutExperience: this.aboutData.experienceYears || 0,
      aboutProjects: this.aboutData.successProjects || 0,
      aboutCV: this.aboutData.cvURL || '',
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const formData = new FormData();
      formData.append('_id', this.aboutData._id);
      formData.append('name', this.myForm.get('aboutName')?.value);
      formData.append('imageSrc', this.myForm.get('aboutImage')?.value);
      formData.append('title', this.myForm.get('aboutTitle')?.value);
      formData.append(
        'description',
        this.myForm.get('aboutDescription')?.value
      );
      formData.append(
        'experienceYears',
        this.myForm.get('aboutExperience')?.value.toString()
      );
      formData.append(
        'successProjects',
        this.myForm.get('aboutProjects')?.value.toString()
      );
      formData.append('cvURL', this.myForm.get('aboutCV')?.value);

      this.saveData(formData, this.aboutData._id);
    }
  }

  closeModal(): void {
    this.popupActive = false;
  }

  private saveData(formData: FormData, id: string): void {
    this.aboutService.updateAboutData(formData, id).subscribe((data) => {
      this.aboutData = data;
      this.closeModal();
    });
  }
}
