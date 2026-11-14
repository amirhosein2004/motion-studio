# Implement visual capabilities in code

These rules apply to educational and advertising motion. A list of suggested effects or a storyboard alone does not satisfy an implementation request.

## Select purposeful techniques

| Technique | Implementation responsibility |
|---|---|
| Typography | Readable type scale, selective emphasis, appropriate entry cue |
| Color/layout | Central design tokens, semantic roles, grouping, consistent spacing |
| Shapes/icons | Authored or appropriately licensed SVG/media with a clear conceptual role |
| Easing/springs | Controlled movement and settling linked to the shot purpose |
| Masks/reveals | Progressive introduction that finishes fully visible |
| 2D depth | Clear layers/parallax without covering information |
| UI/product shots | Real supplied evidence or accurate UI built with code |
| Characters/3D | Real prepared layers, geometry, and rigs appropriate to the promised motion |

Do not use every technique in every scene. Start with the brief, asset availability, and explanation; add complexity only for a concrete purpose. Deliver the implemented result in the real preview — never a suggestion list, capability table, or storyboard as a substitute for scene code.

## Skill responsibilities

Load only the skill relevant to the current task. Workspace instructions, consent rules and the project brief take precedence over skill defaults.

| Installed skill | Responsibility |
|---|---|
| `remotion-best-practices` | Implement Remotion compositions, scene motion, timing and media using its relevant linked guides |
| `frontend-design` | Advise the visual design of players, recording guides and UI scenes within the project's existing palette, fonts and teaching/offer requirements |
| `playwright` | Inspect real browser playback, controls, guide navigation, responsive layouts and screenshots |
| `pdf` | Inspect and extract PDF source material; create or check PDF documents when requested |

Appearance and browser skills do not select a new animation engine, replace the educational workflow, or authorize voice generation, models, subtitles, music, SFX or video export. Keep the original upstream skill files; record their source revisions in `.agents/skills/SOURCES.json`.

## Runtime versions and local tools

- Before choosing APIs or commands, inspect the selected project's `package.json`, lockfile when present, and actual installed package versions. A skill's version and examples are guidance; the project's installed runtime is authoritative. Verify that each proposed API exists in that version, and do not upgrade dependencies to match an example without an explicit user request.
- Resolve paths from the project or script location. Verify the actual tool executable and required dependencies for the current operation; use the designated workspace Python, installed browser and loopback Studio launcher from [workflow](workflow.md) Step 3. On Windows, run Bash helpers with an available Git Bash executable rather than assuming the WSL `bash.exe` is suitable.
- Use the project-local skill paths under `.agents/skills/`; global paths in upstream examples are not this workspace's installation paths. Put generated QA and reports under `workspace/renders/<project-id>/` per [project structure](project-structure.md).
- Installing a skill copies instructions and helpers; check optional runtime dependencies before using a helper. A missing dependency for an unrelated feature must not block independent work.

## Implementation sequence

1. Inspect the existing project, media, paths, dependency versions, and applicable skill. Preserve changes outside the requested scope; existing projects are not automatically redesigned.
2. Record which technique serves which shot in the brief/storyboard.
3. Implement the actual scene and its progressive states. Give each scene a clear responsibility; build a shared component only for genuinely repeated content.
4. Centralize colors, typography, spacing, and the motion tokens of [motion-quality](motion-quality.md) in `design.ts`; keep authoritative timing in generated timeline/cue data.
5. Keep animation deterministic and frame-driven per [motion-quality](motion-quality.md). Perform expensive media measurements/preparation outside the per-frame rendering path.
6. Stage only required runtime copies in project `public/` and reference them with the engine's supported asset mechanism.
7. Run type checks, the [motion-quality](motion-quality.md) visual QA gate, and play/pause/seeking checks. Fix defects in code, then report real changes and remaining limits.

## Assets, tools, and models

- Use existing tools, authored graphics (code/SVG), and suitable supplied/licensed assets with provenance recorded per [references](references.md). Do not install new skills, engines, or models without an explicit user request. This includes recognition/alignment and image/video generation models. If a genuinely necessary asset is missing, identify it precisely while continuing independent work.
- Do not present a static image as freely rotatable 3D, or describe an unimplemented rig/animation as complete. Real camera rotation requires geometry; articulated character motion requires a rig or prepared layers — and only when the brief needs them with suitable resources available.
- Do not silently modify bundled starters. Nothing here grants permission to modify previous projects or to add subtitles, music, SFX, or narration — those are consent rules in [AGENTS.md](../AGENTS.md). Video export stays behind the approval gate in [quality](quality.md).

Read [capability choices](MOTION-CAPABILITIES.md), [project structure](project-structure.md), and [quality](quality.md).
