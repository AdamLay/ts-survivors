import { nanoid } from "nanoid";
import { GameComponent } from "./GameComponent";
import Vector2 from "./Vector2";
import Game from "./Game";

export class GameObject {
  public tag: string = "";

  private _id: string;
  public get id() {
    return this._id;
  }

  public components: GameComponent[] = [];

  constructor(public position: Vector2, ...components: GameComponent[]) {
    this._id = nanoid();
    this.components = components;
    for (const component of this.components) {
      component.gameObject = this;
    }
  }

  getComponent<T extends GameComponent>(
    type: new (...args: any[]) => T
  ): T | null {
    for (const component of this.components) {
      if (component instanceof type) {
        return component;
      }
    }
    return null;
  }

  update(deltaTime: number) {
    for (const component of this.components) {
      if (component.update) {
        component.update(deltaTime);
      }
    }
  }

  destroy() {
    const gameObjects = Game.getInstance().objects;
    const myIndex = gameObjects.findIndex((x) => x.id === this._id);
    gameObjects.splice(myIndex, 1);
  }

  render(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    for (const component of this.components) {
      if (component.render) {
        component.render(canvas, context);
      }
    }
  }
}
