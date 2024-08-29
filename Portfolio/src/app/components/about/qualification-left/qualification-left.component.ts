import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-qualification-left',
  templateUrl: './qualification-left.component.html',
  styleUrl: './qualification-left.component.css',
})
export class QualificationLeftComponent implements OnInit {
  @Input() mainTitle: string = '';
  @Input() subTitle: string = '';
  @Input() calendar: string = '';

  isDarkTheme = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.darkTheme$.subscribe(
      (isDark) => (this.isDarkTheme = isDark)
    );
  }
}
