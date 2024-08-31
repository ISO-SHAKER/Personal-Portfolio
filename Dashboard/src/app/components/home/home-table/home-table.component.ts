import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrl: './home-table.component.css',
})
export class HomeTableComponent {
  @Input() homeData: any = {};
  @Input() imageURL: string = '';

  @Output() editData = new EventEmitter();
}
