import {
  Component,
  ChangeDetectionStrategy,
  signal,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  standalone: true,
  imports: [CommonModule],
  host: {
    '(mousemove)': 'onMouseMove($event)',
  },
})
export class HeroComponent {
  transformStyle = signal('');
  isDarkMode = input.required<boolean>();

  onMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    const { offsetWidth, offsetHeight } = event.target as HTMLElement;

    const xPos = (clientX / offsetWidth - 0.5) * 2;
    const yPos = (clientY / offsetHeight - 0.5) * 2;

    const xRotate = yPos * -5; // Rotate on X-axis based on Y position
    const yRotate = xPos * 5; // Rotate on Y-axis based on X position

    this.transformStyle.set(
      `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg)`,
    );
  }
}
