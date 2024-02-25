import { ToneAudioBuffer } from "tone";

const AUDIO_PATHS = [] as const;

const audioData = await Promise.all(
  AUDIO_PATHS.map(path => new ToneAudioBuffer().load(`audio/${path}`))
);
const _audio: Record<string, ToneAudioBuffer> = {};
for (let i = 0; i < AUDIO_PATHS.length; i += 1) {
  _audio[AUDIO_PATHS[i]] = audioData[i];
}
export const audio = _audio as Record<
  (typeof AUDIO_PATHS)[number],
  ToneAudioBuffer
>;

const loadAssets = async () =>
  awaitValues({
    audio: awaitValues({
      // jump: new ToneAudioBuffer().load("audio/jump.mp3"),
    }),
  });

export type Assets = Awaited<ReturnType<typeof loadAssets>>;

let _assets: Assets | null = null;

export const assets = () => {
  if (_assets === null) throw new Error("Assets are not loaded");
  return _assets;
};

assets.load = async () => {
  try {
    _assets = await loadAssets();
  } catch (e) {
    console.error("Error loading assets");
    console.error(e);
    throw e;
  }
};

type AwaitedValues<T extends object> = {
  [K in keyof T]: Awaited<T[K]>;
};

const awaitValues = async <T extends object>(
  obj: T
): Promise<AwaitedValues<T>> => {
  const result: Partial<AwaitedValues<T>> = {};
  const keys = Object.keys(obj) as (keyof T)[];
  await Promise.all(
    keys.map(async key => {
      result[key] = await obj[key];
    })
  );
  return result as AwaitedValues<T>;
};
