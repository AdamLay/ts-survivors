import { GameComponent } from "./GameComponent";
import { Collider2D } from "./framework/Collider2D";
import { OnCollision } from "./interfaces/OnCollision";
import Vector2 from "./framework/Vector2";

export class Ball extends GameComponent implements OnCollision {
  constructor(public velocity: Vector2) {
    super();
  }

  public update(deltaTime: number): void {
    this.velocity.y += 0.01 * deltaTime; // Simulate gravity

    this.velocity.x *= 0.99; // Simulate air resistance
    this.velocity.y *= 0.99; // Simulate air resistance

    this.go.position.x += (this.velocity.x);
    this.go.position.y += (this.velocity.y);

    //console.log("Ball velocity:", this.velocity);
  }

  public onCollision(other: Collider2D): void {
    console.log("Collision detected with:", other);
    if (other.go.tag === "floor") {
      this.velocity.y = -this.velocity.y;
    }
    if (other.go.tag.startsWith("wall")) {
      this.velocity.x = -this.velocity.x;
    }
  }

  public render(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.fillStyle = "#0077FF";
    context.beginPath();
    context.arc(this.go.position.x, this.go.position.y, 20, 0, Math.PI * 2);
    context.fill();
  }
}
