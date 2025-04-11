export default class Vector2 {
  public static get zero() {
    return new Vector2(0, 0);
  }
  
  constructor(public x: number, public y: number) {}
  add(vector: Vector2) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }
  subtract(vector: Vector2) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }
  multiply(scalar: number) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }
  divide(scalar: number) {
    return new Vector2(this.x / scalar, this.y / scalar);
  }
  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  normalize() {
    const length = this.length();
    return new Vector2(this.x / length, this.y / length);
  }
  static distance(a: Vector2, b: Vector2) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }
}
