import EnemyManager from "../EnemyManager";
import { Health } from "../Health";
import { Player } from "../Player";
import { PlayerMovement } from "../PlayerMovement";
import { Size } from "./Size";
import { Collider2D } from "./Collider2D";
import { GameObject } from "./GameObject";
import InputManager from "./InputManager";
import Vector2 from "./Vector2";

export default class Game {
  private static instance: Game | null = null;
  public static getInstance(): Game {
    if (Game.instance === null) {
      Game.instance = new Game(); 
      (window as any).game = Game.instance; // Expose the game instance globally for debugging
    }
    return Game.instance;
  }

  public objects: GameObject[] = [];

  constructor() {
    this.objects = [
      Object.assign(
        new GameObject(
          new Vector2(500, 50),
          new Size(new Vector2(24, 48)),
          new Collider2D(),
          new Health(),
          new Player(),
          new PlayerMovement(0.5)
        ),
        { tag: "player" }
      ),
      new GameObject(new Vector2(0, 0), new InputManager(), new EnemyManager()),
    ];
  }
}
