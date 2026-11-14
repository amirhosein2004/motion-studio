# Motion capabilities

This is a planning reference, not a list of mandatory effects or permission to install tools. Start from the explanation or offer, then choose only the capabilities that help the viewer understand it.

## Choose by communication need

| Capability | Useful result | Existing implementation path | Required input | Completion evidence |
|---|---|---|---|---|
| Typography | Clear hierarchy and emphasis | Remotion, CSS, local Vazirmatn | Accurate short copy | Readable text at the target display size |
| Layout and color | Consistent grouping and focus | Central tokens in `design.ts` | Brief/reference or documented palette | No collisions, clipping, or unexplained color changes |
| Diagrams and icons | Visible roles and relationships | Authored SVG and scene code | Correct mechanism and labels | The viewer can follow source, destination, and result |
| Easing and transitions | Natural arrivals and continuity | Frame-driven Remotion interpolation/springs | Shot purpose and cue | Deterministic seeking and appropriate settling time |
| Progressive explanation | One new idea at a time | Separate scene/shot components | Learning steps and supplied narration | Important changes follow the related phrase |
| Data visualization | Explain a real comparison or trend | SVG/chart code, animated-chart when relevant | Exact values, units, source | Every value and scale remains correct |
| Code and simulated UI | Explain execution or product behavior | React/SVG/code components | Real syntax, states, or product evidence | Correct behavior and readable details |
| Masks and reveals | Introduce an object or connect shots | SVG/CSS masks driven by frames | A reason to reveal progressively | Content settles fully visible and legible |
| 2D depth | Separate planes and guide attention | Layers, gentle parallax, restrained camera moves | Suitable layers | No hidden text or distracting perpetual motion |
| Image/footage composition | Add relevant real-world context | Remotion media components | Supplied/licensed source media | Correct crop, resolution, aspect ratio, and provenance |
| Simple 2D character | A limited gesture or expression | Layered authored SVG | Suitable layers and defined poses | Actual gesture implemented in the player |
| Advanced character | Articulated motion | Existing supported tooling only when needed | A real rig or prepared pose assets | Required joints/poses exist and animate correctly |
| Lightweight 3D | Show rotation, space, or product form | Existing Three.js setup | Real geometry/model and materials | Rendered geometry, lighting, and camera work |
| Full 3D | Complex physical or character shots | Existing Blender installation | Model, rig, animation, and suitable render resources | A real implemented shot, not a descriptive promise |
| Sound design | Reinforce an authorized visual event | User-provided SFX plus frame-based cues | Explicit authorization and source audio | Measured headroom, restrained mix, correct event timing |
| Format adaptation | Reframe for the destination | Shared scene code with layout variants | Required aspect ratio and safe areas | Composition is reflowed, not blindly cropped |

Use the primary Remotion workflow for general educational content. Use Manim for genuinely mathematical construction, not merely because Python is available. Additional engines should solve an identified need.

## Asset intake

Original media belongs in `workspace/assets/<project-id>/`:

- Voice recordings and authorized sounds: `audio/voice/`, `audio/sfx/`, `audio/music/`.
- User transcripts and SRT files: `transcripts/`.
- Source images and SVG files: `images/`.
- Footage: `video/`.
- Source fonts and their licenses: `fonts/`.
- Look/motion references and notes: `references/`.

Copy only necessary browser-ready derivatives to project `public/`. Preserve originals and record the mapping, license status, and processing. See [project structure](project-structure.md).

## Professional design baseline

The design baseline (focal point per beat, consistent scale, labels near objects, stable visual meaning, readable motion and holds, whole-review discipline) is owned by [motion quality](motion-quality.md) — read it together with this table.

## Capability is not authorization

A reference image is inspiration unless direct asset use is authorized. An attachment does not automatically permit background music, SFX, voice conversion, or visible captions.

AI image/video generation, new skills, and external media-generation models are not part of the default workflow. Use existing code, SVG, and suitable supplied/licensed media. If generation is explicitly requested later, preserve source/version information and review the actual output.

A raster image with a 3D look remains a flat image. Real camera rotation requires geometry; controlled character articulation requires a rig or prepared layers. Do not promise capabilities that the delivered scene does not implement.

## Delivery standard

Implement the chosen capability in scene code and the real preview. Describe its use in the brief/storyboard, run relevant checks, and record limitations in the review. A capability table or storyboard alone is not a completed motion.

Follow [code implementation](code-motion.md), [motion quality](motion-quality.md), and [quality](quality.md). Final video export still requires approval of the viewed version and an explicit render request.
