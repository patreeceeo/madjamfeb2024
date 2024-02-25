import {Sprite, Texture} from "three";
import { state } from "../state";

export class Entity {
  sprite: Sprite;
  dx = 0;
  dy = 0;
  w = 0;
  h = 0;

  constructor(
    animations: Record<string, Texture>,
    defaultAnimation: string
  ) {
    const sprite = new Sprite();
    sprite.material.map = animations[defaultAnimation];
    const image = sprite.material.map.image as HTMLImageElement;
    this.w = image.width;
    this.h = image.height;
    sprite.scale.set(this.w, this.w, 0);
    this.sprite = sprite;
  }

  spawn(x: number, y: number) {
    this.x = x;
    this.y = y;

    state.entities.add(this);
    state.scene.add(this.sprite);
  }

  set x(x: number) {
    this.sprite.position.x = x;
  }

  set y(y: number) {
    this.sprite.position.y = y;
  }

  get x() {
    return this.sprite.position.x;
  }

  get y() {
    return this.sprite.position.y;
  }

  getVelocityDependentHitbox(dt: number) {
    const hitbox = {h: 0, w: 0, x: 0, y: 0};
    hitbox.w += dt * this.dx;
    hitbox.h += dt * this.dy;
    hitbox.x = this.x - hitbox.w / 2;
    hitbox.y = this.y - hitbox.h / 2;
    return hitbox;
  }

  despawn() {
    const { entities, scene } = state;
    const { sprite } = this;
    scene.remove(sprite);
    entities.delete(this);
  }

  update(_dt: number) {}

  onCollide(_other: Entity) {}

  cleanup() {}
}
