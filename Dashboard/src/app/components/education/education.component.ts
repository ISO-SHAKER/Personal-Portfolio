import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationService, IEducation } from '../../services/education.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent implements OnInit {
  educations: IEducation[] = [];
  filteredData: IEducation[] = [...this.educations];
  paginatedData: IEducation[] = [];
  isEdit: boolean = false;
  editIndex: number = 0;
  tableSize: number = 10;
  currentIndex: number = 1;
  maxIndex: number = 0;

  startIndex: number = 1;
  endIndex: number = 0;
  arrayLength: number = 0;

  popupActive: boolean = false;
  popupFooterActive: boolean = false;
  popupBtnActive: boolean = false;
  popupImgActive: boolean = true;

  myForm: FormGroup;
  modalTitle: string = 'New Education';
  modalButton: string = 'Add';

  constructor(
    private fb: FormBuilder,
    private educationService: EducationService,
    private sharedService: SharedService
  ) {
    this.myForm = this.fb.group({
      eduMainTitle: ['', Validators.required],
      eduSubTitle: ['', Validators.required],
      eduDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Api Call
    this.educationService.getAllEducations().subscribe((educations) => {
      this.educations = educations;
      this.filteredData = [...this.educations];
      this.updatePagination();
    });

    // Subscribe to search term changes
    this.sharedService.currentSearchTerm.subscribe((term) => {
      this.onSearch(term);
    });
  }

  /* ========== Pagination ========== */
  updatePagination() {
    this.arrayLength = this.filteredData.length;
    this.maxIndex = Math.ceil(this.arrayLength / this.tableSize);
    this.highlightIndexBtn();
  }

  highlightIndexBtn() {
    this.startIndex = (this.currentIndex - 1) * this.tableSize;
    this.endIndex = Math.min(
      this.startIndex + this.tableSize,
      this.filteredData.length
    );
    this.paginatedData = this.filteredData.slice(
      this.startIndex,
      this.endIndex
    );
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.highlightIndexBtn();
    }
  }

  prev() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
      this.highlightIndexBtn();
    }
  }

  paginationBtn(index: number) {
    this.currentIndex = index;
    this.highlightIndexBtn();
  }

  onTableSizeChange(event: Event) {
    this.tableSize = parseInt((event.target as HTMLInputElement).value);
    this.currentIndex = 1;
    this.updatePagination();
  }

  onSearch(searchTerm: string) {
    this.filteredData = searchTerm
      ? this.educations.filter((item) =>
          item.mainTitle.toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
      : [...this.educations];
    this.currentIndex = 1;
    this.updatePagination();
  }

  readEducation(education: IEducation) {
    this.setModalValues(false, false, false, 0, '', 'Details', education);
    this.myForm.disable();
  }

  editEducation(index: number, education: IEducation): void {
    this.setModalValues(
      true,
      true,
      true,
      index,
      'Edit',
      'Edit Education',
      education
    );
    this.myForm.enable();
  }

  deleteEducation(index: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.educationService
        .deleteEducation(this.educations[index]._id)
        .subscribe(() => {
          this.educations.splice(index, 1);
          this.filteredData = [...this.educations];
          this.updatePagination();
        });
    }
  }

  addEducation(): void {
    this.setModalValues(true, true, false, 0, 'Add', 'Add Education', {});
    this.myForm.reset();
    this.myForm.enable();
  }

  private setModalValues(
    buttonVal: boolean,
    imageVal: boolean,
    editVal: boolean,
    index: number,
    button: string,
    title: string,
    data: any
  ) {
    this.popupActive = true;
    this.popupFooterActive = true;
    this.popupBtnActive = buttonVal;
    this.popupImgActive = imageVal;

    this.isEdit = editVal;
    this.editIndex = index;
    this.modalButton = button;
    this.modalTitle = title;

    this.myForm.patchValue({
      eduMainTitle: data.mainTitle || '',
      eduSubTitle: data.subTitle || '',
      eduDate: data.calendar || '',
    });
  }

  onSubmit(): void {
    const formData: IEducation = {
      _id: this.isEdit ? this.educations[this.editIndex!]._id : '',
      mainTitle: this.myForm.value.eduMainTitle,
      subTitle: this.myForm.value.eduSubTitle,
      calendar: this.myForm.value.eduDate,
    };

    this.saveData(formData);
  }

  closeModal(): void {
    this.popupActive = false;
  }

  private saveData(formData: IEducation) {
    if (this.isEdit) {
      this.educationService.updateEducation(formData).subscribe(() => {
        this.closeModal();
        this.updatePagination();
      });
    } else {
      this.educationService.addEducation(formData).subscribe(() => {
        this.closeModal();
        this.updatePagination();
      });
    }
  }
}
