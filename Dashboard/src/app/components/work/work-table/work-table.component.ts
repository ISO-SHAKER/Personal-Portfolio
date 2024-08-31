import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IWork } from '../../../services/work.service';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrl: './work-table.component.css',
})
export class WorkTableComponent {
  @Input() works: IWork[] = [];
  @Input() startIndex: number = 0;
  @Input() endIndex: number = 0;
  @Input() totalEntries: number = 0;
  @Input() currentIndex: number = 1;
  @Input() maxIndex: number = 1;

  @Output() addWork = new EventEmitter<void>();
  @Output() readWork = new EventEmitter<IWork>();
  @Output() editWork = new EventEmitter<{
    index: number;
    work: IWork;
  }>();
  @Output() deleteWork = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
