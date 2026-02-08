---
id: "u01"
type: use-case
title: "Email Triage (Daily Driver)"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f01, f03, f04, f10]
  related: [u03, u05]
tags: [email, daily, mvp]
---

# U01 — Email Triage (Daily Driver)

## Scenario
User opens TaskCard in the morning. Their inbox has been pre-processed: newsletters auto-archived, routine emails auto-categorized, important emails surfaced as cards. They swipe through 15 cards in 5 minutes: approve a design, reply to a proposal, snooze a bill until payday, create a project from a complex thread. AI handled 30 other emails silently overnight.

## Features Exercised
- F01 — Task Card System
- F03 — Gmail / Google Workspace Integration
- F04 — AI Action Engine
- F10 — Confidence Thresholds & Trust Controls
