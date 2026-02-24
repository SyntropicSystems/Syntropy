---
id: "adr-002"
type: adr
title: "Event Sourcing on Firestore"
status: superseded
owner: architecture-agent
created: 2025-02-07
updated: 2026-02-24
refs:
  affects: [f06, arch-event-sourcing, arch-data-model]
  superseded-by: [adr-006]
---

# ADR-002: Event Sourcing on Firestore

> **Status:** Superseded by ADR-006 (storage/backend stack intentionally deferred).

## Context

Syntropy OS has three core requirements that point toward event sourcing:

1. **Complete audit trail.** Every action (human or AI) must be recorded with full transparency. Users need to review what the AI did, trace decisions, and build trust over time. The audit trail is browsable and filterable by date, task, epic, action type, and actor (human vs AI).
2. **Learning from history.** The self-learning system (F7) needs a complete record of all user corrections, AI suggestions, and outcomes. Patterns are extracted from the event log to improve confidence calibration over time. The event log is the training data.
3. **Accountability and trust.** The system makes autonomous decisions (auto-archiving newsletters, auto-categorizing emails). Users must be able to verify every AI action after the fact. Immutability guarantees the record cannot be tampered with.

The event sourcing pattern must work within Firestore's document model and security rules.

## Decision

Implement an append-only event log in Firestore at `users/{uid}/events/`. All state is derived from events. Firestore Security Rules enforce immutability -- events can be created but never updated or deleted, even by the user. Materialized views (queue order, project progress, domain stats) are separate documents updated by Cloud Function triggers on event writes.

## Rationale

- **Immutability via Security Rules.** Firestore Security Rules can enforce `allow update: if false; allow delete: if false;` on the events collection, making the event log tamper-proof at the database level. This is stronger than application-level enforcement.
- **Natural fit for Cloud Functions triggers.** Cloud Functions can trigger on Firestore document creates in the events collection, driving the materialized view update pipeline. This creates a clean event-driven architecture.
- **Complete reconstructability.** Historical state can be reconstructed at any point by replaying the event log. This enables debugging, recovery, and time-travel queries.
- **Training data for AI.** The event log with its `{ suggested, userChose, context }` structure is exactly the training data format needed for the learning loop. Every user correction is a training signal.
- **Aligns with core philosophy.** Event sourcing directly implements the "Event Sourcing & Transparency" pillar -- nothing is a black box, everything is auditable.

## Alternatives Considered

- **Traditional CRUD with soft deletes.** Standard approach: entities have a `status` field, deletes set `deleted: true`. Simpler to implement, familiar pattern. However, loses the complete history -- you only know the current state, not how you got there. Audit trail would need to be a separate, bolt-on system. Does not naturally support the learning loop. The AI training pipeline would need a separate data collection mechanism.

- **Separate event store (EventStoreDB).** Purpose-built event sourcing database with projections, subscriptions, and event replay built in. More powerful event sourcing primitives than Firestore. However, adds another infrastructure dependency alongside Firebase. Does not benefit from Firestore's offline persistence or real-time sync. Increases operational complexity significantly. Overkill for a single-user system.

- **Hybrid approach (CRUD + event log).** Entities are CRUD-managed for current state, with a parallel event log for audit/learning. Simpler reads (no materialized views needed for current state). However, creates a dual-write problem -- current state and event log can drift out of sync. More complex write path. Loses the purity of "events are the source of truth."

## Consequences

- **Storage grows linearly.** Every action appends an event document that is never deleted. Storage will grow indefinitely. Mitigated by: Firestore's per-document pricing (small events are cheap), potential archival to BigQuery for old events, and the Firestore free tier's 1GB limit being sufficient for early users.
- **Need materialized views.** Since events are the source of truth, current state must be derived. Reading "what is the current queue?" requires a materialized view document, not a query over events. Cloud Functions maintain these views. Adds complexity but improves read performance (one document read vs. querying and sorting events).
- **Security Rules enforce immutability.** This is both a benefit and a constraint. The event log is tamper-proof, which is critical for trust and accountability. But it means mistakes cannot be "fixed" -- they can only be amended with new correction events. This is the intended behavior.
- **Event replay for recovery.** If materialized views become inconsistent (bug in Cloud Function, partial failure), they can be rebuilt by replaying the event log. This provides a built-in recovery mechanism.
- **BigQuery export for analytics.** Firestore -> BigQuery export provides the foundation for batch analytics, AI training data aggregation, and usage metrics without impacting the production database.
