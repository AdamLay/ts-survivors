import { GameComponent } from "./GameComponent";

export enum GameKey {
  UP = "w",
  DOWN = "s",
  LEFT = "a",
  RIGHT = "d",
  SPACE = " ",
  SHIFT = "Shift",
  ESCAPE = "Escape",
  ENTER = "Enter",
  // Arrow keys
  ARROW_UP = "ArrowUp",
  ARROW_DOWN = "ArrowDown",
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
}

export default class InputManager extends GameComponent {
  private static instance: InputManager | null = null;
  public static getInstance(): InputManager {
    return InputManager.instance!;
  }

  private keys: Set<string> = new Set();

  constructor() {
    super();
    InputManager.instance = this;
    
    window.addEventListener("keydown", (event) => {
      this.keys.add(event.key);
    });

    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.key);
    });
  }

  public isKeyPressed(key: GameKey): boolean {
    return this.keys.has(key);
  }
}
