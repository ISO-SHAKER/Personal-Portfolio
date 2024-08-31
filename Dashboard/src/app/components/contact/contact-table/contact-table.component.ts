import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrl: './contact-table.component.css',
})
export class ContactTableComponent {
  @Input() contactData: any = {};

  @Output() editData = new EventEmitter();
}
