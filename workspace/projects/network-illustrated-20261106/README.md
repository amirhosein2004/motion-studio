# Network illustrated — visual draft v5 — 7:38 cut, 3D depth layer

Independent 15-scene Remotion lesson. 1920×1080, 30fps; provisional duration 7:38 (13753 frames).
Original layered SVG devices, orange paper texture, yellow titles and cast shadows. The devices keep their original artwork and are presented on a real CSS 3D stage (perspective, slow yaw/pitch parallax, stacked depth layers for thickness and a moving cast shadow) in `src/scenes/Device3D.tsx`. A separate hand-authored SVG depth layer adds cropped polyhedra at the frame edges, a slow 3D constellation, and 3D packet cubes in S11. No new packages were installed for any of the 3D work.

```powershell
cd workspace/projects/network-illustrated-20261106
npm start
npm run check
npm run timeline
node scripts/qa-stills.mjs --frames=15 --beats
```

Pacing: every authored `at={...}` beat is written in script seconds. `src/pace.json` compresses those beats by 0.9 and keeps a 2.2 s tail per scene; `npm run timeline` rebuilds `src/timeline.json` from that map. `useSeconds` in `src/Shared.tsx` applies the same factor and `src/Sfx.tsx` moves SFX cues with it, so sound and picture stay locked. Change `pace` in one place and rerun `npm run timeline` instead of editing scene durations by hand.

Preview: http://localhost:3118/NetworkFoundations . Use Play, Pause and timeline seeking. Individual scenes S01–S15 are in the Scenes folder. Start is bound to 127.0.0.1 by the existing launcher.

Read narration/RECORDING-SCRIPT.md alongside the preview. All VO recordings are pending. This is a visual rehearsal draft with user-supplied SFX, not a complete audiovisual preview. Timings in src/timeline.json and scene cues are provisional; adjust to natural recorded delivery later. No synthetic voice or placeholder silence has been created.

QA PNGs: workspace/renders/network-illustrated-20261106/qa/ . No video was generated. Final export requires approval of the complete audiovisual version and an explicit render request.

Dependencies use a junction to installation/tools/remotion/node_modules. No installed tools or packages were modified. src/scenes/Device.tsx holds the original SVG drawings; src/design.ts holds design tokens; src/depth/ holds the 3D projection engine and scene accents. restyle.py and update-docs.py record one-time migration operations and must not be rerun over edited files.

Original pasted request: workspace/assets/network-illustrated-20261106/USER-REQUEST.txt . The reference image was visible in chat but no local image file was available; it was not imported as an asset. Future original recordings belong in workspace/assets/network-illustrated-20261106/ and playback copies in public/audio/.

SFX: the 9 source MP3s now live inside the project at public/audio/sfx/source/ (copies of the Downloads files), alongside prepared quiet WAV playback files and 162 frame-based events. See docs/SFX.md, src/sfx-cues.json and src/sfx-assets.json. Reprepare audio with `npm run prepare:sfx`; this does not alter the originals. No new packages were installed; @remotion/media uses the existing linked installation.


Version 4 review: docs/REVIEW-V4.md. Typography, panel spacing, packet labels and paths were corrected. Updated cue coverage is generated from the actual TSX syntax tree, including mapped arrays. Simultaneous visual changes share a cue; static reading holds stay silent.

```powershell
npm run audit:sfx
npm run check
npm run qa:review
```

Review artifacts: workspace/renders/network-illustrated-20261106/qa-v4/ . The browser layout audit sampled 181 positions across all 15 scenes; see layout-audit.json. Final render approval is still pending. Do not rerun the one-time place-sfx.py migration over the reviewed cue sheet; use audit:sfx instead.
