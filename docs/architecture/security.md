---
id: "arch-security"
type: architecture
title: "Security & Auth"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [arch-event-sourcing, arch-data-model]
  open-questions: [oq-privacy-model, oq-multi-user]
tags: [architecture, security, auth]
---

# Security & Auth

## Overview

Syntropy OS follows a strict data isolation model. Each user's data is completely isolated from every other user's data. Firebase Auth provides authentication, and Firestore Security Rules enforce authorization at the database level.

## Authentication

Firebase Auth with Google OAuth is the primary authentication method. Users sign in with their Google account, which also provides the OAuth scopes needed for Gmail integration (F3). Firebase Auth issues a JWT token that is validated by Firestore Security Rules on every read and write.

## Data Isolation

All user data lives under `users/{uid}/`. Firestore Security Rules enforce that a user can only read and write their own data:

```
match /users/{uid}/{document=**} {
  allow read, write: if request.auth.uid == uid;
}
```

There is no mechanism for one user to access another user's documents, tasks, events, or any other data. This is enforced at the database level, not just the application level.

## Event Immutability

Events are append-only. Firestore Security Rules enforce that events can be created but never updated or deleted:

```
match /users/{uid}/events/{eventId} {
  allow create: if request.auth.uid == uid;
  allow update: if false;
  allow delete: if false;
}
```

This guarantees a complete, tamper-proof audit trail. Even the user cannot modify their own event history -- they can only append new events (e.g., a `UserCorrected` event to amend a previous action).

## Integration Token Security

OAuth tokens for integrations (Gmail, Calendar, etc.) are stored encrypted in Firestore under `users/{uid}/integrations/{integrationId}`. Tokens are:

- **Encrypted at rest** in Firestore
- **Decrypted only by Cloud Functions** at execution time
- **Never exposed to client code** -- the client triggers a Cloud Function which handles the decryption and API call server-side
- **Scoped to minimum required permissions** -- only the OAuth scopes needed for each integration are requested

## Client-Side Security

- All Firestore reads and writes go through Security Rules -- there is no bypass
- Cloud Functions use service account credentials for server-side operations (BigQuery export, AI API calls)
- API keys for external services (Claude API, OpenAI, Algolia) are stored in Cloud Functions environment variables, never in client code
- Cloud Storage security rules mirror Firestore rules -- users can only access files under their own storage path
