---
id: "f05"
type: feature-spec
title: "Quick Capture"
status: defining
owner: product-agent
priority: P1
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f01, f04]
  enables: [u02, u10]
  informed-by: [jtbd, stories]
  related: [f11, f12, f12-artifact-agent]
tags: [capture, input, p1]
---

# F05 — Quick Capture

## Summary

Rapidly create notes from any input modality that can be converted to structured tasks.

## Jobs Addressed

- J2 — Never Lose Track of Commitments (primary)
- J7 — Capture Once, Organize Everywhere (secondary)

## How It Works

- **Voice:** Tap-to-record voice memo. AI transcribes and extracts action items.
- **Voice Memo:** Longer-form audio recording. AI summarizes and creates structured tasks from the content.
- **Text:** Quick text input. AI can parse natural language into structured task fields.
- **Photo:** Capture a whiteboard, document, or receipt. AI extracts text (OCR) and creates tasks.
- **Multimodal:** Combine any of the above. E.g., take a photo of a whiteboard and add a voice annotation.
- Notes are first-class objects that exist independently but can be converted to tasks.
- Conversion can be: one note to one task, one note to multiple tasks, or note to project with sub-tasks.
- AI suggests how to structure the note into tasks but the user has final say.

## Dependencies

- Requires: F01 (Task Card System) — captured items become cards in the queue; F04 (AI Action Engine) — AI transcription, OCR, and structuring of captured input
- Enables: U02 (Voice Capture on the Go), U10 (Voice Memo to Multi-Action)

## Open Questions

- [ ] What is the maximum voice memo duration before transcription quality degrades or cost becomes prohibitive?
- [ ] Should Quick Capture support offline processing, or queue for processing when connectivity returns?
- [ ] How should the system handle ambiguous captures where AI cannot confidently extract action items?
- [ ] What is the interaction model for multimodal capture (sequential inputs vs. simultaneous)?
