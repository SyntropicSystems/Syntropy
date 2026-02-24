---
id: "adr-001"
type: adr
title: "Firebase as Backend Platform"
status: superseded
owner: architecture-agent
created: 2025-02-07
updated: 2026-02-24
refs:
  superseded-by: [adr-006]
  affects: [arch-data-model, arch-stack, f06, f08]
  related: [adr-004, oq-monorepo-architecture, rp-u04, rp07]
---

# ADR-001: Firebase as Backend Platform

> **Status:** Superseded by ADR-006 (backend/app stack intentionally deferred).

## Context

Syntropy OS needs a backend platform that supports: real-time sync across mobile and web clients, offline persistence for mobile-first usage, serverless compute for AI pipeline orchestration, integrated authentication with Google OAuth (required for Gmail integration), file storage for artifacts, and a data model that maps naturally to our Domain -> Project -> Task hierarchy. The system is single-user (per-account), so multi-tenant relational concerns are less relevant than developer velocity and real-time capabilities.

## Decision

Use Firebase as the backend platform: Cloud Firestore for the database, Cloud Functions for serverless logic, Cloud Storage for file storage, Firebase Auth for authentication, and FCM for push notifications.

## Rationale

Firebase gives us:

- **Real-time sync across devices** -- Firestore listeners provide automatic real-time sync. When a card is completed on mobile, the web app updates instantly. This is foundational for the cross-platform requirement.
- **Built-in offline persistence** -- Firestore's SDK caches all read data locally on the device. Critical for mobile use cases -- the user can triage cards on the subway, and actions queue locally until connectivity returns.
- **Serverless backend** -- Cloud Functions eliminate server management. Functions trigger on Firestore writes (event sourcing pipeline), HTTP requests (API endpoints), and Pub/Sub messages (async AI processing). Auto-scaling is built in.
- **Integrated auth with Google OAuth** -- Firebase Auth with Google OAuth is required for Gmail integration. Users sign in with their Google account, which also grants OAuth scopes for Gmail API access. Single sign-on, no separate auth system.
- **Document model fit** -- Firestore's document/collection model maps naturally to our hierarchy: `users/{uid}/domains/{domainId}/...`. Each entity is a document, nested collections provide natural scoping.
- **Generous free tier** -- Firebase's Spark plan provides 1GB Firestore storage, 50K daily reads, 20K daily writes, 5GB Cloud Storage. Sufficient for development and early testing without cost.

## Alternatives Considered

- **Custom Node.js backend (Express/Fastify + PostgreSQL):** Full control over the data model and query capabilities. Supports complex relational queries that Firestore cannot. However, requires managing servers/containers, implementing real-time sync from scratch (WebSockets), building offline persistence into the client, and implementing auth separately. Significantly higher development and operational overhead for a solo/small team. The relational model is less natural for our document-oriented hierarchy.

- **Supabase (PostgreSQL + real-time):** Open-source Firebase alternative built on PostgreSQL. Better query capabilities than Firestore, real-time subscriptions via PostgreSQL logical replication. However, offline persistence support is less mature than Firestore's built-in solution. Self-hosting adds operational burden; managed hosting is available but less battle-tested at scale than Firebase. Google OAuth integration requires additional setup.

- **AWS Amplify (DynamoDB + Lambda + Cognito):** AWS equivalent of Firebase. DynamoDB is highly scalable but has a steeper learning curve and less ergonomic SDK for mobile/web real-time apps. Amplify's offline support (DataStore) exists but is more complex to configure. Cognito for auth works but is less integrated with Google OAuth than Firebase Auth. Generally more powerful but more complex for our use case.

## Consequences

- **Vendor lock-in to Google Cloud.** Migrating off Firebase would require rewriting the data layer, auth system, and serverless functions. Mitigated by keeping business logic in a shared TypeScript package that is platform-agnostic.
- **Firestore query limitations.** Firestore does not support arbitrary joins, full-text search, or complex aggregations. Mitigated by: using materialized views (precomputed by Cloud Functions), adding Algolia/Typesense for full-text search, and BigQuery export for analytics.
- **Firestore pricing at scale.** Firestore charges per read/write/delete operation. An active user with many events could generate significant read costs. Mitigated by: materialized views (one read instead of many), careful query design, and the generous free tier for early development.
- **Generous free tier for development.** No cost during development and prototyping. Pricing scales with usage, which aligns with a subscription business model.
- **Fast development velocity.** Firebase's SDK, CLI, and emulator suite enable rapid prototyping. Real-time sync, offline persistence, and auth work out of the box.
