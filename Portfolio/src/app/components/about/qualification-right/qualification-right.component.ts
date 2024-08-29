import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-qualification-right',
  templateUrl: './qualification-right.component.html',
  styleUrl: './qualification-right.component.css',
})
export class QualificationRightComponent implements OnInit {
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
