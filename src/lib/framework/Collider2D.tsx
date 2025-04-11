import { GameComponent } from "./GameComponent";
import Vector2 from "./Vector2";

export class Collider2D extends GameComponent {
  constructor(public size: Vector2) {
    super();
  }

  public render(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.strokeStyle = "#FF0000";
    context.strokeRect(
      this.gameObject.position.x,
      this.gameObject.position.y,
      this.size.x,
      this.size.y
    );
  }

  checkCollision(other: Collider2D): boolean {
    const x = this.gameObject.position.x;
    const y = this.gameObject.position.y;
    const otherX = other.gameObject.position.x;
    const otherY = other.gameObject.position.y;
    return (
      x < otherX + other.size.x &&
      x + this.size.x > otherX &&
      y < otherY + other.size.y &&
      y + this.size.y > otherY
    );
  }
}
