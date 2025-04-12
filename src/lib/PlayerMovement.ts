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
}
