import EnemyManager from "../EnemyManager";
import { Player } from "../Player";
import { PlayerMovement } from "../PlayerMovement";
import { Collider2D } from "./Collider2D";
import { GameObject } from "./GameObject";
import InputManager from "./InputManager";
import Vector2 from "./Vector2";

export default class Game {
  private static instance: Game | null = null;
  public static getInstance(): Game {
    if (Game.instance === null) {
      Game.instance = new Game(); 
    }
    return Game.instance!;
  }

  public objects: GameObject[] = [];

  constructor() {
    this.objects = [
      Object.assign(
        new GameObject(
          new Vector2(500, 50),
          new Collider2D(new Vector2(20, 20)),
          new Player(),
          new PlayerMovement(0.5)
        ),
        { tag: "player" }
      ),
      new GameObject(new Vector2(0, 0), new InputManager(), new EnemyManager()),
    ];
  }
}
