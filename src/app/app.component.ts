import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  Renderer2,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BentoGridComponent } from './components/bento-grid/bento-grid.component';
import { ContactComponent } from './components/contact/contact.component';
import { FloatingCtaComponent } from './components/floating-cta/floating-cta.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SelectedWorkComponent } from './components/selected-work/selected-work.component';
import { ServicesComponent } from './components/services/services.component';

interface Shape {
  left: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
  color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    HeroComponent,
    BentoGridComponent,
    ServicesComponent,
    SelectedWorkComponent,
    ContactComponent,
    FooterComponent,
    FloatingCtaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  shapes = signal<Shape[]>([]);
  isDarkMode = signal(true);

  private readonly shapeColors = [
    'rgba(88, 166, 255, 0.7)',
    'rgba(201, 115, 255, 0.7)',
    'rgba(31, 111, 235, 0.7)',
  ];

  constructor() {
    this.generateInitialShapes();

    effect(() => {
      if (!this.isBrowser) return;

      const body = document.body;

      if (this.isDarkMode()) {
        this.renderer.addClass(body, 'dark');
        this.renderer.removeClass(body, 'light');
      } else {
        this.renderer.addClass(body, 'light');
        this.renderer.removeClass(body, 'dark');
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update((value) => !value);
  }

  private generateInitialShapes(): void {
    const shapesArray: Shape[] = [];
    const numberOfShapes = 20;

    for (let i = 0; i < numberOfShapes; i++) {
      shapesArray.push({
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 40 + 10}px`,
        animationDuration: `${Math.random() * 15 + 10}s`,
        animationDelay: `${Math.random() * 20}s`,
        color:
          this.shapeColors[Math.floor(Math.random() * this.shapeColors.length)],
      });
    }

    this.shapes.set(shapesArray);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    if (typeof IntersectionObserver !== 'undefined') {
      const revealElements =
        this.elementRef.nativeElement.querySelectorAll('.reveal-on-scroll');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');

              const children = entry.target.querySelectorAll('.reveal-3d');

              children.forEach((child: Element, index: number) => {
                (child as HTMLElement).style.transitionDelay =
                  `${index * 100}ms`;
              });

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );

      revealElements.forEach((el: Element) => observer.observe(el));
    }
  }
}
