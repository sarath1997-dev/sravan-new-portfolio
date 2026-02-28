import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bento-grid',
  templateUrl: './bento-grid.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BentoGridComponent {
  software = [
    'Premiere Pro',
    'After Effects',
    'Photoshop',
    'Illustrator',
    'DaVinci Resolve',
    'Canva',
    'CapCut',
  ];
}
