import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isDarkTheme = false;

  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.themeService.darkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
      this.cdr.detectChanges();
    });
  }
}
