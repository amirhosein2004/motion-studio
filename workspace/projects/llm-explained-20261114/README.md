# LLM educational visual draft

Version: `v3-clean-motion`. Educational title: «مدل زبانی چطور جواب می‌سازه؟». Optional user-facing project name remains blank.

Eight redesigned visual scenes; provisional compact duration 110 seconds / 3300 frames at 1920 × 1080 / 30 fps. Approximate natural narrated planning range: 170–220 seconds. All 38 main visual cues now have sound accents, plus scene entries and two response-fragment ticks: 48 events using the same six user-authorized source effects. Original narration and its actual transcript / short timed phrases are pending. No video export has been authorized.

## Start / restart

```powershell
Set-Location -LiteralPath 'C:\Users\Asus\Desktop\PYTHON\Motion Graphic\workspace\projects\llm-explained-20261114'
npm start
```

Studio is launched by the workspace loopback launcher. Verified actual binding: `127.0.0.1:3126`; use the exact URL printed at startup if the port changes.

- Simple review player: http://localhost:3126/static-567807c1950d/preview.html
- Editing Studio: http://localhost:3126/LLM-Explained
- Guide: http://localhost:3126/static-567807c1950d/recording-guide.html
- Markdown guide: [narration/RECORDING-SCRIPT.md](narration/RECORDING-SCRIPT.md)

Public URLs were discovered from Studio's `window.remotion_staticBase` and checked in an actual local Chrome instance. They may change if the project root changes. Find the public files in the Studio Assets tab or inspect that runtime list. The guide returns to the simple player using a relative link.

The simple player contains only playback, seek, mute, fullscreen, chapter buttons and the recording guide. It embeds the exact `Video` component via `@remotion/player`, so it is a live interactive preview, not a video file. `npm start` rebuilds its local JS bundle before starting Studio. No cloud hosting or upload is involved.

## Repeatable preparation and checks

```powershell
npm ci --ignore-scripts --no-audit --no-fund
node scripts/prepare-assets.mjs
npm run prepare:sfx
npm run audit:sfx
npm run guide
node scripts/build-storyboard.mjs
npm run check
npm run qa
npm run qa:preview
```

The dependency install is local to this project; Remotion packages are 4.0.535, React 19.0.0, TypeScript 5.9.3, with `package-lock.json`. Existing projects and bundled tools are unchanged. An initial offline install failed due to a missing cache entry; the subsequent local install succeeded.

`qa` creates only PNG stills and frame metadata in the manifest's versioned renders folder. It uses the existing workspace browser; set `CHROME_PATH` to an existing Chrome executable if moved. It never downloads a browser. `npm run qa -- --all-cues` additionally covers each provisional cue. No export command is supplied before approval.

`qa:preview` starts its own installed headless Chrome, discovers the actual public URL, checks 84 early/settled scene states for text collisions, safe bounds and Persian direction, then exercises the simple player controls and 390-pixel mobile layout. Studio must already be running. It saves reports and PNG screenshots; no video is created. The final pass found no layout issues. The headless player has one Remotion license-information warning and no application errors.

## Timing and editing

- `project.json`: authoritative output format and project/asset/render paths; consumed by Root and scripts.
- `src/timeline.json`: authoritative scene lengths and independent local cue seconds. Scene starts are cumulative in `src/timing.ts`; changing a length shifts later scenes without scaling internal cues.
- `src/chapters/S01.tsx`…`S08.tsx`: separate visual responsibilities, also registered as individual Studio compositions.
- `src/design.ts`: semantic colors, type, spacing and default motion.
- `narration/guide.json`: the single full content source for both MD and HTML guides. Edit it, then run `npm run guide`.
- `docs/STORYBOARD.md`: every semantic phrase / provisional cue and its before → change → after mapping.
- `docs/NARRATIVE-REVIEW.md`: concrete narrative corrections and open items.
- `docs/SOURCES.md`: primary factual verification sources.
- `docs/REVIEW.md`: QA evidence, limitations and approval state.
- `ASSET-SOURCES.json`: preserved source bytes, hashes, licenses and runtime mappings. Original input and fonts are archived in `../../assets/llm-explained-20261114/`.

After viewing the draft and studying the guide, record naturally by semantic VO segment. Supply original audio, the actual spoken transcript and short phrase timestamps or SRT. Exact word timestamps are optional. Final visual and SFX timing follows the real recording; do not race this draft. No synthesis, speech speed changes, captions or music are included.

## Authorized SFX

The six original MP3s were moved from Downloads, preserving names and byte hashes, to `../../assets/llm-explained-20261114/audio/sfx/`. `INTAKE.json` records that transfer. Runtime code depends only on the six prepared WAVs in `public/sfx/`.

- `narration/sfx-edit-plan.json`: trim, fades and target peaks.
- `scripts/prepare-sfx.py`: reproducible PCM 48 kHz stereo preparation, original speed and pitch.
- `src/sfx-assets.json`: generated runtime file/duration mapping.
- `src/sfx-events.json`: cue-linked event reasons and offsets; scene duration changes shift later audio automatically.
- `src/SceneAudio.tsx`: shared frame-driven audio template inside each scene, including standalone compositions.
- Per-event `volume` keeps the new explanatory accents quieter than major transitions. Sixteen previously silent cues and two later response fragments now have sound; reading holds remain quiet.
- `scripts/audit-sfx.py`: source hash, decode, event bounds and full PCM mix peak checks without exporting video or a mixed audio file.
- `docs/SFX-EDIT.md`: editing / placement notes and review limitations.

Per-file peaks are -23 to -26 dBFS. This is a provisional SFX mix; balance must be reviewed with the actual narration. Source licenses were not supplied; project use is explicitly authorized by the user and no license is inferred from filenames.

Final audiovisual preview and explicit approval of its exact version plus an export request are required before any video file, including a low-resolution review video, is created. Planned final defaults after authorization: H.264, CRF 19, yuv420p, BT.709, limited range, plus ffprobe metadata.
