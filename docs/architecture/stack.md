---
id: "arch-stack"
type: architecture
title: "Technology Stack"
status: defining
owner: architecture-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  decided-by: [adr-001, adr-003, adr-004]
  related: [arch-data-model, arch-ai-pipeline]
tags: [architecture, stack, firebase, monorepo]
---

# Technology Stack

## Stack

- **Client:** React Native (Expo) for iOS/Android + React (Vite) for Web. Shared TypeScript business logic package.
- **Backend:** Firebase -- Cloud Firestore (database), Cloud Functions (serverless logic), Cloud Storage (files), Firebase Auth, FCM (push notifications).
- **AI:** Claude API (primary LLM), with OpenAI fallback. Orchestrated via Cloud Functions + Pub/Sub.
- **Search:** Algolia or Typesense (full-text search across domains, tasks, artifacts).
- **Analytics/Training:** Firestore -> BigQuery export for AI training data and usage analytics.
- **Infrastructure as Code:** Pulumi (TypeScript) for Firebase + GCP resource management.

## Toolchain

- **Runtime:** Node.js 24.x LTS (Krypton), managed via nvm
- **Package manager:** pnpm 9.x with workspaces
- **Build orchestration:** Nx 20.x (caching, dependency graph, boundary enforcement)
- **Language:** TypeScript 5.7+ (ES2024 target)
- **IaC:** Pulumi 3.x (TypeScript)
- **Monorepo structure:** Hybrid domain-package architecture (see ADR-004)

## Why Firebase

Firebase gives us: real-time sync across devices (Firestore listeners), built-in offline persistence (critical for mobile), serverless backend (Cloud Functions -- no servers to manage), integrated auth with Google OAuth (needed for Gmail), and a generous free tier for development. The document model maps naturally to our Domain -> Project -> Task hierarchy.

### Real-Time Sync
Firestore listeners provide automatic real-time sync across all connected devices. When a card is completed on mobile, the web app updates instantly. This is foundational for the cross-platform requirement (F8).

### Offline Persistence
Firestore's built-in offline persistence caches all read data locally on the device. This is critical for mobile use cases -- the user can triage cards on the subway, and actions queue locally until connectivity returns.

### Serverless Backend
Cloud Functions eliminate server management entirely. Functions trigger on Firestore writes (event sourcing pipeline), HTTP requests (API endpoints), and Pub/Sub messages (async AI processing). Auto-scaling is built in.

### Integrated Auth
Firebase Auth with Google OAuth is required for Gmail integration (F3). Users sign in with their Google account, which also grants OAuth scopes for Gmail API access. Single sign-on, no separate auth system needed.

### Document Model Fit
Firestore's document/collection model maps naturally to our hierarchy: `users/{uid}/domains/{domainId}/...`. Each entity is a document, nested collections provide natural scoping, and document reads are cheap and fast.

### Generous Free Tier
Firebase's Spark plan provides: 1GB Firestore storage, 50K daily reads, 20K daily writes, 5GB Cloud Storage, and Cloud Functions invocations. Sufficient for development and early testing without cost.
