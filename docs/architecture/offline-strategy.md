---
id: "arch-offline"
type: architecture
title: "Offline Strategy"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2026-02-24
refs:
  decided-by: [adr-006]
  related: [arch-data-model, f08]
tags: [architecture, offline, sync]
---

# Offline Strategy

## Overview

Syntropy OS is offline-first. The system must work seamlessly when the user has no connectivity (e.g., triaging cards on the subway) and sync gracefully when connectivity returns.

The specific backend/sync implementation is intentionally **undecided** (ADR-006). This document captures the offline requirements and behavior independent of any particular storage technology.

## Local First

The client maintains a local representation of:
- the event log (or a cache of recent events),
- derived/materialized views needed for UX (queue state, active card, etc.),
- any pending actions not yet synced.

## Write Queue

Write actions queue locally when offline:

- User takes an action on a card (complete, archive, snooze, etc.)
- The action is recorded locally immediately (as an event)
- The UI updates optimistically -- the user sees the result instantly
- When connectivity returns, queued writes sync to the server automatically
- Server-side processing (projections, AI triggers, integration actions) runs after the event is accepted

## Optimistic UI

Act immediately, sync in background. The user never waits for a server round-trip to see the result of their action. The local state updates first, and the server state catches up asynchronously. This is critical for the card-swiping UX -- each swipe must feel instant.

## AI Feature Degradation

AI features degrade gracefully when offline:

- **Cached suggestions** are shown offline. If the AI had already analyzed a card and generated a suggestion before the user went offline, that suggestion is available from the local cache.
- **New AI suggestions** are deferred. Cards that haven't been analyzed yet will appear without AI suggestions until connectivity returns.
- **Auto-execute actions** are paused. The system does not auto-execute actions offline because it cannot generate new AI analysis. Queued auto-executions resume when online.
- **Artifact processing** is deferred. Uploaded artifacts are stored locally and processing begins when connectivity returns.

## Conflict Resolution

- **Last-write-wins** for simple fields (task title, status, priority). If two devices edit the same field offline, the last write to reach the server wins.
- **Merge for arrays** (tags, linked IDs). Array operations (add/remove) are merged rather than overwritten, reducing data loss from concurrent edits.
- Since this is a single-user system, conflicts are rare -- they only occur when the same user edits on two devices while both are offline. The last-write-wins + array merge strategy is sufficient for this use case.

## Candidate Implementations

Examples (not decided):
- **Firestore offline persistence** — strong baseline if Firebase is chosen later
- **SQLite + sync** — explicit control of local cache + background synchronization
- **CRDT-based models** — if multi-device conflict semantics become central
