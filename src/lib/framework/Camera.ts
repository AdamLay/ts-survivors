import { GameComponent } from "./GameComponent";
import Vector2 from "./Vector2";
import { GameObject } from "./GameObject";

export class Camera extends GameComponent {
  private target: GameObject | null = null;
  private offset: Vector2;

  constructor(offset: Vector2 = new Vector2(0, 0)) {
    super();
    this.offset = offset;
  }

  public follow(target: GameObject): void {
    this.target = target;
  }

  public update(_: number): void {
    // No need to update if there's no target
    if (!this.target) return;
  }

  public apply(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    if (!this.target) return;

    // Calculate the camera position - center on the target with offset
    const targetPosition = this.target.position;

    // Calculate where the camera should be positioned
    const cameraX = targetPosition.x - canvas.width / 2 + this.offset.x;
    const cameraY = targetPosition.y - canvas.height / 2 + this.offset.y;

    // Apply the transformation to the context
    context.save();
    context.translate(-cameraX, -cameraY);
  }

  public restore(context: CanvasRenderingContext2D): void {
    context.restore();
  }
}
