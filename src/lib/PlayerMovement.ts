import { GameComponent } from "./framework/GameComponent";
import InputManager, { GameKey } from "./framework/InputManager";

export class PlayerMovement extends GameComponent {
  constructor(public speed: number) {
    super();
  }

  public update(deltaTime: number): void {
    const im = InputManager.getInstance();
    if (im.isKeyPressed(GameKey.UP)) {
      this.go.position.y -= this.speed * deltaTime;
    }
    if (im.isKeyPressed(GameKey.DOWN)) {
      this.go.position.y += this.speed * deltaTime;
    }
    if (im.isKeyPressed(GameKey.LEFT)) {
      this.go.position.x -= this.speed * deltaTime;
    }
    if (im.isKeyPressed(GameKey.RIGHT)) {
      this.go.position.x += this.speed * deltaTime;
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
