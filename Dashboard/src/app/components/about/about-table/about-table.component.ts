import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAbout } from '../../../services/about.service';

@Component({
  selector: 'app-about-table',
  templateUrl: './about-table.component.html',
  styleUrl: './about-table.component.css',
})
export class AboutTableComponent {
  @Input() aboutData: IAbout = {
    _id: '',
    imageSrc: '',
    name: '',
    title: '',
    description: '',
    experienceYears: 0,
    successProjects: 0,
    cvURL: '',
  };

  @Input() imageURL: string = '';

  @Output() editData = new EventEmitter();
}
