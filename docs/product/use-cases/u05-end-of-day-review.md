---
id: "u05"
type: use-case
title: "End-of-Day Review"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f06, f04, f01]
  related: [u01, u04, u08]
tags: [audit, review, trust]
---

# U05 — End-of-Day Review

## Scenario
User opens the audit trail. Sees: AI auto-archived 12 newsletters, auto-replied to 3 routine requests, created 2 follow-up tasks, escalated 1 email for human review. User notices one auto-reply was slightly off — they correct it, and the AI learns for next time.

## Features Exercised
- F06 — Event Sourcing & Audit Trail
- F04 — AI Action Engine
