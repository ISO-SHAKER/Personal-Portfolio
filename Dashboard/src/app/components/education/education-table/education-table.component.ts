import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEducation } from '../../../services/education.service';

@Component({
  selector: 'app-education-table',
  templateUrl: './education-table.component.html',
  styleUrl: './education-table.component.css',
})
export class EducationTableComponent {
  @Input() educations: IEducation[] = [];
  @Input() startIndex: number = 0;
  @Input() endIndex: number = 0;
  @Input() totalEntries: number = 0;
  @Input() currentIndex: number = 1;
  @Input() maxIndex: number = 1;

  @Output() addEducation = new EventEmitter<void>();
  @Output() readEducation = new EventEmitter<any>();
  @Output() editEducation = new EventEmitter<{
    index: number;
    education: any;
  }>();
  @Output() deleteEducation = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
