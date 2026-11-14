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

Do not use every technique in every scene. Start with the brief, asset availability, and explanation; add complexity only for a concrete purpose.

## Implementation sequence

1. Inspect the existing project, media, paths, dependency versions, and applicable skill. Preserve changes outside the requested scope.
2. Record which technique serves which shot in the brief/storyboard.
3. Implement the actual scene and its progressive states. Give each scene a clear responsibility; share only genuinely repeated components.
4. Centralize colors, typography, spacing, and motion tokens in `design.ts`; keep authoritative timing in generated timeline/cue data.
5. Keep animation deterministic, frame-driven, and seekable. Perform expensive media measurements/preparation outside the per-frame rendering path.
6. Stage only required runtime copies in project `public/` and reference them with the engine's supported asset mechanism.
7. Check typography, RTL/LTR, bounds, clearances, moving states, playback, seeking, and applicable audio. Fix defects in code and record evidence/limits.

Use existing tools, authored graphics, and suitable supplied/licensed assets. Do not install new skills or invoke external image/video generation models unless explicitly requested. Do not silently modify bundled starters.

If an asset can reasonably be authored as SVG or code, do that within the brief. If a genuinely necessary source is missing, identify it precisely while continuing independent work. Do not present a static image as freely rotatable 3D, or describe an unimplemented rig/animation as complete.

Read [capability choices](MOTION-CAPABILITIES.md), [project structure](project-structure.md), and [quality](quality.md). Existing projects are not automatically redesigned, and none of these rules grants video-export approval or permission to add subtitles/music/SFX.
