import { GameComponent } from "./framework/GameComponent";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import Game from "./framework/Game";
import Vector2 from "./framework/Vector2";
import { Collider2D } from "./framework/Collider2D";
import { GameObject } from "./framework/GameObject";
import { Size } from "./framework/Size";
import { Health } from "./Health";

export default class EnemyManager extends GameComponent {
  private static instance: EnemyManager | null = null;
  public static getInstance(): EnemyManager {
    return EnemyManager.instance!;
  }

  private enemies: Set<string> = new Set();
  private spawnTimer: number = 0;
  private spawnInterval: number = 2000; // Spawn every 2 seconds
  private spawnDistance: number = 300; // Distance from player to spawn enemies

  constructor() {
    super();
    EnemyManager.instance = this;
  }

  public update(deltaTime: number): void {
    // Increment spawn timer
    this.spawnTimer += deltaTime;

    // Check if it's time to spawn a new enemy
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnEnemy();
      this.spawnTimer = 0; // Reset the timer
      this.spawnInterval *= 0.999; // Decrease spawn interval over time
    }
  }

  private spawnEnemy(): void {
    const player = Player.getInstance();
    if (!player || !player.go) return;

    // Generate a random angle around the player
    const randomAngle = Math.random() * Math.PI * 2;

    // Calculate spawn position using the angle and spawn distance
    const spawnX =
      player.go.position.x + Math.cos(randomAngle) * this.spawnDistance;
    const spawnY =
      player.go.position.y + Math.sin(randomAngle) * this.spawnDistance;

    // Create new enemy GameObject
    const enemy = new GameObject(
      new Vector2(spawnX, spawnY),
      new Size(new Vector2(30, 30)),
      new Collider2D(undefined, "player"),
      new Health(20),
      new Enemy(0.05) // Adjust speed as needed
    );

    // Set tag for identification
    enemy.tag = "enemy";

    // Add enemy to the game's objects
    Game.getInstance().objects.push(enemy);

    // Track the enemy in our set
    this.enemies.add(enemy.id);

    console.log(
      `Spawned enemy at (${spawnX.toFixed(2)}, ${spawnY.toFixed(2)})`
    );
  }
}
