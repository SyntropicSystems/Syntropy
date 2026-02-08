---
id: "arch-offline"
type: architecture
title: "Offline Strategy"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [f08, arch-data-model]
tags: [architecture, offline, sync]
---

# Offline Strategy

## Overview

Syntropy OS is offline-first. The system must work seamlessly when the user has no connectivity (e.g., triaging cards on the subway) and sync gracefully when connectivity returns.

## Firestore Offline Persistence

Firestore's built-in offline persistence caches all read data locally on the device. When the app reads documents, Firestore automatically keeps a local copy. Subsequent reads hit the local cache first, making the app feel fast regardless of network conditions.

## Write Queue

Write actions queue locally when offline. Firestore's SDK handles this transparently:

- User takes an action on a card (complete, archive, snooze, etc.)
- The action is written to the local Firestore cache immediately
- The UI updates optimistically -- the user sees the result instantly
- When connectivity returns, queued writes sync to the server automatically
- Cloud Function triggers fire on the server-side write, updating materialized views

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
