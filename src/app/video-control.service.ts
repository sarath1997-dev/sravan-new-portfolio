import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoControlService {
  private videoPlaySource = new Subject<string>();
  videoPlay$ = this.videoPlaySource.asObservable();

  announceVideoPlay(videoId: string) {
    this.videoPlaySource.next(videoId);
  }
}
