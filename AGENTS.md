# Workspace instructions

Build educational and advertising motion through code. This file defines the operating contract; detailed production rules live in [rules/README.md](rules/README.md).

## Scope and precedence

- Explicit user requirements take precedence over workspace defaults and skill recommendations, subject to platform and safety rules.
- Read the rules index and relevant linked rules before planning or implementation. Read [project structure](rules/project-structure.md) before creating or reorganizing a project.
- These documentation changes apply to new work. Preserve existing projects, source assets, exports, and approved styles. Do not migrate or redesign older work automatically.
- Shared documentation is English. Educational content, teacher guides, and Persian on-screen copy remain natural Persian unless the user requests otherwise.
- Load only relevant skills. Use `remotion-best-practices` for Remotion implementation; design skills advise appearance and never override the brief. Do not install skills or combine conflicting style workflows without a request.

## Workspace and assets

- Code belongs in `workspace/projects/<project-id>/`; source inputs belong in `workspace/assets/<project-id>/`; exports and QA belong in `workspace/renders/<project-id>/`.
- Use the same stable project ID in all three locations. The technical ID does not fill a blank user-facing project-name field.
- From now on, store original voice recordings, SRT/transcripts, SFX, authorized music, images, video clips, fonts, and references for each motion in its asset folder. Use the categories in the structure guide.
- Preserve original filenames and bytes. Prepare playback copies in the project's `public/`; record source-to-runtime mappings and processing in `ASSET-SOURCES.json`.
- `public/` is a serving/staging directory, not the master archive. Do not expose unused originals there or reference Downloads/Desktop paths in runtime code.
- Keep installation tools and launchers under `installation/`; never modify bundled applications. Keep dependencies project-local; an existing dependency junction is acceptable without editing its target.
- Keep `workspace/` free of unrelated demos and unauthorized test videos. Create optional folders only when used.
- New projects should provide the path manifest described in the structure guide. Existing projects may keep their working paths until migration is explicitly requested.
- Resolve paths from the project/script location. Before recursive filesystem operations, verify absolute targets stay inside the intended workspace and use one shell with literal paths.

## Tool selection

| Work | Default tool |
|---|---|
| General, technology, or programming education | Remotion |
| Pure mathematical explanation | Manim |
| Isolated vector intro/effect | Motion Canvas |
| Web animation or necessary lightweight 3D | Existing GSAP/Three.js tools |
| Necessary full 3D | Existing Blender installation |
| Media preparation, duration, output inspection | ffmpeg / ffprobe |

- Prefer one Remotion project over multiple engines. Combine tools only for a specific need.
- Use `installation/tools/manim/.venv/Scripts/python.exe` for Python preparation scripts.
- Run Manim through `installation/scripts/Render-Manim.cmd`; verify its referenced configuration exists before use.
- Use `installation/scripts/Start-LocalRemotion.cjs` for local Studio. Verify loopback binding and the actual project URL. Do not assume a port is free.
- Update project README commands when implementation changes. Do not document missing scripts as runnable.

## Production modes

### Education with the user's voice

Follow [narration](rules/narration.md), [motion](rules/motion.md), and [quality](rules/quality.md).

- Preserve blank optional brief fields as empty values. Do not replace them with guesses or placeholder content.
- The agent owns scene design, the visual explanation, and a simple teacher guide; the user supplies the topic and records naturally.
- Before requesting recording, deliver all scenes in a real interactive visual draft with explicitly provisional timing, plus the teacher guide.
- Generate `narration/RECORDING-SCRIPT.md` and `public/recording-guide.html` from one content source. Each scene needs its own complete study explanation, ordered speaking points, useful example, visual cue, outcome, and bridge.
- Keep explanations simple and sufficient; no required word count, tone presets, or verbatim-reading requirement. Review the whole narrative for a beginner and record actual corrections in `docs/NARRATIVE-REVIEW.md`.
- The compact-draft/flexible-duration mode is opt-in only when explicitly requested in the user's project instructions.
- Final timing follows actual audio, not the initial estimate. Never time-stretch speech, force a script onto delivery, or scale word cues by a duration ratio.

### Advertising

Follow [advertising](rules/advertising.md). A narration-free ad is a complete, valid mode: create a visual storyboard and on-screen copy, not a teacher guide or a request for narration.

Only in advertising, choose suitable duration, palette/style, and project name when those three inputs are blank. Preserve all other optional blanks. Explicit values always win.

## Narration and audio constraints

- The default handoff is original voice audio plus the actual transcript and short timed phrases, as a file or pasted SRT. Word-level JSON is optional, never mandatory.
- Validate file identity, timestamp units, ordering, overlaps, and bounds against the exact audio version. Correct clear spelling errors only in a working copy; preserve originals.
- SRT cue times are phrase-level unless genuinely word-level. Use valid phrase timing and preserved evidence; inspect only motion-critical ambiguous boundaries. Report missing precision instead of inventing timestamps.
- Do not rerun full transcription when provided material is sufficient. Keep cached timing evidence when the audio is unchanged.
- Consult [audio-tool inventory](installation/AUDIO-TOOLS.md). The user removed PyTorch, Transformers, and the Persian Wav2Vec2 model. Do not reinstall them or download replacement recognition/alignment models without an explicit request.
- Do not generate, clone, or convert the user's voice without an explicit request. Preserve natural pauses, breaths, speed, and pitch.
- Visible subtitles, background music, and SFX require explicit authorization; an input SRT is not authorization to burn subtitles into video. Existing project authorization persists.
- Do not claim direct listening, pronunciation approval, or human review based only on technical measurements.

## Implementation and Persian text

- Read [code-based visual implementation](rules/code-motion.md) and the relevant engine skill before coding.
- Give each scene a clear responsibility. Centralize design tokens, keep timing data authoritative, and share only genuinely repeated components.
- Animation must be deterministic, frame-driven, and seekable. No wall-clock animation or unseeded randomness.
- Default output is 1920 x 1080 at 30 fps unless specified. Keep text readable at the intended display size.
- Use local Vazirmatn fonts with license provenance. All text files are UTF-8.
- Persian prose and headings in files/UI must explicitly use RTL and right alignment, including paragraphs that begin with English. Isolate only inline English letter order with `bdi dir="ltr"`; reserve LTR blocks for standalone code/commands. Do not use `dir="auto"` or first-character detection.
- Persian read-aloud Markdown may use an RTL/right-aligned HTML wrapper with real heading/paragraph elements. Chat replies use plain text or standard Markdown, not HTML wrappers.

## Preview, approval, and final export

- Run relevant type checks, representative stills, layout/text review, and actual interactive playback/audio checks. Record results and limits; fix issues in scene code.
- Educational delivery needs a complete audiovisual preview with actual supplied narration. Clearly label any partial-voice draft.
- Handoff includes version, duration, dimensions, known incomplete items, working player and guide URLs, the MD guide link, and restart commands. Discover the guide's real served URL; never guess a static prefix.
- Stills and storyboards supplement the player; they do not replace it.
- Do not export any video, including a low-resolution review video, publish, or upload until the user explicitly approves the viewed version and requests that export. Separate explicit authorization is required for a review-video exception.
- Record approval and the exact version in `docs/REVIEW.md`. Material changes require renewed preview approval. Silence or approval of one frame/voice sample is not final approval.
- Final default: H.264, CRF 19, yuv420p, BT.709, limited color range. Run ffprobe and save `media-info.json`, timing and render settings with the versioned output.
- Continue independent implementation autonomously; only export-dependent work waits for the applicable approval.
