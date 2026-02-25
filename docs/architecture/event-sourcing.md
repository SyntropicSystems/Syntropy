---
id: "arch-event-sourcing"
type: architecture
title: "Event Sourcing (Storage-Agnostic)"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2026-02-25
refs:
  decided-by: [adr-002, adr-006]
  related: [adr-004, arch-data-model, arch-experience-layer, arch-security, f06]
tags: [architecture, event-sourcing]
---

# Event Sourcing (Storage-Agnostic)

## Overview

Event sourcing is a core architectural pattern for Syntropy OS: **events are the source of truth**, and all derived state is computed from an append-only log. The specific storage backend is intentionally **undecided** (ADR-006).

## Event Log

- The event log is append-only.
- Events are immutable (no in-place edits; corrections are new events).
- Historical state can be reconstructed by replaying events (optionally from snapshots).

## Event Types

Events cover every action in the system:

- `TaskCreated` -- a new task/card was created (by user or AI)
- `TaskCompleted` -- a task was marked done
- `ActionTaken` -- a user took an action on a card
- `AISuggested` -- AI proposed an action with confidence score
- `AIAutoExecuted` -- AI auto-executed an action (confidence above threshold)
- `UserOverrode` -- user rejected or modified an AI action
- `DomainCreated` -- a new Space/Domain was created
- `InfoUpdated` -- reference info was added or modified in a Space
- `DependencyAdded` -- a dependency relationship was created between tasks
- `ConfidenceUpdated` -- AI confidence calibration was adjusted
- `UserCorrected` -- user corrected an AI extraction or suggestion

Each event records: `id`, `timestamp`, `actor` ("user" or "ai:agent_name"), `type`, optional `taskId`/`spaceId`/`projectId`, `payload`, and optional `confidence`/`reasoning`.

## Materialized Views

Materialized views (queue order, project progress, domain stats) are derived state updated from events. These are precomputed for performance:

- **Queue state** — contains `orderedTaskIds[]` and `activeIndex`. Updated when tasks are created, completed, or reordered.
- **Project progress** -- task counts, completion percentages, blocked task counts. Updated when task statuses change.
- **Domain stats** -- active project counts, total items, last activity time. Updated on any event tagged with a domain ID.

Clients read materialized views for display. Materialized views can always be rebuilt by replaying the event log.

## Immutability Enforcement

Immutability can be enforced in different ways depending on the chosen backend:

- database-level rules/ACLs (ideal),
- application-level write constraints (fallback),
- append-only storage primitives (log-structured backends).

The specific Firestore-based approach is preserved as historical context in ADR-002 (now superseded).

## Event Replay

Historical state can be reconstructed at any point by replaying the event log from the beginning (or from a snapshot). This enables:

- **Debugging** -- trace exactly what happened and why
- **Audit** -- complete accountability for all actions (human and AI)
- **Learning** -- the AI training pipeline reads the event log to extract patterns and improve confidence calibration
- **Recovery** -- if materialized views become inconsistent, they can be rebuilt from events

## Candidate Implementations

Examples of viable backends (not decided):
- **Firestore** (historical candidate) — see ADR-002 for the previous Firestore-specific decision and rationale
- **PostgreSQL** — events table + projection workers + client sync strategy
- **SQLite-first local + sync** — local event log with background sync to a server log
