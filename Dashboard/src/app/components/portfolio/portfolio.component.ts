import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IProject, PortfolioService } from '../../services/portfolio.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit {
  projects: IProject[] = [];
  filteredData: IProject[] = [...this.projects];
  paginatedData: IProject[] = [];
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
  selectedImage: string = '';
  modalTitle: string = 'New Service';
  modalButton: string = 'Add';

  imageURL = 'http://localhost:5000/';

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    private sharedService: SharedService
  ) {
    this.myForm = this.fb.group({
      projectImage: [null, Validators.required],
      projectTitle: ['', Validators.required],
      projectModelTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectLink: ['', Validators.required],
      features: this.fb.array([], Validators.required),
    });
  }

  ngOnInit() {
    // Api Call
    this.portfolioService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
      this.filteredData = [...this.projects];
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

  /* ========== Manage Data ========== */

  get features(): FormArray {
    return this.myForm.get('features') as FormArray;
  }

  createFeature(value: string = ''): FormControl {
    return this.fb.control(value);
  }

  addFeature(value: string = ''): void {
    this.features.push(this.createFeature(value));
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.myForm.patchValue({
        projectImage: file,
      });
    }
  }

  onSearch(searchTerm: string) {
    this.filteredData = searchTerm
      ? this.projects.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
      : [...this.projects];
    this.currentIndex = 1;
    this.updatePagination();
  }

  readProject(project: IProject) {
    const addFeatureBtn = document.getElementById(
      'addFeature'
    ) as HTMLButtonElement;
    this.setModalValues(false, false, false, 0, '', 'Details', project);
    this.myForm.disable();
    addFeatureBtn.disabled = true;
  }

  editProject(index: number, project: IProject): void {
    this.setModalValues(
      true,
      true,
      true,
      index,
      'Edit',
      'Edit Project',
      project
    );

    this.myForm.enable();
    const addFeatureBtn = document.getElementById(
      'addFeature'
    ) as HTMLButtonElement;
    addFeatureBtn.disabled = false;
  }

  deleteProject(index: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.portfolioService
        .deleteProject(this.projects[index]._id)
        .subscribe(() => {
          this.projects.splice(index, 1);
          this.filteredData = [...this.projects];
          this.updatePagination();
        });
    }
  }

  addProject(): void {
    this.setModalValues(true, true, false, 0, 'Add', 'Add Project', {});
    this.myForm.reset();
    this.features.clear();
    this.addFeature();
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
    this.selectedImage = data.imgSrc;

    this.myForm.patchValue({
      projectTitle: data.title || '',
      projectModelTitle: data.modalTitle || '',
      projectDescription: data.description || '',
      projectLink: data.githubURL || '',
    });

    this.features.clear();
    if (data.features) {
      data.features.forEach((feature: string | null) => {
        if (feature !== null && feature !== undefined) {
          this.features.push(this.createFeature(feature));
        }
      });
    }
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const editId: string = this.isEdit
        ? this.projects[this.editIndex]._id
        : '';

      const formData = new FormData();
      formData.append('_id', editId);
      formData.append('title', this.myForm.get('projectTitle')?.value);
      formData.append(
        'modalTitle',
        this.myForm.get('projectModelTitle')?.value
      );
      formData.append(
        'description',
        this.myForm.get('projectDescription')?.value
      );
      formData.append('githubURL', this.myForm.get('projectLink')?.value);
      formData.append('features', this.myForm.get('features')?.value);

      if (this.myForm.get('projectImage')?.value) {
        formData.append('imgSrc', this.myForm.get('projectImage')?.value);
      }

      this.saveData(formData, editId);
    }
  }

  closeModal(): void {
    this.popupActive = false;
  }

  private saveData(formData: any, id: string) {
    if (this.isEdit) {
      this.portfolioService.updateProject(formData, id).subscribe(() => {
        this.closeModal();
        this.updatePagination();
      });
    } else {
      this.portfolioService.addProject(formData).subscribe(() => {
        this.closeModal();
        this.updatePagination();
      });
    }
  }
}
