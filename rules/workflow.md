# Workflow — steps 0 to 7

The sequence for one motion project. [rules/README.md](README.md) indexes the rules; each step links the file that owns its details, and this file owns only the sequence and the rules with no other home. Education with the user's voice is the default mode. Advertising follows [advertising](advertising.md) and skips the guide/narration steps.

## Modes and duration policy

- **Standard education mode:** the user records the narration; the guide and intake follow [recording-guide](recording-guide.md).
- **Compact-draft / flexible-duration mode:** opt-in — active only when the user's project instructions request it. The prompt-builder form («زمان منعطف») is such a request. It has two timing stages:
  - **Stage A — compact visual draft:** every scene and essential concept reviewable at natural motion speed, without long narration pauses. Its timing is explicitly provisional.
  - **Stage B — voice-synced version:** scene lengths and internal cues re-timed from the real recording.
- **Duration policy** (the single home of every duration rule):
  - A target duration plans scope only; it never forces faster speech, lost essential coverage, or compressed reading time.
  - If the target is blank, propose an approximate range from content volume, audience prerequisites, examples, natural pauses, and visual comprehension time — then continue. Never ask the user to choose a duration.
  - Report draft duration and final-version estimate separately; the final version may end up shorter or longer than the target.
  - An explicit hard cap resolves a real scope conflict before recording: surface the conflict instead of speeding speech up or cutting essential content.
  - One coherent video is the default; splitting into parts only when genuinely necessary.

## Step 0 — Input triage (before any design)

Read the supplied material as raw input, then create `docs/INPUT-TRIAGE.md` recording, with a reason per item:

- What was kept as-is.
- What was dropped because it duplicated other input or was off-topic.
- Each weak example and the stronger example that replaces it. **Supplied examples are material, not requirements:** an example that does not serve the learning goal is replaced with a better one and reported here.
- Everything the user marked as «حتماً بماند» (must keep) — these are never removed or replaced.

This step is not a stopping point: record the decisions and continue to Step 1.

## Step 1 — Content and learning path

- Read [AGENTS.md](../AGENTS.md), [rules/README.md](README.md), and the rules linked from the current and next steps before planning.
- Extract topic, real questions, prerequisites, examples, and the learning outcome. Keep blank optional fields blank; the only automatic-choice exceptions are the three listed in [advertising](advertising.md). Ask only for essential missing information and continue working meanwhile.
- Preserve facts, numbers, and real claims; verify corrections against appropriate primary sources; invent no quotations or statistics. Choose a simple, accurate title.
- Keep the path continuous: problem → prerequisite → definition → concrete example → mechanism → result. Define each term before use, bridge into every next topic, fix ambiguous references, unanswered questions, and conceptual jumps, and keep one example and naming scheme as far as useful.
- Preserve essential concepts and the answers to the real questions; trim margin and repetition.

## Step 2 — Teacher guide and visual mapping

- Produce the guide in the two required outputs from one content source, exactly per [recording-guide](recording-guide.md) (template, HTML requirements, beginner review).
- For each important phrase/beat, record the mapping contract in `docs/STORYBOARD.md`: scene/shot and VO IDs; the supplied phrase or a clearly labeled semantic paraphrase; the learning objective (or advertising shot purpose); previous state, implemented visual change, resulting state; actual/provisional cue with evidence and uncertainty; the responsible scene component. Timings stay provisional until the recording exists.

## Step 3 — Build the motion in code

- Structure the project per [project-structure](project-structure.md); implement scenes per [code-motion](code-motion.md); meet the measurable quality bar in [motion-quality](motion-quality.md); apply [persian-rtl](persian-rtl.md) to every Persian string.
- Environment: tools and launchers stay under `installation/`; never modify bundled applications. Keep dependencies project-local; an existing dependency junction is acceptable without editing its target. Do not install new skills, engines, or models without an explicit user request. Apply the skill roles, installed-version checks and local tool/path requirements in [code-motion](code-motion.md).
- Update the project README's commands when implementation changes; never document a missing script as runnable.

| Work | Default tool |
|---|---|
| General, technology, or programming education | Remotion |
| Pure mathematical explanation | Manim |
| Isolated vector intro/effect | Motion Canvas |
| Web animation or necessary lightweight 3D | Existing GSAP/Three.js tools |
| Necessary full 3D | Existing Blender installation |
| Media preparation, duration, output inspection | ffmpeg / ffprobe |

Prefer one Remotion project over multiple engines; combine tools only for an identified need. Use `installation/tools/manim/.venv/Scripts/python.exe` for Python preparation; run Manim through `installation/scripts/Render-Manim.cmd` after verifying its referenced configuration; use `installation/scripts/Start-LocalRemotion.cjs` for local Studio, and verify loopback binding and the actual project URL before relying on any port.

## Step 4 — Interactive draft delivery (before requesting recording)

- Deliver the Stage A draft: a real local player with play/pause/seek, all scenes with real motion, provisional timing, and the guide alongside. Name this voice-less version «پیش‌نویس تصویری».
- **Preview type** comes from the brief: a simple player, or — when requested — a chaptered player with jumps to each sequence.
- Scene lengths and internal cues read from central timing data so changing one scene shifts later scenes automatically; keep internal motion offsets independently adjustable rather than hard-coding them as percentages of scene length.
- The delivery message links all three: `narration/RECORDING-SCRIPT.md`, the actual served `recording-guide.html` URL (discover it from the running server; never guess a port or static prefix), and the player URL — plus version, provisional duration, dimensions, incomplete items, and a restart command.
- No video file and no synthetic voice at this stage. Continue independent work while waiting for the recording.

## Step 5 — Sync with the real voice

Intake, alignment, and audio-preservation rules live in [recording-guide](recording-guide.md); audio checks in [quality](quality.md). Sequence: measure the real files → align the actually spoken text to the audio (never equal-divide) → regenerate the timeline from verified cues → retime scene lengths and internal cues → shift later scenes → re-review meaning and continuity. Adjust material to the real narration — add a needed step, example, or shot when an explanation grew; reduce dead holds when it shrank — instead of uniformly slowing the visuals or freezing them.

## Step 6 — Full preview review

- Run relevant type checks and required sample frames; execute the mandatory visual QA gate from [motion-quality](motion-quality.md) and record it in `docs/VISUAL-QA.md`.
- Verify the complete version plays all scenes with real audio at target dimensions and that play/pause/seeking and transitions work, wherever browser tools allow. Technical file checks are not listening or pronunciation approval.
- Handoff per [quality](quality.md): version, actual duration, dimensions, limitations, working URLs, restart command.
- Apply feedback and re-deliver. If the location of an issue is unclear, ask only about that time or phrase. Fix existing timing and silences first; request re-recording only of the affected passage when that is insufficient. Report briefly during work; do not wait for approval on routine execution decisions — only approval-gated work waits.

## Step 7 — Render and handoff only after approval

- The export gate in [quality](quality.md) applies: no video file — test or low-resolution review outputs included — before the user approves the viewed version and explicitly requests that export. Record approval and the exact version in `docs/REVIEW.md`; a material later change needs renewed preview approval.
- After the explicit render request for the approved version: render without repeated questions, run ffprobe, save `media-info.json` and render settings, and deliver the versioned package listed in [quality](quality.md).
