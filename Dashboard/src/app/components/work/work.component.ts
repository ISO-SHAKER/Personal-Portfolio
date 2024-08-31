import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IWork, WorkService } from '../../services/work.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrl: './work.component.css',
})
export class WorkComponent implements OnInit {
  works: IWork[] = [];
  filteredData: IWork[] = [...this.works];
  paginatedData: IWork[] = [];
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
  modalTitle: string = 'New Work';
  modalButton: string = 'Add';

  constructor(
    private fb: FormBuilder,
    private workService: WorkService,
    private sharedService: SharedService
  ) {
    this.myForm = this.fb.group({
      workMainTitle: ['', Validators.required],
      workSubTitle: ['', Validators.required],
      workDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Api Call
    this.workService.getAllWorks().subscribe((works) => {
      this.works = works;
      this.filteredData = [...this.works];
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
      ? this.works.filter((item) =>
          item.mainTitle.toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
      : [...this.works];
    this.currentIndex = 1;
    this.updatePagination();
  }

  readWork(work: IWork) {
    this.setModalValues(false, false, false, 0, '', 'Details', work);
    this.myForm.disable();
  }

  editWork(index: number, work: IWork): void {
    this.setModalValues(true, true, true, index, 'Edit', 'Edit Work', work);
    this.myForm.enable();
  }

  deleteWork(index: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.workService.deleteWork(this.works[index]._id).subscribe(() => {
        this.works.splice(index, 1);
        this.filteredData = [...this.works];
        this.updatePagination();
      });
    }
  }

  addWork(): void {
    this.setModalValues(true, true, false, 0, 'Add', 'Add Work', {});
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

    this.myForm.setValue({
      workMainTitle: data.mainTitle || '',
      workSubTitle: data.subTitle || '',
      workDate: data.calendar || '',
    });
  }

  onSubmit(): void {
    const formData: IWork = {
      _id: this.isEdit ? this.works[this.editIndex]._id : '',
      mainTitle: this.myForm.value.workMainTitle,
      subTitle: this.myForm.value.workSubTitle,
      calendar: this.myForm.value.workDate,
    };

    console.log('SEND');

    this.saveData(formData);
  }

  closeModal(): void {
    this.popupActive = false;
  }

  private saveData(formData: IWork) {
    if (this.isEdit) {
      this.workService.updateWork(formData).subscribe(() => {
        console.log(formData);
        this.closeModal();
        this.updatePagination();
      });
    } else {
      this.workService.addWork(formData).subscribe(() => {
        this.closeModal();
        this.updatePagination();
      });
    }
  }
}
