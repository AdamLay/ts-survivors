export class GameEvent<T> {
  private listeners: Function[] = [];

  public on(listener: (data: T) => void): void {
    this.listeners.push(listener);
  }

  public off(listener: (data: T) => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  public emit(data: T): void {
    this.listeners.forEach((listener) => listener(data));
  }
}
