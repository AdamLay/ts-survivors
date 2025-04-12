import { GameObject } from "./GameObject";

export abstract class GameComponent {
  public gameObject: GameObject = null as any; // Will definitely be set in the GO constructor

  public get go() {
    return this.gameObject;
  } // For convenience

  public start?(): void;

  public update?(deltaTime: number): void;

  public render?(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void;
}
