//
// game state
//
import {OrthographicCamera, Scene, WebGLRenderer} from "three";

import { inputSource_create } from "./inputSource";
import { generateLevel } from "./level";

export let state = generateFreshGameState();

function generateFreshGameState() {
  const keyboard = inputSource_create();

  const scene = new Scene();

  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);

  const renderer = new WebGLRenderer();

  return {
    status: GameStatus.Unstarted,
    scene,
    keyboard,
    /** A Set instead of an Array as a conveniently gaurenteed-unique list of entities. */
    entities: new Set(generateLevel()),
    camera,
    renderer,
  };
}

export enum GameStatus {
  Unstarted,
  Initializing, // Initial jump
  Playing,
  GameOver,
}

export function saveHighScore(newHighScore: number) {
  window.localStorage.setItem("dino-score", JSON.stringify(newHighScore));
}
