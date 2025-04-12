import { useEffect, useRef } from "react";
import "./App.css";
import { Engine } from "./lib/framework/Engine";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize canvas size
    if (canvasRef.current) {
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;

      const e = new Engine(canvasRef.current);
      e.start();
    }
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
