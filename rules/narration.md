# Educational narration and teacher guides

This rule applies to educational videos. Narration-free advertising follows [advertising](advertising.md).

## Natural Persian

Write as a teacher explaining to one person: conversational, connected, and technically accurate. Do not turn a textbook outline into spoken headings or offer tone presets.

Use familiar words and short connected sentences. Define necessary terms immediately, keep the same example/naming where useful, and give a reason for moving to the next topic. Questions must have a purpose and an answer. Avoid artificial excitement, repeated filler, forced slang, padded introductions, and unexplained compressed terminology.

Preserve code, identifiers, units, and real claims. Verify technical corrections through appropriate primary sources; never invent a quotation, result, or statistic.

## Responsibilities and initial delivery

The agent designs the teaching path, shots, code, and teacher guide from the user's raw material. The user does not have to write the scene plan or a full script.

Before requesting recording, deliver all scenes in a real local visual draft with play, pause, and seeking. Timing is provisional. Pair it with the teacher guide so the user understands the subject and can record naturally, without memorizing text or racing the draft.

The compact draft with explicitly flexible duration is enabled only when requested in the user's project instructions.

A target duration plans scope; it must not force faster audio or loss of essential meaning. If blank, keep the supplied value blank and plan an appropriate approximate duration separately from actual delivery. If a strict limit conflicts with necessary coverage, resolve the scope before recording.

## One guide, two outputs

Use one shared content source, such as `narration/guide.json`, to generate:

- `narration/RECORDING-SCRIPT.md`
- `public/recording-guide.html`

Both must contain the same explanations, points, and examples. Use Persian headings and explicit RTL/right alignment. Each scene gets a separate section with scene ID, title, and related VO ID, even when scenes share a recording.

Include these eight items for every scene:

1. **What this scene is about:** one or two clear sentences.
2. **The question it answers:** a real relevant question or problem.
3. **Full scene explanation for the teacher:** a separate, connected explanation of what it is, how/why it works, essential definitions, and one useful concrete example.
4. **Ordered speaking points:** short complete points the teacher can expand naturally.
5. **Example:** a specific example when it helps.
6. **How the visual helps:** the roles, relationship, direction, change, and visible result.
7. **What the viewer should understand:** one clear outcome.
8. **Bridge to the next scene:** what follows and why.

The full explanation is study material, not read-aloud narration or instructions to say/show things. Keep it beside the speaking points, not instead of them. Complete means sufficient for understanding in one reading; do not impose paragraph/word minimums or add repeated definitions and side details.

Teacher notes never appear in the final video. Study-text length is not voice duration and must not drive alignment.

The HTML guide needs local Vazirmatn, readable spacing, a distinct study-explanation block, scene anchor navigation, a player link, and mobile-readable layout. Discover its actual public URL from the running Remotion instance; do not guess the port/static prefix. Verify page, fonts, anchors, and complete content.

Handoff includes the MD link, direct HTML guide URL, player URL, version/duration/dimensions, known limitations, and restart command.

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

The user's default handoff is original voice plus the actual transcript and short timed phrases, supplied as an SRT file or pasted SRT. Accept it directly; word-level JSON is optional.

1. Store the original recording in `workspace/assets/<project-id>/audio/voice/` and the original transcript/SRT in `transcripts/`. Preserve original bytes, filenames, and replacement takes.
2. Map recordings to semantic VO/scene IDs from content and the user's labels, not arbitrary directory order.
3. Prepare playback files in project `public/audio/`, retaining source-to-runtime mapping, checksums, measured duration, and any processing.
4. Measure the exact playback file; do not force its duration to an initial estimate.
5. Validate the transcript's audio version, timestamp format/units, chronological order, overlaps, and duration bounds. Standard SRT uses `HH:MM:SS,mmm`; JSON/other custom timestamps should state decimal seconds explicitly.
6. Keep corrections in a working copy under project `narration/`. Fix clear spelling without inventing speech, changing technical meaning, or silently retiming cues.
7. Use reliable phrase timings for the related visual events. A multiword SRT cue does not identify each internal word's timestamp. Inspect only ambiguous motion-critical boundaries when needed and report the remaining precision limit.
8. Record verified cues and their evidence/uncertainty in the alignment data and storyboard. Generate the timeline from those data.

Accept natural equivalent phrasing, hesitations, and repetition. Flag only a real technical mistake, essential omission, or harmful continuity break; request rerecording only for the affected passage.

Do not rerun full transcription when the supplied input or unchanged cached evidence is sufficient. Never manufacture word times by equal division, word-count ratio, or arbitrary rescaling.

## Audio preservation and available tools

- Preserve speech speed and pitch. Keep breaths and natural pauses.
- Silence detection is an editing aid, not permission to remove quiet syllables or apply identical pauses at all boundaries.
- Any authorized trim/edit must use a natural boundary, preserve the original, record its location/duration, and update dependent cues.
- Do not synthesize, clone, or convert voice without an explicit request.
- The user removed PyTorch, Transformers, and the Persian Wav2Vec2 model. Do not reinstall these or download replacement recognition/alignment models automatically. Consult [audio-tool status](../installation/AUDIO-TOOLS.md).
- Technical decoding/signal checks are not direct listening, pronunciation approval, or human review.
- SRT input is for timing unless visible subtitles are explicitly requested. Do not add music or SFX automatically.

After audio arrives, review meaning and continuity again, then revise the visual timing to match the actual explanation. The teacher guide is never forcibly aligned as though it were the exact spoken transcript.

## Persian direction

Use explicit RTL and right alignment for Persian paragraphs/headings, including those beginning with English. Isolate inline English letter order with `bdi dir="ltr"`; keep the word at its proper place in the Persian sentence. Standalone code/commands may use separate LTR blocks.

Do not use `dir="auto"` or first-character direction detection. Persian read-aloud Markdown can use an RTL HTML wrapper with real heading/paragraph elements. Chat replies remain plain text or standard Markdown without HTML wrappers.
