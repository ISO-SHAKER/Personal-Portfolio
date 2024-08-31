import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IService } from '../../../services/service.service';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrl: './services-table.component.css',
})
export class ServicesTableComponent {
  @Input() services: IService[] = [];
  @Input() startIndex: number = 0;
  @Input() endIndex: number = 0;
  @Input() totalEntries: number = 0;
  @Input() currentIndex: number = 1;
  @Input() maxIndex: number = 1;

  @Output() addService = new EventEmitter<void>();
  @Output() readService = new EventEmitter<any>();
  @Output() editService = new EventEmitter<{
    index: number;
    service: IService;
  }>();
  @Output() deleteService = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
