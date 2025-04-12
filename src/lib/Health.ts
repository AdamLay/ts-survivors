import { GameComponent } from "./framework/GameComponent";
import { GameEvent } from "./framework/GameEvent";
import { Size } from "./framework/Size";

// Define the health event types and listener
export type HealthEventType = "zero";
export type HealthEventListener = () => void;

export class Health extends GameComponent {
  public current: number = 100;
  public dead: GameEvent<Health> = new GameEvent<Health>();

  public get percentage(): number {
    return this.current / this.max;
  }

  constructor(public max: number = 100) {
    super();
    this.current = max;
  }

  public adjust(amount: number): void {
    this.current += amount;

    // Check if health has reached zero
    if (this.current <= 0) {
      this.current = 0; // Ensure health doesn't go negative
      this.dead.emit(this);
    }
  }

  public render(_: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
    const size = this.go.getComponent(Size)!.size;

    context.fillStyle = "#AA0000";
    const width = size.x + 6;
    context.fillRect(
      this.go.position.x - 3,
      this.go.position.y + size.y + 5,
      width,
      6
    );

    context.fillStyle = "green";
    context.fillRect(
      this.go.position.x - 3,
      this.go.position.y + size.y + 5,
      width * this.percentage,
      6
    );
  }
}
