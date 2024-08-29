import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  darkTheme$ = this.darkTheme.asObservable();

  setDarkTheme(isDark: boolean) {
    this.darkTheme.next(isDark);
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('selected-theme', isDark ? 'dark' : 'light');
  }

  initializeTheme() {
    const selectedTheme = localStorage.getItem('selected-theme');
    const isDark = selectedTheme === 'dark';
    this.setDarkTheme(isDark);
  }
}
