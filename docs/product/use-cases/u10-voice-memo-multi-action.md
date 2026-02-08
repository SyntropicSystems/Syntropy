---
id: "u10"
type: use-case
title: "Voice Memo to Multi-Action"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f12, f05]
  related: [u02, u09]
tags: [artifacts, voice, capture]
---

# U10 — Voice Memo to Multi-Action

## Scenario
User finishes a phone call with contractor. Records 47-second voice memo summarizing the call. AI transcribes, extracts: 3 dates (cabinet delivery, demolition start, plumbing rough-in), a deadline (choose hardware by Friday), and a phone number. Creates structured note with 5 key facts, suggests 2 tasks and a contact save. User corrects one date, accepts everything else, taps "Save & Execute 3 Actions." Done in 30 seconds.

## Features Exercised
- F12 — Artifact Intelligence (Upload → Extract → Link)
- F05 — Quick Capture (Notes → Tasks)
