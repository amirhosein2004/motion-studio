# Motion and visual explanation

Build the explanation into the actual scene code. Follow [code implementation](code-motion.md), [narration](narration.md) for education, and [quality](quality.md).

## Meaning first

Map each important spoken phrase to a meaningful visual change: introduce, connect, highlight, move, compare, transform, or resolve. An icon related to the topic is not sufficient explanation.

Show object roles, origin/destination, direction, order, conceptual boundaries, and cause/effect. A send/execute/return explanation should show those steps in sequence, with execution at the destination before the result returns.

Preserve a coherent example across scenes where helpful. Use consistent visual meaning for colors, shapes, names, and values. Do not introduce a result before its explanation or imply an inaccurate mechanism.

## Beats and pacing

- A scene may span many seconds and contain multiple related shots. A recording segment is not necessarily one shot.
- Reveal information progressively rather than leaving one diagram static with an unrelated looping decoration.
- A hold is useful when the viewer needs to read or understand. Continuous movement is not a quality target.
- Align changes to actual phrases when narration exists. Before recording, label timings as provisional.
- For silent advertising, derive pacing from shot intent, copy readability, and the supplied duration.
- Do not enforce fixed shot counts or periodic scene changes.
- Compact review drafts with explicitly flexible final duration require an explicit request in the user's project instructions.

After delivery changes, revise scene duration and its internal cue mapping. Shifting later scenes is a timeline operation; scaling all internal cues by a duration ratio is not phrase alignment.

## Layout and hierarchy

Establish clear regions for heading, main explanation, labels, code/product details, and supporting note. Keep explanatory labels near their objects and longer teacher notes outside the video frame.

Use a stable spacing/type system, readable contrast, and one focal point per beat. Introduce hierarchy before adding decoration. Keep sufficient clearance throughout entrances, transitions, and moving states, not only at the final settled frame.

Review long Persian strings, inline English, code lines, and numbers. Reflow a composition for a new aspect ratio; do not assume that cropping a horizontal frame yields a usable vertical version.

## Motion mechanics

Use frame-driven easing and controlled springs with a clear entrance, travel, settling point, and exit when needed. Preserve continuity through shared elements rather than arbitrary scene changes.

Avoid wall-clock timers, CSS animations tied to real time, unseeded randomness, unnecessary perpetual motion, and expensive per-frame preparation. Playback, seeking, and export must represent the same deterministic frame.

Keep overlays, masks, and depth effects from covering important text. Use real geometry/rigs when claiming real 3D rotation or articulated character animation.

## Storyboard contract

For each important phrase/beat, record in `docs/STORYBOARD.md`:

- Scene/shot and VO IDs.
- Supplied phrase or clearly labeled semantic paraphrase.
- Learning objective or advertising shot purpose.
- Previous state, implemented visual change, and resulting state.
- Actual/provisional cue, evidence, and any uncertainty.
- Responsible scene component.

Correct the implementation and dependent transitions when narration changes. Review the section with its actual audio where possible; do not claim listening when only automated evidence is available.
