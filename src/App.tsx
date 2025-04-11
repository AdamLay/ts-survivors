import { useEffect, useRef } from "react";
import "./App.css";
import Vector2 from "./lib/framework/Vector2";
import { GameObject } from "./lib/framework/GameObject";
import { Collider2D } from "./lib/framework/Collider2D";
import { implementsOnCollision } from "./lib/interfaces/OnCollision";
import { Camera } from "./lib/framework/Camera";
import Game from "./lib/framework/Game";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const cameraRef = useRef<Camera | null>(null);
  const playerRef = useRef<GameObject | null>(null);

  const render = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    time: number,
    deltaTime: number
  ) => {
    const game = Game.getInstance();

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Apply camera transformation if camera exists
    if (cameraRef.current) {
      cameraRef.current.apply(canvas, context);
    }

    // Render all game objects
    for (const object of game.objects) {
      object.render(canvas, context);
    }

    // Restore the original context state
    if (cameraRef.current) {
      cameraRef.current.restore(context);
    }

    // Display deltaTime on canvas for debugging (in screen space, not world space)
    context.fillStyle = "#000000";
    context.font = "14px Arial";
    context.fillText(`DeltaTime: ${deltaTime.toFixed(2)} ms`, 10, 20);
    context.fillText(`Time: ${time.toFixed(2)} ms`, 10, 40);
  };

  const update = (time: number) => {
    if (!canvasRef.current) return;

    const game = Game.getInstance();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Calculate deltaTime (in milliseconds)
    const deltaTime = previousTimeRef.current
      ? time - previousTimeRef.current
      : 0;
    previousTimeRef.current = time;

    for (const object of game.objects) {
      object.update(deltaTime);
    }

    const colliders = game.objects
      .map((object) => object.getComponent(Collider2D))
      .filter((x) => x !== null);

    for (const collider of colliders) {
      for (const other of colliders) {
        if (collider !== other && collider.checkCollision(other)) {
          const components = collider.gameObject.components.filter((x) =>
            implementsOnCollision(x)
          );

          for (const component of components) {
            // Call the onCollision method on the component
            component.onCollision(other);
          }
        }
      }
      // Everything is inside the world, so when it stops colliding, it means it is outside the world
      // if (!object.collider.checkCollision(world.current)) {
      //   object.onCollision(world.current);
      // }
    }

    if (context) {
      render(canvas, context, time, deltaTime);
    }

    // Schedule the next frame
    requestIdRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    // Initialize canvas size
    if (canvasRef.current) {
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
    }

    // Find the player GameObject
    playerRef.current =
      Game.getInstance().objects.find((obj) => obj.tag === "player") || null;

    // Initialize the camera
    const worldSize = new Vector2(800, 600);
    cameraRef.current = new Camera(worldSize);

    // Set the player as the camera target
    if (playerRef.current && cameraRef.current) {
      cameraRef.current.follow(playerRef.current);
    }

    // Reset the previous time reference
    previousTimeRef.current = 0;

    // Start the animation loop
    requestIdRef.current = requestAnimationFrame(update);

    // Clean up
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return (
    <>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default App;
