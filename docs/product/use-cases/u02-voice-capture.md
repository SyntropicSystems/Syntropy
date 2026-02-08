---
id: "u02"
type: use-case
title: "Voice Capture on the Go"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f05, f01, f02]
  related: [u10]
tags: [capture, voice, mobile]
---

# U02 — Voice Capture on the Go

## Scenario
User is walking and has an idea. They tap the capture button, record: "Need to compare the walnut vs white oak cabinets Mike sent. Budget around 8k. Also remind me to call the plumber about the leak." AI transcribes, creates two tasks: "Compare cabinet options" (linked to Home Renovation epic) and "Call plumber about leak" (standalone, high priority).

## Features Exercised
- F05 — Quick Capture (Notes → Tasks)
- F01 — Task Card System
- F02 — Recursive Task Hierarchy
