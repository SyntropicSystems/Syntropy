---
id: "f06"
type: feature-spec
title: "Event Sourcing & Audit Trail"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  enables: [f01, f04, f07, f11, f12, u05]
  related: [f10]
  decided-by: [adr-001, adr-002]
  informed-by: [jtbd, stories]
  architecture: [arch-event-sourcing]
  open-questions: [oq-conflict-resolution]
tags: [core, mvp, architecture, p0]
---

# F06 — Event Sourcing & Audit Trail

## Summary

Every single event in the system is recorded immutably, creating a complete history. Events are the foundation for the learning system and for accountability — any AI action can be traced, reviewed, and used as training signal.

## Jobs Addressed

- J4 — Maintain Control While Delegating to AI (primary)
- J5 — Build a Personal Knowledge & Action System (secondary)

## How It Works

- Every action is an event: task created, task completed, AI suggested action, AI auto-executed, user overrode AI, email archived, project created, etc.
- Events are immutable — nothing is deleted, only appended.
- The audit trail is browsable: filter by date, by task, by epic, by action type, by actor (human vs AI).
- Events are the foundation for the learning system — patterns are extracted from the event log.
- Events are the foundation for accountability — any AI action can be traced, reviewed, and used as training signal.
- The ledger can be exported for analysis.

## Dependencies

- Requires: none (foundational layer)
- Enables: F01 (Task Card System) — card state derived from events; F04 (AI Action Engine) — AI actions logged and auditable; F07 (Self-Learning System) — patterns extracted from event log

## Open Questions

- [ ] What is the event retention policy — indefinite, or time-bounded with archival?
- [ ] How should event log size be managed as it grows over months/years of usage?
- [ ] What is the event schema versioning strategy when new event types are introduced?
- [ ] Should the ledger export support standard formats (e.g., JSON-LD, CSV) for interoperability?
