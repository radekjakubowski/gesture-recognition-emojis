import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmojiResult } from 'src/app/models/emoji-result';
import { EmojisService } from 'src/app/services/emojis.service';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss']
})
export class EmojisComponent {
  private _emojisService = inject(EmojisService);

  public emojis$(): Observable<EmojiResult[]> {
    return this._emojisService.observeScore();
  }
}
