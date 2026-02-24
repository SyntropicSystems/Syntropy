---
id: "arch-security"
type: architecture
title: "Security & Auth"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2026-02-24
refs:
  related: [arch-event-sourcing, arch-data-model]
  open-questions: [oq-privacy-model, oq-multi-user]
tags: [architecture, security, auth]
---

# Security & Auth

## Overview

Syntropy OS follows a strict data isolation model: each user's data is completely isolated from every other user's data.

The specific auth provider and backend enforcement mechanism are **undecided** (ADR-006). This document captures the security requirements and patterns independent of any particular vendor.

## Authentication

Users must be able to authenticate with a provider that supports Google OAuth (required for Gmail integration), and the backend must validate identity on every read/write.

Candidate implementations (not decided):
- Firebase Auth (historical candidate)
- OIDC provider (Auth0/Clerk/Keycloak) + backend validation
- First-party auth (only if needed later)

## Data Isolation

Regardless of backend, the invariant is:
- a user can only read/write data they own,
- isolation is enforced as close to the data layer as possible (database policy preferred).

## Event Immutability

Events are append-only. Immutability should be enforced so that history cannot be rewritten; corrections must be new events (e.g., `UserCorrected`).

## Integration Token Security

OAuth tokens for integrations (Gmail, Calendar, etc.) must be stored encrypted at rest. Tokens are:

- **Encrypted at rest**
- **Decrypted only by trusted server-side execution** at action time
- **Never exposed to client code** -- the client triggers a server-side action which handles the decryption and API call
- **Scoped to minimum required permissions** -- only the OAuth scopes needed for each integration are requested

## Client-Side Security

- No client-side secret storage. Clients only hold short-lived credentials/tokens.
- Service credentials for server-side operations are stored in server-side secret managers/environment, never in client code.
- Artifact/file access must be scoped per user and audited.
