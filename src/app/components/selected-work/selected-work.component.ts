import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { VideoControlService } from '../../video-control.service';

@Component({
  selector: 'app-selected-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-work.component.html',
})
export class SelectedWorkComponent {
  @ViewChildren('videoPlayer')
  videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  private videoSub!: Subscription;
  currentPlayingId: string | null = null;

  activeProjectUrl: string | null = null;

  projects = [
    { videoUrl: 'videos/pj_three.mp4', poster: 'poster/pj_five_poster.png' },
    { videoUrl: 'videos/pj_four.mp4', poster: 'poster/pj_four_poster.png' },
    { videoUrl: 'videos/pj_five.mp4', poster: 'poster/pj_three_poster.png' },
    { videoUrl: 'videos/pj_two.mp4', poster: 'poster/pj_two_poster.png' },
  ];

  isPlayingMap: { [key: string]: boolean } = {};
  isHoveringMap: { [key: string]: boolean } = {};

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

  toggleVideo(url: string, currentVideo: HTMLVideoElement) {
    // If clicking the already playing video → just pause it
    if (!currentVideo.paused) {
      currentVideo.pause();
      this.isPlayingMap[url] = false;
      this.currentPlayingId = null;
      return;
    }

    // Pause ALL videos first
    const videos = document.querySelectorAll('video');
    videos.forEach((video: any) => {
      if (video !== currentVideo) {
        video.pause();
        this.currentPlayingId = null;
      }
    });

    // Reset all playing states
    Object.keys(this.isPlayingMap).forEach((key) => {
      this.isPlayingMap[key] = false;
      this.currentPlayingId = null;
    });

    // Play selected one
    currentVideo.play();
    this.isPlayingMap[url] = true;
    this.currentPlayingId = url;

    // Notify all other components
    this.videoService.announceVideoPlay(url);
  }

  setPlaying(url: string, state: boolean) {
    this.isPlayingMap[url] = state;
  }

  setHover(url: string, state: boolean) {
    this.isHoveringMap[url] = state;
  }

  pauseCurrentVideo() {
    const video = document.querySelector(
      `video[data-id="${this.currentPlayingId}"]`,
    ) as HTMLVideoElement;

    video?.pause();
    this.currentPlayingId = null;
  }
}
