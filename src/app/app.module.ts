import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmojisComponent } from './components/emojis/emojis.component';
import { VideoGestureCaptureComponent } from './components/video-gesture-capture/video-gesture-capture.component';

@NgModule({
  declarations: [
    AppComponent,
    EmojisComponent,
    VideoGestureCaptureComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
