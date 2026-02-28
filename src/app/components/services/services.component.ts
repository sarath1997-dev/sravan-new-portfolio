import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { VideoControlService } from '../../video-control.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ServicesComponent {
  isPlaying = false;
  isHovering = false;
  @ViewChildren('videoPlayerShort')
  videoPlayersShort!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChildren('videoPlayerLong')
  videoPlayersLong!: QueryList<ElementRef<HTMLVideoElement>>;
  activeService = signal<'short' | 'long'>('short');
  private videoSub!: Subscription;
  currentPlayingId: string | null = null;

  constructor(private videoService: VideoControlService) {}

  ngOnInit() {
    this.videoSub = this.videoService.videoPlay$.subscribe((videoId) => {
      if (this.currentPlayingId && this.currentPlayingId !== videoId) {
        this.pauseCurrentVideo();
      }
    });
  }

  ngOnDestroy() {
    this.videoSub?.unsubscribe();
  }

  pauseCurrentVideo() {
    const video = document.querySelector(
      `video[data-id="${this.currentPlayingId}"]`,
    ) as HTMLVideoElement;

    video?.pause();
    this.currentPlayingId = null;
  }

  setActiveService(service: 'short' | 'long'): void {
    this.isPlaying = false; // Reset play state when switching services
    this.isHovering = false; // Reset hover state when switching services
    this.activeService.set(service);
  }

  toggleVideo(id: string, video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
      this.currentPlayingId = id;
    } else {
      video.pause();
      this.currentPlayingId = null;
    }

    this.videoService.announceVideoPlay(id);
  }
}
