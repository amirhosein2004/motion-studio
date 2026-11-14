# Project structure and asset lifecycle

## Chosen layout

Use separate areas for code, source media, and generated output, joined by one stable project ID:

```text
workspace/
  projects/<project-id>/       Editable implementation and production decisions
  assets/<project-id>/         Original inputs and media
  renders/<project-id>/        Generated QA and approved exports
```

This is the standard for this multi-project workspace. A self-contained folder with code, assets, and renders can also work for a small independent project. The important properties are clear ownership, reproducible preparation, portable paths, and a reliable backup; no single directory layout is universal.

Retain the existing roots to preserve current paths. Do not migrate old projects as a side effect of updating the rules.

## One project ID

- Use the same ID across `projects`, `assets`, and `renders`.
- Prefer a stable lowercase ASCII slug, optionally with a creation date.
- The folder ID is technical metadata; do not use it to populate an optional blank project-name field.
- Retain original media filenames, including Persian names. Use stable runtime IDs such as `VO_01.wav` through an explicit mapping.
- Use semantic voice/scene IDs rather than relying on file-list order. One voice may cover multiple shots, and one scene may contain multiple voices.

## Source assets

**All incoming voice recordings, audio, transcripts/SRT, images, footage, fonts, and references for a motion belong in its asset folder.**

```text
assets/<project-id>/
  audio/
    voice/                    Original recordings and replacement takes
    sfx/                      Original sound effects
    music/                    Only with authorization
  transcripts/                Original TXT/SRT/JSON supplied by the user
  images/                     Images, logos, source SVG
  video/                      Source footage
  fonts/                      Fonts and license files
  references/                 Look/motion references and related notes
```

Create only categories in use. Older folders such as `narration/` and `sfx/` remain valid for existing projects until an explicit migration.

For each input:

1. Preserve its bytes and original name in assets; never overwrite a previous take.
2. Record source path, role, permission/license status, and useful hashes/metadata in the project's `ASSET-SOURCES.json`.
3. Measure or inspect the file before use. Do not infer its role or license from its name.
4. Prepare a browser-ready copy only if needed. Keep gain, conversion, trim, and other processing reproducible and recorded.
5. Map the source to its runtime filename. Never make Downloads/Desktop the permanent project dependency.

An optional `assets/_shared/` can hold reusable licensed fonts or sounds. Projects must still identify the source/version and stage the needed copies locally. Do not create a shared library simply to duplicate every project asset.

## New Remotion project

```text
projects/<project-id>/
  project.json                Stable ID, engine, relative paths, output format
  package.json
  package-lock.json           When a real local npm install is used
  tsconfig.json
  README.md                   Actual working commands and URLs
  ASSET-SOURCES.json
  src/
    index.ts
    Root.tsx                  Composition registration
    Video.tsx                 Scene assembly
    chapters/
      S01.tsx
      S02.tsx
    scenes/                   Genuinely shared scene elements
    design.ts                 Color, type, spacing, motion tokens
    quality.ts                Optional executable checks/constants when useful
    assets.json               Runtime asset references
    timeline.json             Generated/measured timing
  narration/
    guide.json                Shared teacher-guide content
    RECORDING-SCRIPT.md       Generated Persian teacher guide
    transcripts/              Corrected working copies, not the source archive
    alignment.json            Validated phrase/word cues and uncertainty
  public/
    audio/                    Prepared voice playback
    sfx/                      Prepared SFX, when authorized
    assets/                   Required images, SVG, or video
    fonts/                    Runtime fonts and license
    recording-guide.html      Generated teacher-guide page
  scripts/
    prepare.py                Measure audio and generate timing; no synthesis
    python.mjs                Launch the designated workspace Python
    prepare-assets.mjs        Optional reproducible staging when needed
    qa-stills.mjs             Representative stills
    verify.py                 Relevant delivery verification
    render.mjs                Approved export and ffprobe, only when implemented
  docs/
    BRIEF.md
    STORYBOARD.md
    NARRATIVE-REVIEW.md        Educational review
    REVIEW.md                 Version, results, feedback, approval
```

This is a responsibility map, not a request to create empty demo files. Use the actual engine's appropriate equivalents. Do not add a lockfile for an untouched dependency junction, and do not claim an optional script exists until implemented.

## Path manifest

New projects should keep their three roots explicit. Minimal example; it is not an existing project's configuration:

```json
{
  "schemaVersion": 1,
  "projectId": "lesson-example",
  "engine": "remotion",
  "paths": {
    "assets": "../../assets/lesson-example",
    "renders": "../../renders/lesson-example",
    "public": "public"
  },
  "video": {
    "width": 1920,
    "height": 1080,
    "fps": 30
  }
}
```

Resolve paths relative to `project.json`/the project root, never the caller's working directory. Read format settings from one authoritative configuration when generating the timeline and composition metadata; avoid conflicting copies.

Do not add this manifest retroactively unless the existing scripts are deliberately integrated with it. A decorative manifest that code ignores does not improve reproducibility.

## Runtime copies versus originals

`public/` must remain with the project's Remotion package/configuration. Components use relative `staticFile()` references to staged assets. Browsers cannot play arbitrary source files outside the served tree.

Source originals in `assets/` are the archive; `public/` contains only what the preview/export needs, including reproducible derivatives and local fonts. Record intentional copies rather than maintaining two unrelated editable masters.

Do not introduce a filesystem junction from `public/` to all source assets by default: it can expose unused media and make bundling/portability dependent on external paths. Existing dependency junctions are a separate concern.

## Versioned outputs

For new projects, use an explicit review/export version:

```text
renders/<project-id>/<version>/
  qa/                         Approved QA stills/contact sheets
  reports/                    Layout, timing, audio, and verification reports
  TIMELINE.md
  render-settings.json
  media-info.json             After an authorized video export
  <name>-1920x1080.mp4         Only after approval and render request
```

Before video approval, only authorized non-video QA/report artifacts belong here. Version labels may be semantic or numbered; record the same label in `docs/REVIEW.md`. Do not overwrite an approved export when making a revision.

Existing output layouts, including `qa/<version>/`, are preserved.

## Portability and backup

- Document exact engine/package versions and actual commands; keep preparation scripts with code.
- Back up the code/production notes and original asset folder together. A copy of `projects/` alone is not a complete project archive.
- Preserve approved exports/reports as deliverables. Dependency caches and temporary build bundles are reproducible and are not source assets.
- Runtime derivatives can be regenerated only when the sources, fonts/licenses, mappings, and processing settings are retained.
- A deliberate handoff to another machine must include the linked asset root and instructions for regenerating/staging runtime copies.

## Existing-project migration

Move media only for an explicit migration request. First inventory affected paths, preserve originals/backups, then update scripts, asset manifests, runtime references, and READMEs together. Verify hashes, audio duration, seeking, visuals, and existing output paths before retiring an old location. A documentation update alone is not migration authorization.

## References

[Remotion importing assets](https://www.remotion.dev/docs/assets) and [staticFile](https://www.remotion.dev/docs/staticfile) define the runtime serving boundary. The [Cookiecutter Data Science layout](https://cookiecutter-data-science.drivendata.org/#directory-structure) is an example of immutable source data separated from generated results and code; it is not a mandate for video folder names.
