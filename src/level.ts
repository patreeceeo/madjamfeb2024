import {DEBUG} from "./constants";
import { Entity } from "./entities/Entity";

export const generateLevel = (): Entity[] => {
  let x = 0;
  const i = (n: number) => {
    x += n;
    return x;
  };

  if (DEBUG) {
    return [
    ];
  }

  return [
  ];
};
