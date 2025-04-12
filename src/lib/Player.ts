import { Collider2D } from "./framework/Collider2D";
import { OnCollision } from "./interfaces/OnCollision";
import { GameComponent } from "./framework/GameComponent";
import { Size } from "./framework/Size";
import Vector2 from "./framework/Vector2";
import { Health } from "./Health";

export class Player extends GameComponent implements OnCollision {
  private static instance: Player | null = null;
  public static getInstance(): Player {
    return Player.instance!;
  }

  public get size(): Vector2 {
    return this.go.getComponent(Size)!.size;
  }
  constructor() {
    super();
    Player.instance = this;
  }

  public start(): void {
    // Subscribe to health zero event when the player is created
    const health = this.go.getComponent(Health);
    if (health) {
      health.dead.on(this.onKilled.bind(this));
    }
  }

  private onKilled() {
    console.log("Player killed!", this);
    // Handle player death logic here
    // For example: show game over screen, play death animation, etc.

    this.go.destroy();

    Player.instance = null;
  }

  //public update(deltaTime: number): void {}

  public onCollision(other: Collider2D): void {
    console.log("Collision detected with:", other);
  }

  public render(_: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    const pos = this.go.position;
    const xr = this.size.x / 2;
    const yr = this.size.y / 2;

    context.fillStyle = "#0077FF";
    context.beginPath();

    context.ellipse(pos.x + xr, pos.y + yr, xr, yr, 0, 0, Math.PI * 2);
    context.fill();
  }
}
