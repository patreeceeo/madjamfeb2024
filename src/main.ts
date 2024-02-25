import {
  inputSource_handleKeyDown,
  inputSource_handleKeyUp,
} from "./inputSource";
import { log_clear, log_getContent, log_write } from "./log";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { DEBUG } from "./constants";

import * as Tone from "tone";
import {
  state,
} from "./state";

import "./style.css";
import {Sprite, Texture, TextureLoader, Vector3} from "three";
import {Entity} from "./entities/Entity";

const canvasWrapperEl = document.getElementById("canvas-wrapper")!;
const logEl = document.getElementById("log")!;

let _controls = new OrbitControls(state.camera, canvasWrapperEl);
_controls.enableRotate = false;

const checkCollisions = (dt: number) => {
  const entities = [...state.entities];
  const hitboxes = entities.map(entity =>
    entity.getVelocityDependentHitbox(dt)
  );

  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      if (hitboxes[i].intersects(hitboxes[j])) {
        entities[i].onCollide(entities[j]);
        entities[j].onCollide(entities[i]);
      }
    }
  }
};

//
// Main loop
//
let then = Date.now();

const tick = () => {
  requestAnimationFrame(tick);

  const now = Date.now();
  const dt = (now - then) / 1000;
  then = now;

  state.renderer.render(state.scene, state.camera);
  log_write("entity count:", state.entities.size);

  if (DEBUG) {
    logEl.innerText = log_getContent();
  }
  log_clear();
};

const loader = new TextureLoader();

const texture = await new Promise<Texture>((resolve) => { const texture = loader.load("sprites/monkeymad.png", () => resolve(texture))
});

const start = () => {
  const { renderer, camera } = state;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 2);

  camera.zoom = Math.min(1 / window.innerWidth, 1 / window.innerHeight);
  camera.lookAt(new Vector3(0, 0, 0));
  camera.position.set(0, 0, 1);
  camera.updateProjectionMatrix();

  const entity = new Entity({idle: [texture]}, "idle");
  entity.spawn(0, 0);

  canvasWrapperEl.appendChild(state.renderer.domElement);
  requestAnimationFrame(tick);
};

const onResize = () => {
};

//
// Add stuff to DOM
//
// @ts-ignore

window.addEventListener("resize", onResize);
document.addEventListener("keydown", event => {
  Tone.start();
  inputSource_handleKeyDown(state.keyboard, event.key);
});
document.addEventListener("keyup", event => {
  inputSource_handleKeyUp(state.keyboard, event.key);
});

onResize();
start();
