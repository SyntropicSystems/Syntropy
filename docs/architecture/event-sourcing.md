---
id: "arch-event-sourcing"
type: architecture
title: "Event Sourcing on Firestore"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  decided-by: [adr-002]
  related: [adr-004, arch-data-model, arch-security, f06]
tags: [architecture, event-sourcing, firestore]
---

# Event Sourcing on Firestore

## Overview

All state in Syntropy OS is derived from an append-only event log stored in `users/{uid}/events/`. This is the foundational architectural pattern -- events are the source of truth, and all other state is derived from them.

## Event Log

- All state is derived from an append-only event log stored in `users/{uid}/events/`.
- **Security Rules enforce immutability** -- events can be created but never updated or deleted, even by the user.
- Historical state can be reconstructed at any point by replaying the event log.

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

Materialized views (queue order, project progress, domain stats) are separate documents updated by Cloud Function triggers on event writes. These are precomputed for performance:

- **Queue state** (`users/{uid}/queue`) -- contains `orderedTaskIds[]` and `activeIndex`. Updated when tasks are created, completed, or reordered.
- **Project progress** -- task counts, completion percentages, blocked task counts. Updated when task statuses change.
- **Domain stats** -- active project counts, total items, last activity time. Updated on any event tagged with a domain ID.

Clients read materialized views for display. The event log is the source of truth; materialized views are derived and can be rebuilt by replaying events.

## Immutability Enforcement

Firestore Security Rules enforce that events can only be created, never updated or deleted:

```
match /users/{uid}/events/{eventId} {
  allow create: if request.auth.uid == uid;
  allow update: if false;
  allow delete: if false;
}
```

This guarantees a complete, tamper-proof audit trail. Even the user cannot modify history -- they can only append new events (e.g., a `UserCorrected` event to amend a previous action).

## Event Replay

Historical state can be reconstructed at any point by replaying the event log from the beginning (or from a snapshot). This enables:

- **Debugging** -- trace exactly what happened and why
- **Audit** -- complete accountability for all actions (human and AI)
- **Learning** -- the AI training pipeline reads the event log to extract patterns and improve confidence calibration
- **Recovery** -- if materialized views become inconsistent, they can be rebuilt from events
