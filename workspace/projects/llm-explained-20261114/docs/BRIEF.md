# Production brief

- Project ID: `llm-explained-20261114`
- User-facing project name: ""
- Educational title: مدل زبانی چطور جواب می‌سازه؟
- Supplied color/style field: ""
- Audience: general public; Persian; conversational explanations.
- Destination: YouTube; noncommercial education; horizontal 16:9.
- Target duration supplied: `3` (unit absent). Working interpretation: approximately 3 minutes, not a hard ceiling. This assumption is disclosed to the user.
- Compact visual-draft mode: explicitly requested in the pasted project instructions.
- Visual draft: 110 seconds / 3300 frames. Narrated planning estimate: 170–220 seconds; not calculated from study-text length and not an audio constraint.
- Format: 1920 × 1080, 30 fps, from `project.json`.
- Human voice: not yet supplied. No narration synthesis, subtitles or music authorized. User explicitly authorized the six supplied SFX, then requested sound on missing beats, prettier shapes, a simpler interface and corrections to text overlap. Current version: `v3-clean-motion`.

## Learning responsibility

Answer what an LLM is, who trains it, how weight updates work, how tokens become numerical representations, how a Transformer generates text, what post-training adds, why ordinary inference is different from training, how search results enter context, and how generalization differs from an archive of saved answers. Define technical words before depending on them. Use only the supplied cook/recipe analogy. Other source analogies (student, exam, menu, Lego, flying cats) are omitted.

## Visual direction

The reference page and its poster were successfully inspected on 2026-11-14. The video itself was not watched. Reference used only for dark charcoal, pale/cyan blue, circuit connections, rounded layered technical forms, and restrained two-dimensional depth. No reference graphics copied into runtime. All illustrations are authored React/SVG. The optional style field stays empty; this is an implementation choice recorded separately.

## Implemented capabilities

- Frame-driven typography entrances and masks: reveal the learning step, not teacher notes.
- Central semantic color roles: blue = model/computation; mint = new context/output or completed correction; amber = error/limitation.
- Original SVG chip, numerical grid, attention network, web globe, cook symbol and data flows.
- Independent cue timestamps and scene durations in `src/timeline.json`. Later scene starts are cumulative; internal cues never scale with scene duration.
- Repeated components only for frame, panel, label, chip and actual directed data connections.
- Individual scene files and standalone scene compositions; all scenes also available in the complete player.

## Authorized v3 revision

All eight scenes use simplified hierarchy, a lighter panel treatment, more negative space and a shared original SVG icon / chip language. Header, main mechanism, result and footnote now occupy separate vertical regions. Token vectors are compact rows. The training/inference comparison uses a divider rather than nested cards. The recipe ingredients are new code-built shapes. Every visual cue has an intentional short audio accent; these do not turn reading holds into loops.

A separate local review player removes the Studio editing chrome for the user. It uses the same Video component and the same timeline/assets; full Remotion Studio remains available for implementation. The player uses an LTR coordinate wrapper for correct canvas placement; all Persian scene/UI prose explicitly remains RTL and right-aligned.

## Delivery boundary

Deliver the complete visual draft plus both teacher-guide formats before voice intake. Actual narration and transcript/short phrase timings remain required for the audiovisual preview. No video export before explicit approval of the viewed version plus an export request.
