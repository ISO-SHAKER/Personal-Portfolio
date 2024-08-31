import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService, IHome } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Fix typo: `styleUrl` to `styleUrls`
})
export class HomeComponent implements OnInit {
  homeData: IHome = {
    _id: '',
    imageSrc: '',
    name: '',
    title: '',
    description: '',
    facebook: '',
    linkedin: '',
    github: '',
  };

  popupActive = false;
  popupFooterActive = false;
  popupBtnActive = false;
  popupImgActive = true;

  myForm!: FormGroup;
  modalTitle = 'Edit Home';
  modalButton = 'Add';

  imageURL: string = 'http://localhost:5000/';

  constructor(private fb: FormBuilder, private homeService: HomeService) {
    this.myForm = this.fb.group({
      homeImage: [null, Validators.required],
      homeName: ['', Validators.required],
      homeTitle: ['', Validators.required],
      homeDescription: ['', Validators.required],
      facebookAccount: ['', Validators.required],
      linkedinAccount: ['', Validators.required],
      githubAccount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.homeService.getHomeData().subscribe((homeData) => {
      this.homeData = homeData;
      console.log(homeData);
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.myForm.patchValue({
        homeImage: file,
      });
    }
  }

  editData(): void {
    this.setModalValues(true, true, 'Edit', 'Edit Home');
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
      homeName: this.homeData.name || '',
      homeTitle: this.homeData.title || '',
      homeDescription: this.homeData.description || '',
      facebookAccount: this.homeData.facebook || '',
      linkedinAccount: this.homeData.linkedin || '',
      githubAccount: this.homeData.github || '',
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('_id', this.homeData._id);
    formData.append('imageSrc', this.myForm.get('homeImage')?.value);
    formData.append('name', this.myForm.get('homeName')?.value);
    formData.append('title', this.myForm.get('homeTitle')?.value);
    formData.append('description', this.myForm.get('homeDescription')?.value);
    formData.append('facebook', this.myForm.get('facebookAccount')?.value);
    formData.append('linkedin', this.myForm.get('linkedinAccount')?.value);
    formData.append('github', this.myForm.get('githubAccount')?.value);

    this.saveData(formData, this.homeData._id);
  }

  closeModal(): void {
    this.popupActive = false;
  }

  private saveData(formData: FormData, id: string): void {
    this.homeService.updateHomeData(formData, id).subscribe((data) => {
      this.homeData = data;
      this.closeModal();
    });
  }
}
