import {
  Component,
  input,
  output,
  signal,
  effect,
  Renderer2,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {
  isDarkMode = input.required<boolean>();
  themeToggle = output<void>();
  isMenuOpen = signal(false);

  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    effect(() => {
      if (!this.isBrowser) return;

      if (this.isMenuOpen()) {
        this.renderer.addClass(document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
      }
    });
  }

  navLinks = [
    { path: 'work', label: 'Work' },
    { path: 'toolkit', label: 'Toolkit' },
    { path: 'services', label: 'Services' },
  ];

  onToggle(): void {
    this.themeToggle.emit();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    if (this.isMenuOpen()) {
      this.toggleMenu();
    }
  }
}
