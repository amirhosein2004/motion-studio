import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

// Rebuilds scene durations from the authored beat map in src/pace.json.
// Every `at={...}` value in a chapter stays untouched; playback compresses it
// by `pace` (see useSeconds in Shared.tsx) and only a short tail is kept.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const timelinePath = join(root, 'src', 'timeline.json');
const pace = JSON.parse(readFileSync(join(root, 'src', 'pace.json'), 'utf8'));
const timeline = JSON.parse(readFileSync(timelinePath, 'utf8'));
const fps = timeline.fps ?? 30;

let fromFrame = 0;
for (const scene of timeline.scenes) {
  const authoredMax = pace.authoredMax[scene.id];
  if (typeof authoredMax !== 'number') throw new Error(`No authoredMax for ${scene.id}`);
  const seconds = authoredMax * pace.pace + pace.tailSeconds;
  scene.authoredLastBeat = authoredMax;
  scene.durationInFrames = Math.round(seconds * fps);
  scene.fromFrame = fromFrame;
  fromFrame += scene.durationInFrames;
}

timeline.durationInFrames = fromFrame;
timeline.pace = {factor: pace.pace, tailSeconds: pace.tailSeconds};
timeline.status = 'provisional-no-recorded-voice; tightened pacing for 7-8 minute cut';

writeFileSync(timelinePath, JSON.stringify(timeline, null, 2) + '\n');
console.log(`Scenes: ${timeline.scenes.length}`);
console.log(`Total: ${fromFrame} frames = ${(fromFrame / fps / 60).toFixed(2)} min`);
for (const scene of timeline.scenes) {
  console.log(`${scene.id} ${(scene.durationInFrames / fps).toFixed(2)}s (last beat ${scene.authoredLastBeat}s)`);
}
