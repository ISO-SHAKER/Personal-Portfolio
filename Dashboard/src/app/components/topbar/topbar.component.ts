// topbar.component.ts
import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  searchTerm: string = '';

  constructor(private sharedService: SharedService) {}

  onSearch() {
    if (this.searchTerm) {
      this.sharedService.changeSearchTerm(this.searchTerm);
    }
  }

  showNav(): void {
    const navigation = document.querySelector('.navigation') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;

    navigation?.classList.toggle('active');
    main?.classList.toggle('active');
  }
}
