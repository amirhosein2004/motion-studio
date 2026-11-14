# Production rules

These are the shared defaults for code-based educational and advertising motion. Read [AGENTS.md](../AGENTS.md) first, then the rules relevant to the task. Explicit user requirements take precedence, subject to platform and safety rules.

| Rule | Read when | Main responsibility |
|---|---|---|
| [Project structure](project-structure.md) | Creating a project, receiving assets, changing paths | One project ID; code, originals, runtime copies, versioned outputs |
| [Motion capabilities](MOTION-CAPABILITIES.md) | Selecting visual techniques and required assets | Purposeful capabilities, implementation requirements, and completion evidence |
| [Code implementation](code-motion.md) | Building or changing scenes | Real scene code and implemented visual capabilities |
| [Motion](motion.md) | Planning shots or changing timing/layout | Progressive explanation, visual meaning, deterministic animation |
| [Narration](narration.md) | Educational guide, voice intake, SRT/timing | Natural Persian, teacher understanding, actual delivery |
| [References](references.md) | Links, attachments, source media | Intended use, provenance, original preservation |
| [Advertising](advertising.md) | An ad, product launch, or commercial | Visual offer/storyboard; no educational narration dependency |
| [Quality](quality.md) | Preview, revisions, approval, export | Meaning, layout, audio, playback, evidence, final-output gate |

## Shared boundaries

- Preserve optional blank brief fields. Advertising has only the three explicit exceptions described in its rule.
- New voice, audio, SRT, images, and other media go to `workspace/assets/<project-id>/`. Stage necessary runtime copies in project `public/`.
- Compact review drafts with explicitly flexible duration are enabled only when requested in the user's project instructions.
- Input SRT provides timing; it does not authorize visible captions. Music, SFX, and synthetic narration are also opt-in. Honor authorization already given for the project.
- Do not automatically migrate or redesign existing videos or install tools/models because the documentation changed.
- Record brief decisions in `docs/BRIEF.md`, phrase/visual mapping in `docs/STORYBOARD.md`, narrative corrections in `docs/NARRATIVE-REVIEW.md`, and review/approval in `docs/REVIEW.md`.
- Educational teacher guides are Persian and delivered as both MD and HTML from one content source. Shared workspace instructions are English.
- A complete interactive preview is the review deliverable. Export only the explicitly approved/requested video version.

Use [the capabilities reference](MOTION-CAPABILITIES.md) to select techniques; it does not override these production rules or authorize external media generation.
