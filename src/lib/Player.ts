import { Collider2D } from "./framework/Collider2D";
import { OnCollision } from "./interfaces/OnCollision";
import { GameComponent } from "./framework/GameComponent";

export class Player extends GameComponent implements OnCollision {
  private static instance: Player | null = null;
  public static getInstance(): Player {
    return Player.instance!;
  }

  constructor() {
    super();
    Player.instance = this;
  }

  public update(deltaTime: number): void {}

  public onCollision(other: Collider2D): void {
    console.log("Collision detected with:", other);
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
