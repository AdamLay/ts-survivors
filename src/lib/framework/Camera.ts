import { GameComponent } from "./GameComponent";
import Vector2 from "./Vector2";
import { GameObject } from "./GameObject";

export class Camera extends GameComponent {
  private target: GameObject | null = null;
  private offset: Vector2;
  private worldSize: Vector2;
  private smoothing: number;

  /**
   * Creates a camera that can follow a target game object
   * @param worldSize The size of the game world (width, height)
   * @param offset Optional offset from the target (default: center of the screen)
   * @param smoothing How smoothly the camera follows its target (0-1, 1 = instant)
   */
  constructor(
    worldSize: Vector2,
    offset: Vector2 = new Vector2(0, 0),
    smoothing: number = 0.1
  ) {
    super();
    this.worldSize = worldSize;
    this.offset = offset;
    this.smoothing = Math.min(Math.max(smoothing, 0), 1); // Clamp between 0 and 1
  }

  /**
   * Sets the game object for the camera to follow
   * @param target The game object to follow
   */
  public follow(target: GameObject): void {
    this.target = target;
  }

  /**
   * Updates the camera position to follow the target
   * @param deltaTime Time since last update in milliseconds
   */
  public update(deltaTime: number): void {
    // No need to update if there's no target
    if (!this.target) return;
  }

  /**
   * Applies camera transformation to the canvas context
   * @param canvas The canvas element
   * @param context The rendering context
   */
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

  /**
   * Restores the context to its original state
   * @param context The rendering context
   */
  public restore(context: CanvasRenderingContext2D): void {
    context.restore();
  }
}
