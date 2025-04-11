import { Collider2D } from "../framework/Collider2D";

export interface OnCollision {
  onCollision: (other: Collider2D) => void;
}

export function implementsOnCollision(obj: Object): obj is OnCollision {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "onCollision" in obj &&
    typeof obj.onCollision === "function"
  );
}
