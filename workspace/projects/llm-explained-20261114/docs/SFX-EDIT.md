# SFX editing — v3-clean-motion

The user explicitly supplied six files and requested moving them out of Downloads into this project, trimming them and placing them in the motion. All six originals were moved to `../../assets/llm-explained-20261114/audio/sfx/`, preserving filenames and bytes. Pre/post-move SHA-256 checks matched. `INTAKE.json` records source identity and the completed moves.

| Role | Original filename | Used source seconds | Playback duration | Target sample peak |
|---|---|---|---|---|
| Scene entry | dragon-studio-simple-whoosh-382724.mp3 | 0–0.46 | 0.46 s | -23 dBFS |
| Token / UI selection | vadim_makes_sound-soft-app-button-tap-sound-2-547872.mp3 | 0–0.16 | 0.16 s | -26 dBFS |
| Data travel | u_f1ee7vf7na-blip-131856.mp3 | 0–0.29 | 0.29 s | -23 dBFS |
| Panel / source arrival | soundshelfstudio-ui-soft-glass-ping-526562.mp3 | 0–0.62 | 0.62 s | -24 dBFS |
| Suggestion / concluding beat | universfield-clear-bell-chime-487898.mp3 | 0–1.45 | 1.45 s | -23 dBFS |
| Short computation | samuelfjohanns-computer-processing-sound-effect-01-122131.mp3 | 0.14–1.50 | 1.36 s | -23 dBFS |

Edits are based on decoded signal activity: removed near-silent tails, preserved short useful decays and added millisecond fades. Processing is an excerpt from the original 9.528-second clip. No looping, speed or pitch changes. Runtime files are stereo 48 kHz PCM WAV; originals are never edited.

## Placement

48 short events across all eight scenes: soft entries, all 38 main visual cues, and two later response-fragment ticks. The audit identified 16 uncovered main cues in v2; quieter taps / blips now cover those cues, including context changes, token IDs, second-round generation, returned-source answer and limitation notes. Quiet reading holds remain quiet. The sound at a suggestion is a presentation cue, not a claim of verified correctness. Misconception/limitation notes receive soft taps rather than success chimes.

Events read the scene's named visual cues plus independent offsets and per-event volume. New explanatory accents use 0.6 gain; later response fragments use 0.42 gain. Later scene duration changes automatically shift later audio; this is not an assumed alignment to yet-unrecorded speech. Scene audio is included once through the common Frame, so standalone scene compositions contain the same sound design without duplicate tracks in the full video.

## Reproducibility and checks

`npm run prepare:sfx` reproduces runtime copies and provenance. `npm run audit:sfx` validates source hashes, non-silent PCM, bounds and the scheduled PCM mix peak. The measured mix peak is -23 dBFS with zero clipped samples. This is a conservative draft level, not a loudness/mastering approval. Listening and final balance with narration remain to be reviewed. No license document was supplied; no license was inferred from the filenames.

No music, narration, voice conversion or video export added. Version v3 needs its own user preview approval before any later export request can be fulfilled.
