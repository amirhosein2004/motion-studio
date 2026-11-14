# Persian text, RTL, fonts, and encoding

Applies to every Persian string in files, UI, on-screen copy, and generated guides.

## Direction and alignment

- Persian prose and headings in files and UI use explicit RTL direction and right alignment — including paragraphs and headings that begin with an English word.
- Isolate only the internal letter order of inline English with `bdi dir="ltr"`; the word stays in its proper place in the Persian sentence.
- Reserve separate LTR blocks for standalone code and commands.
- Never use `dir="auto"` or first-character direction detection.
- RTL governs Persian text layout. Choose diagram and object motion directions from the mechanism and spatial relationships per [motion quality](motion-quality.md); do not mirror a request/response path, physical process or axis solely to match text direction.

## Read-aloud Markdown and chat

- Persian read-aloud Markdown may use an RTL/right-aligned HTML wrapper with real heading and paragraph elements.
- Chat replies stay plain text or standard Markdown — no HTML wrappers for alignment.

## Fonts and encoding

- Use local Vazirmatn fonts with license provenance recorded alongside the files.
- All text files are UTF-8. Check saved Persian text for character corruption (mojibake) before delivery.

## On-screen text

Size, safe-area, and reading-time minimums for video text live in [motion-quality](motion-quality.md).
