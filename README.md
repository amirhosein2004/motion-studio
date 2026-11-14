# Code-based motion workspace

This workspace produces educational and advertising motion with code. Remotion is the main engine; Persian lessons use the user's own recordings and supplied timed transcripts.

For Git contents, a fresh clone, and machine-specific limitations, see [GIT-SETUP.md](GIT-SETUP.md). This repository includes source assets as well as code; installed applications, dependencies, generated previews, and renders are excluded.

## Recommended organization

Keep the existing three top-level production areas. They separate editable code, irreplaceable source media, and generated output. A single-folder project is also valid for a small standalone job; there is no universal directory layout that every studio must use. For this multi-project workspace, matching project IDs across the three areas is the chosen standard.

```text
installation/                  Installed tools, launchers, tool inventory
.agents/skills/                Available task-specific skills
rules/                        Shared production rules
workspace/
  projects/<project-id>/      Code, project config, guides, production decisions
  assets/<project-id>/        Original voice, SRT, sounds, images, other inputs
  renders/<project-id>/       Versioned QA, reports, approved final exports
```

**From now on, put all media needed for a motion in its project asset folder.** This includes original voice recordings, transcripts/SRT, SFX, images, reference files, footage, fonts, and music when authorized.

For example:

```text
workspace/assets/<project-id>/
  audio/
    voice/
    sfx/
    music/                    Only when requested
  transcripts/
  images/
  video/
  fonts/
  references/
```

Create only categories that contain real inputs. Keep originals unchanged. Runtime copies belong in the project's `public/`, with their provenance and preparation recorded in `ASSET-SOURCES.json`.

Read [the complete structure and asset lifecycle](rules/project-structure.md) for the project tree, path manifest, versioned outputs, backup, and migration rules. Existing videos and their working paths have not been moved.

## Which document does what?

| Document | Role |
|---|---|
| [AGENTS.md](AGENTS.md) | Agent operating contract and non-negotiable workspace defaults |
| [rules/README.md](rules/README.md) | Index to detailed production rules |
| [MOTION-CAPABILITIES.md](rules/MOTION-CAPABILITIES.md) | Capability choices and their implementation/asset requirements |
| A project's README | Its actual commands, URLs, dependencies, and current limitations |
| [Audio-tool inventory](installation/AUDIO-TOOLS.md) | Current installed/removed audio tools |

Shared instructions are English. Persian educational copy, teacher guides, and video text remain Persian.

## Production modes

Educational work follows the supplied brief and the user's natural recordings. Compact review drafts with explicitly flexible duration are enabled only when requested in the project instructions. Optional blank brief fields stay blank.

Advertising requests use [advertising rules](rules/advertising.md). Advertising does not inherit the educational teacher-guide/narration requirement.

## Working sequence

1. Establish the brief, learning objective or offer, source provenance, and stable project ID.
2. Implement the actual scenes and a local interactive visual draft.
3. For education, deliver the simple teacher guide as both MD and HTML, generated from one source.
4. Receive original voice plus transcript and short timed phrases/SRT. Validate the input and update scene durations and visual cues.
5. Review the complete interactive preview, including real audio. Fix meaning, layout, pacing, and technical issues.
6. After explicit approval of that version and a render request, export the final video and ffprobe reports.

An input SRT is timing data; it does not automatically enable visible subtitles. Music and SFX are also opt-in, with existing project authorization preserved.

## Run an existing project

Use its own README and package scripts. The projects present in this checkout are:

- [LLM explained](workspace/projects/llm-explained-20261114/README.md)
- [Network illustrated](workspace/projects/network-illustrated-20261106/README.md)

For the LLM project, from the repository root:

```powershell
Set-Location -LiteralPath 'workspace/projects/llm-explained-20261114'
npm start
npm run check
npm run qa
```

`npm start` uses [the local Remotion launcher](installation/scripts/Start-LocalRemotion.cjs). For this project the Studio composition is `http://localhost:3126/LLM-Explained`; check the running Studio output for the actual URL and port. Its simple player and guide use a generated static prefix; see the project README to discover the current URLs.

The network project also provides `npm run timeline` to rebuild its provisional scene timing. Do not run a render command until approval exists. Some existing projects have no final-render script yet; do not assume one is available.

Dependencies may be linked to an installed starter through a project-local junction. Do not edit the starter's files. Preparation scripts use:

```text
installation/tools/manim/.venv/Scripts/python.exe
```

## Available engines

| Tool | Location | Intended use |
|---|---|---|
| Remotion | `installation/tools/remotion/` | Primary video implementation and preview |
| Manim / Python environment | `installation/tools/manim/.venv/` | Mathematics and Python preparation scripts |
| Motion Canvas | `installation/tools/motion-canvas/` | Isolated vector effects |
| GSAP / Three.js | `installation/tools/web-motion/` | Web motion and necessary lightweight 3D |
| Blender | `installation/tools/blender/` | Necessary full 3D |
| ffmpeg / ffprobe | System PATH | Media preparation, duration, final verification |
| Node.js | System PATH | JavaScript runtime; project dependencies are local/linked |

The Manim launcher currently refers to `installation/config/manim.cfg`, which is absent in this checkout. Verify or repair that configuration before a Manim job; the launcher is not claimed to be validated. No missing configuration or old checkpoint has been recreated by this documentation update.

PyTorch, Transformers, and the Persian Wav2Vec2 model were removed at the user's request. Use supplied timed transcripts; do not reinstall models automatically. See the audio inventory for the precise status.

## Quality and reproducibility

Use one design system, intentional visual hierarchy, progressive explanation, and phrase-based timing. Keep source inputs immutable, preparation reproducible, and QA/report artifacts versioned. Preserve actual voice speed and pauses. Test seeking, transitions, and audio after timing changes; report any checks that could not be performed.

Read [quality and approval rules](rules/quality.md). Normal delivery is an interactive preview, not an automatically exported MP4.

## Focused skills

Core: `remotion-best-practices`, `visual-design-foundations`, `reference-to-motion`, `motion-effects`, `file-conversion`, `code-review-excellence`.

Optional by task: `brand-intake`, `animated-chart`, `data-storytelling`, `reel-export`, `vox-explainer`, `business-motion-film`, `launch-video`, `title-sequence-3d`.

The 14 available skills are in `.agents/skills/`. Availability is not automatic activation; use only the relevant skill and honor the brief.

## Technical references

- [Remotion: importing assets](https://www.remotion.dev/docs/assets) and [staticFile](https://www.remotion.dev/docs/staticfile) document browser-ready files in project `public/`.
- [Cookiecutter Data Science: directory structure](https://cookiecutter-data-science.drivendata.org/#directory-structure) illustrates separating raw inputs, generated artifacts, and source code in a reproducible workflow. It is an example of the separation principle, not a motion-industry mandate.
