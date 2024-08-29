import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuVisible = false;
  isDarkTheme = false;
  activeLink = '#home';

  navItems = [
    { href: '#home', label: 'Home', icon: 'uil uil-estate' },
    { href: '#about', label: 'About', icon: 'uil uil-user' },
    { href: '#skills', label: 'Skills', icon: 'uil uil-file-alt' },
    { href: '#services', label: 'Services', icon: 'uil uil-briefcase-alt' },
    { href: '#portfolio', label: 'Portfolio', icon: 'uil uil-scenery' },
    { href: '#contact', label: 'Contact', icon: 'uil uil-message' },
  ];

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.darkTheme$.subscribe(
      (isDark) => (this.isDarkTheme = isDark)
    );
    this.themeService.initializeTheme();
  }

  toggleMenu(show: boolean) {
    this.isMenuVisible = show;
  }

  toggleTheme() {
    this.themeService.setDarkTheme(!this.isDarkTheme);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) {
      header?.classList.add('scroll-header');
    } else {
      header?.classList.remove('scroll-header');
    }
  }
}
