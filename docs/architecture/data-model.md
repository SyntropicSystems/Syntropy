---
id: "arch-data-model"
type: architecture
title: "Data Model (Storage-Agnostic)"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2026-02-25
refs:
  decided-by: [adr-001, adr-002, adr-006, oq-multi-user]
  related: [adr-004, arch-event-sourcing, arch-experience-layer, arch-offline, arch-personality-layer, arch-security, arch-stack, f01, f02, f11, f11-domains-agent, f12, oq-monorepo-architecture]
tags: [architecture, data-model]
---

# Data Model (Storage-Agnostic)

## Overview

This document defines the **conceptual data model** (entities + relationships) independent of any specific backend. The storage backend and sync strategy are intentionally **undecided** (ADR-006).

The data model must support:
- an append-only event log + projections (`arch-event-sourcing`),
- offline-first behavior (`arch-offline`),
- per-user isolation and least-privilege access (`arch-security`).

## Core Entities (Conceptual)

### Space (Domain)

```txt
Space {
  id, name, icon, color, description
  info: InfoCategory[]      // structured knowledge base
  projects: ProjectId[]     // time-bound efforts
  artifacts: ArtifactId[]   // documents, photos, files
  events: Event[]           // filtered view of global log
}
```

A Space (also called Domain) is a permanent, long-lived container for an entire area of a user's life. It persists indefinitely, even when all its projects are complete.

### InfoCategory

```txt
InfoCategory {
  id, category: string      // "Measurements", "Contacts", etc.
  items: { label, value }[] // key-value pairs
}
```

Structured reference information within a Space.

### Artifact

```txt
Artifact {
  id, title, type: pdf | image | note | voice | doc | screenshot
  source: upload | email | photo | capture | share_sheet
  date, tags: string[]

  domainIds: DomainId[]        // linked to multiple domains
  projectIds: ProjectId[]      // linked to multiple projects
  taskIds: TaskId[]            // linked to multiple tasks

  aiExtraction?: { ... }       // summary + structured facts + confidence
  userEdits?: { ... }          // corrections for learning

  storageRef: string           // backend-specific reference (e.g., object key / blob id)
}
```

Artifacts support many-to-many linking: one artifact can be associated with multiple Spaces, Projects, and Tasks.

### Project

```txt
Project {
  id, title, icon, color
  spaceId?                  // belongs to a Space (or standalone)
  status: active | completed | paused
  budget?, deadline?
  tasks: TaskId[]           // ordered for UX
}
```

A Project is a time-bound effort within a Space (or standalone).

### Task (Card)

```txt
Task {
  id, title, description, source, sourceRef
  status: pending | in_progress | done | snoozed | archived
  priority, projectId?, spaceId?
  dependsOn: TaskId[]
  creates: TaskId[]
  aiSuggestion?: { ... }
}
```

Tasks are the atomic unit of the system.

### Event

```txt
Event {
  id, timestamp, actor: "user" | "ai:agent_name"
  type, taskId?, spaceId?, projectId?
  payload, confidence?, reasoning?
}
```

Events are immutable. Corrections are new events, never in-place edits.

## Storage Mapping (Deferred)

When we re-open the backend/app stack decision, we will add a concrete mapping from the conceptual model to the chosen backend (tables, documents, indexes, ACLs, sync protocol).

### Historical Candidate: Firestore Mapping

This repo previously assumed Firestore (ADR-001/ADR-002), but those ADRs are now **superseded** by ADR-006. The mapping is preserved here only as historical context and a potential future implementation candidate.

```txt
users/{uid}                              -> profile, preferences, AI thresholds
users/{uid}/domains/{domainId}           -> Space (name, icon, stats)
users/{uid}/domains/{domainId}/info/{id} -> Reference info categories + key-value items
users/{uid}/projects/{projectId}         -> Projects (domainId?, status, budget, taskOrder[])
users/{uid}/tasks/{taskId}               -> Tasks/Cards (domainId?, projectId?, status, aiSuggestion)
users/{uid}/artifacts/{artifactId}       -> File metadata (domainIds[], projectIds[], taskIds[], aiExtraction, storagePath)
users/{uid}/events/{eventId}             -> Append-only event log (immutable)
users/{uid}/queue                        -> Materialized queue state (orderedTaskIds[], activeIndex)
users/{uid}/integrations/{integrationId} -> OAuth tokens (encrypted), sync state
```

## Diagrams

- Edit in Eraser: https://app.eraser.io/workspace/ccxcpaHhRcmYhmAMWpQT
- Diagram source: `data-model-Personal Productivity System Data Model-1.eraserdiagram`
- Preview: ![](/.eraser/ccxcpaHhRcmYhmAMWpQT___VzfZtTJ0HEPpAegCfcONCaSHI892___---diagram----f7e35851b16667b343528b78d5f279a0-Personal-Productivity-System-Data-Model.png)
