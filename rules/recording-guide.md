# Recording guide, narration, and real-voice intake

This rule applies to educational videos with the user's own voice. Narration-free advertising follows [advertising](advertising.md). Mode selection and the duration policy live in [workflow](workflow.md).

## Natural spoken Persian

Write as a teacher explaining to one person: conversational, plain spoken Persian (عامیانهٔ رسا, not textbook prose), connected, and technically accurate. Do not turn a textbook outline into spoken headings, and do not offer tone presets.

Use familiar words and short connected sentences. Define necessary terms immediately, keep the same example/naming where useful, and give a reason for moving to the next topic. Questions must have a purpose and an answer. Avoid artificial excitement, repeated filler, forced slang, padded introductions, and unexplained compressed terminology.

Preserve code, identifiers, units, and real claims. Verify technical corrections through appropriate primary sources; never invent a quotation, result, or statistic.

## Responsibilities and initial delivery

The agent designs the teaching path, shots, code, and teacher guide from the user's raw material. The user does not have to write the scene plan or a full script; the agent never demands a verbatim reading or that the user race the draft.

Before requesting recording, deliver all scenes in a real local visual draft with play, pause, and seeking (per [workflow](workflow.md) Step 4), paired with this guide so the user understands the subject and can record naturally.

## One guide, two outputs

Use one shared content source, such as `narration/guide.json`, to generate:

- `narration/RECORDING-SCRIPT.md`
- `public/recording-guide.html`

Both must contain the same explanations, points, and examples. Use Persian headings and explicit RTL/right alignment per [persian-rtl](persian-rtl.md). Each scene gets a separate section with scene ID, title, and related VO ID, even when scenes share a recording.

Every scene section contains these eight items with these Persian headings:

1. **«اینجا دربارهٔ چی حرف می‌زنیم؟»** — one or two clear sentences.
2. **«چه سؤالی را جواب می‌دهیم؟»** — a real relevant question or problem, without manufacturing an unrelated one.
3. **«توضیح کامل این سکانس برای فهم مدرس»** — a separate, connected study explanation of what it is, how/why it works, essential definitions, and one useful concrete example; simple enough to understand in one reading. Complete means nothing necessary for understanding is missing; do not impose paragraph/word minimums or pad with repeated definitions, side details, or extra introductions. Write it for the teacher's understanding — not as read-aloud narration, a glossary, or «بگو/نشان بده» instructions. Preserve the source's technical accuracy and fix real errors after verification.
4. **«دربارهٔ این نکته‌ها به ترتیب حرف بزن»** — short complete points the teacher can expand naturally; each says what happens and how/why, not a bare term list.
5. **«مثال برای توضیح»** — a specific example when it helps.
6. **«تصویر چه کمکی می‌کند؟»** — roles of the parts, relationship/path, order of change, and the visible result; naming an icon is not enough.
7. **«آخر این بخش مخاطب چه چیزی بفهمد؟»** — one clear outcome.
8. **«ارتباط با سکانس بعد»** — what follows and why.

The full explanation is study material kept beside the speaking points — never a replacement for them, and never a memorized lecture. Teacher notes never appear in the final video. Study-text length is not voice duration and must not drive timing, forced reading, or alignment; the actually spoken text is the timing basis.

VO segments such as `VO_01` are complete, correctable semantic units: do not break a word or sentence across segments to ease recording. One VO may cover several shots, and one scene may contain several VOs.

## HTML guide requirements

The HTML guide shows the full content of the MD guide with local Vazirmatn, Persian RTL and right alignment, readable headings and spacing, a distinct block for each scene's study explanation, an anchor list linking to the scenes, and a link back to the player; it must stay readable on mobile. Discover its actual public URL from the running server; do not guess the port or static prefix. Verify in the browser that the page opens, fonts load, anchors work, and all sections are present.

## Beginner narrative review

Before delivering the guide, review the entire teaching path as a beginner:

- Is the central question clear and answered?
- Does each term have a definition before it is needed?
- Are roles, names, values, cause/effect, and singular/plural references consistent?
- Does each section follow from the previous one?
- Are examples, transitions, and the final conclusion sufficient?
- Is anything essential missing, repeated, or unnecessarily technical?

Fix actual problems and record concrete corrections/open issues in `docs/NARRATIVE-REVIEW.md`. Do not merely assert that the narrative is good.

## Audio and timed-transcript intake

The user's default handoff is original voice plus the actual transcript and short timed phrases, supplied as an SRT file or pasted SRT. Accept it directly; word-level JSON is optional, never mandatory.

1. Store the original recording in `workspace/assets/<project-id>/audio/voice/` and the original transcript/SRT in `transcripts/`. Preserve original bytes, filenames, and replacement takes.
2. Map recordings to semantic VO/scene IDs from content and the user's labels, not arbitrary directory order.
3. Prepare playback files in project `public/audio/`, retaining source-to-runtime mapping, checksums, measured duration, and any processing.
4. Measure the exact playback file; do not force its duration to an initial estimate.
5. Validate the transcript's audio version, timestamp format/units, chronological order, overlaps, and duration bounds. Standard SRT uses `HH:MM:SS,mmm`; JSON/other custom timestamps should state decimal seconds explicitly.
6. Keep corrections in a working copy under project `narration/`. Fix clear spelling without inventing speech, changing technical meaning, or silently retiming cues.
7. Use reliable phrase timings for the related visual events. A multiword SRT cue does not identify each internal word's timestamp. Inspect only ambiguous motion-critical boundaries when needed and report the remaining precision limit.
8. Record verified cues and their evidence/uncertainty in the alignment data and storyboard. Generate the timeline from those data; key motions follow their phrase cues, not a fixed percentage of scene length.

Accept natural equivalent phrasing, hesitations, and repetition. Flag only a real technical mistake, essential omission, or harmful continuity break; request rerecording only for the affected passage.

Do not rerun full transcription when the supplied input or unchanged cached evidence is sufficient. Never manufacture word times by equal division, word-count ratio, or arbitrary rescaling; if supplied times are missing or inconsistent with the same audio version, align the text to that audio and label uncertainty honestly.

After audio arrives, review meaning and continuity again, then revise the visual timing to match the actual explanation (see [workflow](workflow.md) Step 5). The teacher guide is never forcibly aligned as though it were the exact spoken transcript.

## Audio preservation and available tools

- Preserve speech speed and pitch; keep breaths and natural pauses.
- Silence detection (e.g. ffmpeg `silencedetect`) is an editing aid, not permission to remove quiet syllables or apply identical pauses at all boundaries.
- Any authorized trim/edit must use a natural boundary, preserve the original, record its location/duration, and update dependent cues.
- Use the user's own human recordings. Never synthesize narration, clone a voice or perform voice conversion, per [AGENTS.md](../AGENTS.md). Preparing a playback format copy must preserve the speaker, speed and pitch and follow the source-mapping rules above.
- The user removed PyTorch, Transformers, and the Persian Wav2Vec2 model. Do not reinstall these or download replacement recognition/alignment models automatically. Consult [audio-tool status](../installation/AUDIO-TOOLS.md).
- Technical decoding/signal checks are not direct listening, pronunciation approval, or human review.
- SRT input is for timing; visible subtitles, background music, and SFX are opt-in per [AGENTS.md](../AGENTS.md) consent rules.
