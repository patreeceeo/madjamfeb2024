export class Rect {
  constructor(public x = 0, public y = 0, public w = 0, public h = 0) {}
  intersects(other: Rect) {
    const x0 = this.x < other.x ? other.x : this.x;
    const x1 = this.right > other.right ? other.right : this.right;

    if (x1 <= x0) {
      return false;
    }

    const y0 = this.y < other.y ? other.y : this.y;
    const y1 = this.bottom > other.bottom ? other.bottom : this.bottom;

    return y1 > y0;
  }

  get right() {
    return this.x + this.w;
  }
  get bottom() {
    return this.y + this.h;
  }
}
