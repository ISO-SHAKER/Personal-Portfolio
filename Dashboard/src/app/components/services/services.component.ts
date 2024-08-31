import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { IService, ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  services: IService[] = [];
  filteredData: IService[] = [...this.services];
  paginatedData: IService[] = [];
  isEdit: boolean = false;
  editIndex: number | null = null;
  tableSize: number = 10;
  currentIndex: number = 1;
  maxIndex: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;
  arrayLength: number = this.services.length;

  popupActive: boolean = false;
  popupFooterActive: boolean = false;
  popupBtnActive: boolean = false;
  popupImgActive: boolean = true;

  myForm: FormGroup;
  modalTitle: string = 'New Service';
  modalButton: string = 'Add';

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private sharedService: SharedService
  ) {
    this.myForm = this.fb.group({
      serviceTitle: ['', Validators.required],
      serviceModalTitle: ['', Validators.required],
      serviceDescription: ['', Validators.required],
      provisions: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    // Api Call
    this.serviceService.getAllServices().subscribe((services) => {
      this.services = services;
      this.filteredData = [...this.services];
      this.updatePagination();
    });

    // Subscribe to search term changes
    this.sharedService.currentSearchTerm.subscribe((term) => {
      this.onSearch(term);
    });
  }

  get provisions(): FormArray {
    return this.myForm.get('provisions') as FormArray;
  }

  createProvision(value: string = ''): FormControl {
    return this.fb.control(value);
  }

  addProvision(value: string = ''): void {
    this.provisions.push(this.createProvision(value));
  }

  /* ========== Pagination ========== */
  updatePagination(): void {
    this.arrayLength = this.filteredData.length;
    this.maxIndex = Math.ceil(this.arrayLength / this.tableSize);
    this.paginateData();
  }

  paginateData(): void {
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

  next(): void {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.paginateData();
    }
  }

  prev(): void {
    if (this.currentIndex > 1) {
      this.currentIndex--;
      this.paginateData();
    }
  }

  paginationBtn(index: number): void {
    this.currentIndex = index;
    this.paginateData();
  }

  onTableSizeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tableSize = parseInt(value, 10);
    this.currentIndex = 1;
    this.updatePagination();
  }

  onSearch(searchTerm: string) {
    this.filteredData = searchTerm
      ? this.services.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
      : [...this.services];
    this.currentIndex = 1;
    this.updatePagination();
  }

  /* ========== Manage Data ========== */

  readService(service: IService): void {
    const addProvisionBtn = document.getElementById(
      'addProvision'
    ) as HTMLButtonElement;
    this.setModalValues(false, false, false, 0, 'Details', service);
    this.myForm.disable();
    addProvisionBtn.disabled = true;
  }

  editService(index: number, service: IService): void {
    this.setModalValues(true, true, true, index, 'Edit Service', service);
    this.myForm.enable();
  }

  deleteService(index: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService
        .deleteService(this.services[index]._id)
        .subscribe(() => {
          this.services.splice(index, 1);
          this.filteredData = [...this.services];
          this.updatePagination();
        });
    }
  }

  addService(): void {
    this.setModalValues(true, true, false, 0, 'Add Service', {});
    this.myForm.reset();
    this.provisions.clear();
    this.addProvision();
    this.myForm.enable();
  }

  private setModalValues(
    buttonVal: boolean,
    imageVal: boolean,
    editVal: boolean,
    index: number,
    title: string,
    data: any
  ): void {
    this.popupActive = true;
    this.popupFooterActive = true;
    this.popupBtnActive = buttonVal;
    this.popupImgActive = imageVal;
    this.isEdit = editVal;
    this.editIndex = index;
    this.modalButton = buttonVal ? 'Save' : 'Add';
    this.modalTitle = title;

    this.myForm.patchValue({
      serviceTitle: data.title || '',
      serviceModalTitle: data.modalTitle || '',
      serviceDescription: data.modalDescription || '',
    });

    this.provisions.clear(); // Clear any existing provisions
    if (data.provisions) {
      data.provisions.forEach((provision: string | null) => {
        if (provision !== null && provision !== undefined) {
          this.provisions.push(this.createProvision(provision));
        }
      });
    }
  }

  onSubmit(): void {
    const formData: IService = {
      _id: this.isEdit ? this.services[this.editIndex!]._id : '',
      title: this.myForm.value.serviceTitle,
      modalTitle: this.myForm.value.serviceModalTitle,
      modalDescription: this.myForm.value.serviceDescription,
      provisions: this.myForm.value.provisions,
    };

    this.saveData(formData);

    this.closeModal();
    this.updatePagination();
  }

  closeModal(): void {
    this.popupActive = false;
  }

  private saveData(formData: IService) {
    if (this.isEdit) {
      this.serviceService.updateService(formData).subscribe(() => {
        this.closeModal();
        this.updatePagination();
      });
    } else {
      this.serviceService.addService(formData).subscribe(() => {
        this.closeModal();
        this.updatePagination();
      });
    }
  }
}
