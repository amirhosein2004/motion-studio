# Quality, preview, and final-output approval

Professional quality means correct explanation, consistent design, intelligible authorized audio, deterministic playback, and reproducible outputs. It is not the number of effects used.

## Review gates

| Gate | Check | Record |
|---|---|---|
| Brief | Audience, scope, facts, target format, supplied sources | `docs/BRIEF.md` |
| Narrative / offer | Beginner continuity or one clear commercial message | `docs/NARRATIVE-REVIEW.md` for education; storyboard for ads |
| Visual draft | Real scenes, legibility, meaningful progressive states | `docs/STORYBOARD.md`, QA stills |
| Audio/timing | Exact supplied files, trustworthy cue precision, original speed | Source mappings, alignment/timeline data |
| Complete preview | All expected scenes, real audio when required, controls and transitions | Versioned QA reports and `docs/REVIEW.md` |
| Final export | Explicit approval and export request for that version | Approval record, render settings, ffprobe output |

A partial recording handoff is a partial audiovisual draft, not a completed narrated video. A deliberately silent advertising preview is complete for that mode.

## Visual checks

Review representative frames around important cues, entrances, transitions, and moving states. A settled final frame alone cannot reveal all collisions. The mandatory frame-sampling checklist (overlap, contrast, text size, safe area, RTL/LTR, overflow, aspect adaptation) is the visual QA gate in [motion-quality](motion-quality.md); run it and record it in `docs/VISUAL-QA.md`.

Beyond that gate, review content correctness: main question/message, cause/effect, scene order, and correctness of numbers/code, plus progressive focus, pacing, readable holds, and continuity.

## Audio and timing checks

- Verify runtime audio exists, decodes, and matches the intended recording/scene.
- Preserve originals; record any conversion, gain, or authorized edit.
- Measure actual decoded playback duration and document meaningful container/padding differences.
- Validate supplied SRT/JSON against the same audio version and stated units.
- Never label phrase-level cues as exact word boundaries.
- Preserve speech speed/pitch, natural pauses, and breaths.
- With authorized SFX/music, check headroom, event timing, tails, and voice intelligibility. Avoid accidental duplicate playback and distracting stacked effects.
- Verify play/pause/seeking and transitions where browser tools allow.
- Analyser peaks, ASR confidence, file decoding, or automated checks do not constitute human listening/pronunciation approval.

Do not add media merely to satisfy a QA category. A missing optional music/SFX track is not a defect when it was never requested.

## Verification discipline

Use relevant type/build checks and mandatory project checks. Before video export, type checking and representative QA stills are required. Add a focused check for a genuine unresolved failure; do not generate redundant tests for low-impact edits or endlessly repeat passing checks.

Prefer a bounded review cycle: inspect meaningful states, fix observed problems in a batch, verify those changes, and continue to handoff. Put stills/reports in `workspace/renders/<project-id>/` using the project's version convention. Do not create unrelated demo videos.

When tools cannot verify a behavior, state the exact limitation instead of reporting a pass.

## Preview handoff

Provide:

- Exact version, actual/provisional duration, resolution, and frame rate.
- Working local player URL and reproducible restart command.
- Educational MD guide and direct served HTML guide URL.
- Audio coverage and genuine incomplete items.
- Relevant evidence and remaining precision/access limitations.

Find the actual Remotion public-serving URL; do not invent a static prefix or assume a port. Stills and storyboards support the full player but never replace it.

## Export gate

No final MP4, low-resolution review video, other video export, publish, or upload until the user explicitly approves the viewed version and requests the relevant export/action. If interactive review is impossible, explain the limitation and obtain separate explicit authorization before making a review video.

Approval applies to the stated version. Preserve the record in `docs/REVIEW.md`; a material later change requires a renewed preview approval. A voice sample, a frame, silence, or elapsed time is not full-video approval.

After authorized export, keep the approved version separate from revisions. Default settings, unless overridden:

- 1920 x 1080, 30 fps.
- H.264, CRF 19, yuv420p.
- BT.709, limited color range.
- No speech time stretching.

Run ffprobe after export. Save `media-info.json`, actual scene timing, render settings/engine version, and verification results with that output. Report the concrete delivered file and any real limitations.
