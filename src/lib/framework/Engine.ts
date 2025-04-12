import { implementsOnCollision } from "../interfaces/OnCollision";
import { Camera } from "./Camera";
import { Collider2D } from "./Collider2D";
import Game from "./Game";

export class Engine {
  private requestId = 0;
  private previousTime = 0;
  private camera: Camera | null = null;

  constructor(public canvas: HTMLCanvasElement) {}

  start() {
    const game = Game.getInstance();

    // Find the player GameObject
    const player = game.objects.find((obj) => obj.tag === "player");

    // Initialize the camera
    //const worldSize = new Vector2(800, 600);
    this.camera = new Camera();

    // Set the player as the camera target
    if (player && this.camera) {
      this.camera.follow(player);
    }

    // Reset the previous time reference
    this.previousTime = 0;

    for (const go of game.objects) {
      for (const component of go.components) {
        component.start?.();
      }
    }

    // Start the animation loop
    this.requestId = requestAnimationFrame((time) => {
      this.update(time);
    });
  }

  update(time: number) {
    if (!this.canvas) return;

    const game = Game.getInstance();
    const canvas = this.canvas;
    const context = canvas.getContext("2d");

    // Calculate deltaTime (in milliseconds)
    const deltaTime = this.previousTime ? time - this.previousTime : 0;
    this.previousTime = time;

    for (const object of game.objects) {
      object.update(deltaTime);
    }

    const colliders = game.objects
      .map((object) => object.getComponent(Collider2D))
      .filter((x) => x !== null);

    for (const collider of colliders) {
      for (const other of colliders) {
        if (collider === other) continue; // Skip self-collision



        if (collider.checkCollision(other)) {
          const components = collider.gameObject.components.filter((x) =>
            implementsOnCollision(x)
          );

          for (const component of components) {
            // Call the onCollision method on the component
            component.onCollision(other);
          }
        }
      }
    }

    if (context) {
      this.render(canvas, context, time, deltaTime);
    }

    // Schedule the next frame
    this.requestId = requestAnimationFrame((time) => {
      this.update(time);
    });
  }

  render(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    time: number,
    deltaTime: number
  ) {
    const game = Game.getInstance();

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.camera!.apply(canvas, context);

    // Render all game objects
    for (const object of game.objects) {
      object.render(canvas, context);
    }

    this.camera!.restore(context);

    // Display deltaTime on canvas for debugging (in screen space, not world space)
    context.fillStyle = "#000000";
    context.font = "14px Arial";
    context.fillText(`DeltaTime: ${deltaTime.toFixed(2)} ms`, 10, 20);
    context.fillText(`Time: ${time.toFixed(2)} ms`, 10, 40);
  }
}
