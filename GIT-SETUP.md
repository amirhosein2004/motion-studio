# Repository contents and restore

Suggested repository name: `code-motion-studio`. Keep the repository private: it contains user briefs, original inputs, and third-party reference/SFX files whose public redistribution rights have not been established. No blanket open-source license is assigned to these materials.

## What belongs in Git

| Path | Contents |
|---|---|
| `workspace/projects/` | Both motion projects: scene code, configuration, package files, guides, timing, production notes, source mappings and required runtime assets |
| `workspace/assets/` | Original project inputs, SFX, fonts with licenses, briefs and references; retain original filenames and bytes |
| `rules/`, `AGENTS.md` | Shared production instructions |
| `.agents/skills/` | Existing local skill instructions and their supporting files |
| `installation/scripts/`, `installation/AUDIO-TOOLS.md` | Small launchers and the tool inventory, without bundled applications |
| `prompt-builder-motion*.html` | The two local brief builders |
| `README.md`, `GIT-SETUP.md`, `.gitignore`, `.gitattributes` | Repository documentation and tracking rules |

`.gitattributes` disables text conversion for original files under `workspace/assets/` and for binary media. Existing original inputs stay byte-identical in Git. Runtime copies in `public/` remain included so current previews retain their media without requiring a full preparation pass.

## What stays outside Git

- `installation/tools/`, Python virtual environments, `node_modules/`, and dependency junctions.
- `workspace/renders/`: QA stills, reports and any approved exports. Back up these deliverables separately.
- Generated `public/preview-bundle.js` files; the LLM project's `npm start` rebuilds its player bundle.
- Remotion/browser caches, temporary files, logs, `.playwright-mcp/`, local environment files and credential files.

No originals, installed applications, or render files are deleted by these rules. There is no Git LFS configuration: current source and runtime assets are small. Review future large recordings/video inputs before adding them; Git alone is not a backup of the excluded deliverables or tools.

## Restore a clone

Install Git, Node.js/npm, and the tools required by the selected operation. Run these commands from the cloned repository root:

```powershell
Set-Location -LiteralPath 'workspace/projects/llm-explained-20261114'
npm ci --ignore-scripts --no-audit --no-fund
npm run check
npm start
```

The LLM project has a committed lockfile and pinned packages. Its start command rebuilds the player and uses the included loopback launcher. Follow Studio's actual printed URL. The public URL prefix changes when the checkout path changes; do not reuse the old machine's static prefix.

For the network project, open a fresh shell at the cloned repository root:

```powershell
Set-Location -LiteralPath 'workspace/projects/network-illustrated-20261106'
npm install --ignore-scripts --no-audit --no-fund
npm run check
npm start
```

The existing machine uses a dependency junction for this older project; Git intentionally excludes it. A fresh clone installs dependencies locally. This project has no existing lockfile and some dependency versions are ranges, so its first fresh installation is not an exact dependency snapshot. Keep the lockfile produced by that installation if adopting it as the new baseline. Do not run `npm ci` in the older project until a lockfile exists.

## Machine-specific limits

- Prepared SFX and runtime fonts are included. Ordinary playback does not require the Python preparation environment.
- Rebuilding audio requires ffmpeg/ffprobe and the designated Python environment at `installation/tools/manim/.venv/Scripts/python.exe`, including the packages used by the preparation scripts. That environment is not part of Git. See `installation/AUDIO-TOOLS.md`; do not install recognition/alignment models automatically.
- LLM still QA accepts `CHROME_PATH` for an existing Chrome executable. Its current `qa:preview` script, and some older QA scripts, expect the workspace's installed browser. That browser is excluded; a clone needs the corresponding browser setup or a deliberate script update before those checks run.
- Some manifests retain historical absolute filenames as provenance. Runtime media are served from project-local `public/`. Older one-time migration scripts reference the original machine; do not rerun them over edited projects.
- `Render-Manim.cmd` references a missing `installation/config/manim.cfg`; the restore script references an absent historical checkpoint. Neither is a validated setup command for a fresh clone.
- A Git upload does not approve a video export. Existing preview/approval requirements remain in force.

## Connect an empty remote

The local repository uses branch `main`. After creating an empty private GitHub repository without an initial README, license or gitignore, use its actual URL as `origin` and push `main`. Never store an access token in a remote URL or project file. Authenticate with the existing GitHub CLI/credential manager.

For subsequent changes, inspect `git status` and `git diff`, stage the intended files, commit, then push. Check new asset sizes and the private repository setting before sharing project inputs.
