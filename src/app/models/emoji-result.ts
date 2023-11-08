import { GestureType } from "./gesture-type";

export interface EmojiResult {
  icon: string;
  counter: number;
  type: GestureType
  bumped: boolean;
}
