import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmojiResult } from '../models/emoji-result';
import { GestureType } from '../models/gesture-type';

@Injectable({
  providedIn: 'root'
})
export class EmojisService {
  private _emojis = new BehaviorSubject<EmojiResult[]>([
    { icon: '👍', counter: 0, type: "Thumb_Up", bumped: false },
    { icon: '👎', counter: 0, type: "Thumb_Down", bumped: false },
    { icon: '✌️', counter: 0, type: "Victory", bumped: false },
    { icon: '☝️', counter: 0, type: "Pointing_Up", bumped: false },
    { icon: '✊', counter: 0, type: "Closed_Fist", bumped: false}
  ])

  public increaseScore(gestureType: GestureType) {
    const bumpedEmojis = this._emojis.value.map((emoji) => {
      return emoji.type === gestureType ? { ...emoji, counter: ++emoji.counter, bumped: true } : {...emoji, bumped: false }
      }
    );

    this._emojis.next(bumpedEmojis);
  }

  public observeScore(): Observable<EmojiResult[]> {
    return this._emojis;
  }
}
