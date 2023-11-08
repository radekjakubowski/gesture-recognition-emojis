import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGestureCaptureComponent } from './video-gesture-capture.component';

describe('VideoGestureCaptureComponent', () => {
  let component: VideoGestureCaptureComponent;
  let fixture: ComponentFixture<VideoGestureCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoGestureCaptureComponent]
    });
    fixture = TestBed.createComponent(VideoGestureCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
