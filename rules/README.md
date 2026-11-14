# Production rules

These are the shared defaults for code-based educational and advertising motion. Read [AGENTS.md](../AGENTS.md) first (index, reading order, consent rules), then start projects with [workflow](workflow.md) and read the rules each step links. Explicit user requirements take precedence, subject to platform and safety rules.

| Rule | Read when | Main responsibility |
|---|---|---|
| [Workflow](workflow.md) | Starting or sequencing any project | Steps 0–7, input triage, modes, duration policy, delivery and approval sequence |
| [Project structure](project-structure.md) | Creating a project, receiving assets, changing paths | One project ID; code, originals, runtime copies, versioned outputs |
| [References](references.md) | Links, attachments, source media | Intended use, provenance, original preservation |
| [Recording guide](recording-guide.md) | Educational guide, voice intake, SRT/timing | Natural spoken Persian, guide template and outputs, real-voice alignment |
| [Motion quality](motion-quality.md) | Planning shots, motion tokens, layout, visual QA | Measurable motion/layout defaults and the mandatory visual QA gate |
| [Code implementation](code-motion.md) | Building or changing scenes | Real scene code, skill roles, installed-version/local-tool checks, technique choice, asset/model boundaries |
| [Persian RTL](persian-rtl.md) | Any Persian text, UI, or guide | Explicit RTL, `bdi`, fonts, UTF-8 |
| [Motion capabilities](MOTION-CAPABILITIES.md) | Selecting visual techniques and required assets | Purposeful capabilities, implementation requirements, completion evidence |
| [Advertising](advertising.md) | An ad, product launch, or commercial | Visual offer/storyboard; no educational narration dependency |
| [Quality](quality.md) | Preview, revisions, approval, export | Review gates, handoff, audio checks, final-output gate |

## Shared boundaries

- Consent rules (no export before approval, no synthetic voice, subtitles/music/SFX opt-in) are stated in [AGENTS.md](../AGENTS.md) and detailed in the rules above.
- The compact-draft/flexible-duration mode is opt-in; its definition and the duration policy live in [workflow](workflow.md).
- Preserve optional blank brief fields. Advertising has only the three explicit exceptions described in its rule.
- New voice, audio, SRT, images, and other media go to `workspace/assets/<project-id>/` per [project structure](project-structure.md); stage necessary runtime copies in project `public/`.
- Record brief decisions in `docs/BRIEF.md`, input triage in `docs/INPUT-TRIAGE.md`, phrase/visual mapping in `docs/STORYBOARD.md`, narrative corrections in `docs/NARRATIVE-REVIEW.md`, frame QA in `docs/VISUAL-QA.md`, and review/approval in `docs/REVIEW.md`.
- Educational teacher guides are Persian and delivered as both MD and HTML from one content source per [recording-guide](recording-guide.md). Shared workspace instructions are English.
- A complete interactive preview is the review deliverable ([quality](quality.md)). Export only the explicitly approved/requested video version.
- Do not automatically migrate or redesign existing videos, or install tools/models, because the documentation changed.

Use [the capabilities reference](MOTION-CAPABILITIES.md) to select techniques; it does not override these production rules or authorize external media generation.
