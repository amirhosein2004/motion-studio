# Motion quality and visual explanation

The quality bar for scene motion, layout, and the mandatory visual check. Implementation duties and asset/model boundaries live in [code-motion](code-motion.md); the project sequence in [workflow](workflow.md).

Values marked **⚙ are proposed workspace defaults**. Centralize every one of them in `design.ts` as tokens and adjust per project only with a recorded reason in the brief/storyboard.

## Motion tokens (design.ts) ⚙

- Define the spring presets the project actually uses. Soft, snappy and low-overshoot are options to select when the scene needs them; no minimum number of presets or spring-driven moves is required.
- Keep a named list of allowed easings, including linear motion when constant speed explains the mechanism correctly; scenes use the project's defined tokens.
- Entrance duration range 0.4–0.7 s; emphasis moves are shorter.
- Stagger ≈ 3–6 frames at 30 fps.
- Every scene uses only these tokens — no ad-hoc durations or curves inline.

## Meaning first

Map each important spoken phrase to a meaningful visual change: introduce, connect, highlight, move, compare, transform, or resolve. An icon related to the topic is not sufficient explanation.

Show object roles, origin/destination, direction, order, conceptual boundaries, and cause/effect. A send/execute/return explanation shows those steps in sequence, with execution at the destination before the result returns.

Preserve a coherent example across scenes where helpful. Use consistent visual meaning for colors, shapes, names, and values. Do not introduce a result before its explanation or imply an inaccurate mechanism.

## One idea per shot ⚙

- One hero element per shot; at most ~5–6 simultaneous elements on screen.
- Clear hierarchy of size and weight before any decoration; one focal point per beat.
- Establish clear regions for heading, main explanation, labels, code/product details, and supporting note. Keep explanatory labels short and near their objects; longer teacher notes stay outside the video frame.

## Readability ⚙

At 1080p:

- Body text ≥ 40 px; headings ≥ 64 px.
- Safe margins ≈ 5% per side: 96 px horizontal, 54 px vertical.
- Reading time per label ≥ ~1.2 s plus 0.25 s per word, on top of any motion.
- Keep sufficient clearance throughout entrances, transitions, and moving states, not only at the settled frame. Keep overlays, masks, and depth effects from covering important text.
- Review long Persian strings, inline English, code lines, and numbers — real edge-case content, not short placeholders.
- Reflow a composition for a new aspect ratio; cropping a horizontal frame does not yield a usable vertical version.

## Beats and pacing

- A scene may span many seconds and contain multiple related shots; a recording segment is not necessarily one shot. Do not enforce fixed shot counts or periodic scene changes.
- Reveal information progressively rather than leaving one diagram static with unrelated looping decoration. A hold is useful when the viewer needs to read or understand; continuous movement is not a quality target.
- Align visual changes to actual phrases when narration exists. Before recording, label timings as provisional. For silent advertising, derive pacing from shot intent, copy readability, and the supplied duration.
- After delivery changes, revise scene duration and its internal cue mapping. Shifting later scenes is a timeline operation; scaling all internal cues by a duration ratio is not phrase alignment. (Sequence in [workflow](workflow.md) Step 5.)

## Continuity between scenes ⚙

- Carry a shared element between scenes when it preserves a useful conceptual connection. Use a direct cut when it clearly separates ideas or makes the explanation easier to follow; an element handoff is not mandatory at every boundary.
- Use gentle 2D camera work such as push-in or parallax when it reveals scale, relationships or focus. A fixed camera and a reading hold are valid when they serve the scene.
- Choose object, camera, entrance and exit directions from the depicted mechanism, origin/destination, spatial layout and continuity. Persian text remains RTL/right-aligned; RTL does not reverse physical motion, network request/response paths, axes or other domain conventions. Keep the chosen visual meaning consistent.

## Natural movement

- Use anticipation and settling where they fit the action. Constant-speed mechanisms may use linear motion; an immediate change or direct cut is valid when it communicates the event clearly. Holds exist for reading and comprehension.
- An effect is allowed only when it makes the explanation better understood — not because it looks good.
- Frame-driven easing and controlled springs with a clear entrance, travel, settling point, and exit when needed.

## Effect level and motion feel

The brief may set an **effect level** (مینیمال / متوسط / غنی) and a **motion feel** (آرام / پرانرژی / دقیق و فنی). When they are absent, choose suitable values from the content, and report the choice in the brief/storyboard.

## Determinism

Animation is deterministic, frame-driven, and seekable. Avoid wall-clock timers, CSS animations tied to real time, unseeded randomness, unnecessary perpetual motion, and expensive per-frame preparation. Playback, seeking, and export must represent the same deterministic frame.

## Visual QA gate (mandatory)

Before delivering any preview, sample the start, middle, and end frame of every important cue and check each against this list:

- Overlap and collisions between text/panels/objects
- Contrast and readable text size
- Safe-area margins (no clipping at edges)
- RTL/LTR direction and inline English isolation
- Overflow — nothing escapes the frame or its container

Fix the defects in scene code, then record the sampled evidence and remaining limits in `docs/VISUAL-QA.md`. Asserting "I checked" without the frame samples is not a pass.

## Storyboard contract

The phrase→visual mapping contract (fields, file, and provisional-timing rule) lives in [workflow](workflow.md) Step 2.
