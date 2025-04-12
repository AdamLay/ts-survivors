import { GameComponent } from "./GameComponent";
import Vector2 from "./Vector2";

export class Size extends GameComponent {
  constructor(public size: Vector2) {
    super();
  }
}
