# Advertising motion

Use this mode for ads, product/service promotion, and commercial launch films, according to the user's project instructions.

Follow [project structure](project-structure.md), [code implementation](code-motion.md), [motion quality](motion-quality.md), [references](references.md), and [quality](quality.md). Technical constraints and final-export approval still apply.

## Brief and blank fields

Use the actual offer, audience, benefit, proof, destination, brand, duration, and format supplied by the user.

Only in advertising, if duration, visual palette/style, or project name are blank, choose suitable values for those three and record the choices in the brief. Explicit values override automatic choices. All other optional blank fields stay blank.

Do not fabricate a discount, customer quote, statistic, product feature, performance guarantee, address, or proof.

## Deliverables

Create a visual storyboard and concise on-screen copy in `docs/STORYBOARD.md`, implemented in scene code and an interactive player. Do not create an educational teacher guide or require a human speaking script.

For an intentionally narration-free ad, a silent interactive preview is complete. Do not block it waiting for voice or a recording sample. If narration is explicitly requested later, use the user's own human recording and follow [recording-guide](recording-guide.md) for real-voice intake and timing. The no-synthetic-voice rule in [AGENTS.md](../AGENTS.md) applies to advertising too.

## Story and design

Use one clear message: a relevant hook, introduction, meaningful product/service demonstration, credible supplied proof/offer when available, and a clear action.

Keep copy short, natural, and readable. Preserve real brand/product information. Give each shot a message and a reason to lead into the next.

Show the benefit or mechanism with suitable typography, SVG, UI, imagery, easing, reveals, or 2D depth in the actual code. Do not add complexity, 3D, character animation, or new engines by default.

Timing comes from shot purpose, readability, transitions, and any requested duration; it does not depend on nonexistent speech. Use deterministic frame-based animation.

Persian copy still requires explicit RTL/right alignment and inline isolation of English identifiers.

## Audio and approval

Music, SFX, visible subtitles, and voice are opt-in. An attached sound file alone is not sufficient permission; use it according to the requested role.

Deliver a complete local player with play, pause, and seeking. State version, dimensions, duration, audio status, and real incomplete items. Record feedback and revisions.

Do not export, publish, or upload until the user explicitly approves the viewed version and requests the relevant action. After authorized video export, run ffprobe and save output/timing/settings reports with the approved version.
