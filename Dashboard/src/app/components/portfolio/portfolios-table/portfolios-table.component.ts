import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProject } from '../../../services/portfolio.service';

@Component({
  selector: 'app-portfolios-table',
  templateUrl: './portfolios-table.component.html',
  styleUrl: './portfolios-table.component.css',
})
export class PortfoliosTableComponent {
  @Input() projects: IProject[] = [];
  @Input() startIndex: number = 0;
  @Input() endIndex: number = 0;
  @Input() totalEntries: number = 0;
  @Input() currentIndex: number = 1;
  @Input() maxIndex: number = 1;
  @Input() imageURL: string = '';

  @Output() addProject = new EventEmitter<void>();
  @Output() readProject = new EventEmitter<any>();
  @Output() editProject = new EventEmitter<{ index: number; project: any }>();
  @Output() deleteProject = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
