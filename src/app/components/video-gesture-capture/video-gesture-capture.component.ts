import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Category, FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision';
import { GestureType } from 'src/app/models/gesture-type';
import { EmojisService } from 'src/app/services/emojis.service';

@Component({
  selector: 'app-video-gesture-capture',
  templateUrl: './video-gesture-capture.component.html',
  styleUrls: ['./video-gesture-capture.component.scss'],
})
export class VideoGestureCaptureComponent implements OnInit, AfterViewInit {
  public videoSettings = {
    width: 800,
    height: 480,
    fps: 60
  };

  @ViewChild('video')
  public video!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvas')
  public canvasElement!: ElementRef<HTMLCanvasElement>;

  private gestureRecognizer!: GestureRecognizer;
  private canvasContext!: CanvasRenderingContext2D | null;
  private recognitionScoreThreshold = 0.75;

  private _lastlyCapturedGesture!: { type: GestureType, score: number };
  private _emojisService = inject(EmojisService);

  private set currentGestureResult(recognizerInput: Category[][]) {
    const gesture = recognizerInput?.[0]?.[0]

    if (!gesture) return;
    const extractedResult: { type: GestureType, score: number } = { type: gesture.categoryName as GestureType, score: gesture.score };

    if (!extractedResult || extractedResult.type === 'None') {
      return;      
    }

    if (extractedResult.score >= this.recognitionScoreThreshold && this._lastlyCapturedGesture?.type !== extractedResult.type) {
      this._emojisService.increaseScore(extractedResult.type);
      this._lastlyCapturedGesture = extractedResult;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.buildGestureRecognizer();
  }

  ngAfterViewInit(): void {
    this.activateWebcam();
    this.assignCanvasContext();
    this.startDrawingCameraStream();
  }

  private startDrawingCameraStream(): void {
    setInterval(() => this.drawVideoOnCanvas(this.video), 1000 / this.videoSettings.fps);
  }

  private assignCanvasContext(): void {
    this.canvasContext = this.canvasElement.nativeElement.getContext("2d", { alpha: false });
  }

  private async buildGestureRecognizer(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
    );

    this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
        delegate: 'GPU',
      },
      runningMode: 'IMAGE',
    });
  }

  private activateWebcam(): void {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: this.videoSettings.width,
          height: this.videoSettings.height,
        },
      })
      .then((stream) => {
        this.video.nativeElement.srcObject = stream;
      })
      .catch(rejection => {
        console.error("Camera has to be launched!")
      });
  }

  private drawVideoOnCanvas(video: ElementRef<HTMLVideoElement>) {
    if (!this.canvasContext || !this.video) {
      return;
    }
  
    this.canvasContext!.drawImage(video.nativeElement, 0, 0, this.videoSettings.width, this.videoSettings.height);
  }

  public detectGestures() {
    setInterval(() => {
      this.currentGestureResult = this.gestureRecognizer?.recognize(this.video.nativeElement).gestures;
    })
  }
}
