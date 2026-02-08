---
id: "oq-multi-user"
type: open-question
title: "Multi-User & Team Sharing"
status: draft
owner: product-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  affects: [f02, f11, arch-data-model, arch-security]
  resolves-to: []
---

# OQ: Multi-User & Team Sharing

## Question

Is this always single-user, or could teams share epics/projects?

## Context

The current architecture is strictly single-user -- all data lives under `users/{uid}/` and Firestore Security Rules enforce complete data isolation between users. However, many of the use cases (project management, email delegation, shared epics) have natural multi-user extensions. The recursive task hierarchy (F2) and Spaces (F11) could support shared contexts where multiple users collaborate on the same project or domain. Adding multi-user support would fundamentally change the data model (shared collections, permission models, real-time collaboration) and security architecture. This is a scope-defining question that affects nearly every part of the system.

## Exploration

_(To be filled as exploration happens.)_

## Current Thinking

_(To be filled.)_

## Resolution Criteria

- A clear product decision on whether multi-user is in scope for V1, V2, or never
- If multi-user is planned: a data model proposal for shared entities (projects, tasks, domains) that works within Firestore's security model, including permission levels (viewer, editor, owner)
- If single-user only: explicit documentation of this constraint and identification of which product decisions depend on it (so they can be revisited if the decision changes)
