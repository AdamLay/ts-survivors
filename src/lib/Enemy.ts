import { Collider2D } from "./framework/Collider2D";
import { OnCollision } from "./interfaces/OnCollision";
import { GameComponent } from "./framework/GameComponent";
import { Player } from "./Player";
import Vector2 from "./framework/Vector2";

export class Enemy extends GameComponent implements OnCollision {
  private moveSpeed: number;

  constructor(moveSpeed: number = 0.2) {
    super();
    this.moveSpeed = moveSpeed;
  }

  public update(deltaTime: number): void {
    // Get the player's position
    const player = Player.getInstance();
    const playerPos = player.go.position;
    const enemyPos = this.go.position;

    // Calculate direction vector toward player
    const direction = new Vector2(
      playerPos.x - enemyPos.x,
      playerPos.y - enemyPos.y
    );

    // Normalize the direction and scale by speed and deltaTime for framerate-independent movement
    if (direction.length() > 0) {
      const normalizedDir = direction.normalize();
      const movement = normalizedDir.multiply(this.moveSpeed * deltaTime);

      // Move enemy toward the player
      this.go.position.x += movement.x;
      this.go.position.y += movement.y;
    }

    console.log("Enemy position:", this.go.position);
  }

  public onCollision(other: Collider2D): void {
    console.log("Enemy collision detected with:", other);

    if (other.go.tag === "player") {

      // Take health from player
      
      this.go.destroy();
    }
  }

  public render(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    // Render enemy as a red circle
    context.fillStyle = "#FF3333";
    context.beginPath();
    context.arc(this.go.position.x, this.go.position.y, 15, 0, Math.PI * 2);
    context.fill();
  }
}
