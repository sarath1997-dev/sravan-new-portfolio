import {
  Component,
  signal,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

type ContactIcon = 'message' | 'linkedin' | 'discord' | 'instagram';

@Component({
  selector: 'app-floating-cta',
  templateUrl: './floating-cta.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FloatingCtaComponent implements OnInit, OnDestroy {
  isMenuOpen = signal(false);
  currentIcon = signal<ContactIcon>('message');

  private intervalId?: number;
  private readonly icons: ContactIcon[] = [
    'message',
    'linkedin',
    'discord',
    'instagram',
  ];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  socials = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/edit_by_sravan?igsh=MXFla2pnZWhoZnEwcw==',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/s-sravan-kumar-freelancer',
    },
    { name: 'Discord', url: 'https://discord.com/users/1431314812289155177' },
  ];

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startIconRotation();
    }
  }

  ngOnDestroy(): void {
    this.stopIconRotation();
  }

  private startIconRotation(): void {
    if (!this.isBrowser) return;

    this.stopIconRotation(); // prevent duplicate intervals

    this.intervalId = window.setInterval(() => {
      let nextIcon: ContactIcon;

      do {
        nextIcon = this.icons[Math.floor(Math.random() * this.icons.length)];
      } while (nextIcon === this.currentIcon());

      this.currentIcon.set(nextIcon);
    }, 2500);
  }

  private stopIconRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => {
      if (!value) {
        this.stopIconRotation();
      } else if (this.isBrowser) {
        this.startIconRotation();
      }
      return !value;
    });
  }

  scrollToContact(): void {
    if (!this.isBrowser) return;

    const contactSection = document.getElementById('contact');

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    this.isMenuOpen.set(false);
    this.startIconRotation();
  }
}
