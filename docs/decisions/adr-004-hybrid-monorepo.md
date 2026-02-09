---
id: "adr-004"
type: adr
title: "Hybrid Domain-Package Monorepo Architecture"
status: accepted
owner: architecture-agent
decision-type: type-1
created: 2025-02-09
updated: 2025-02-09
refs:
  affects: [arch-stack, f08]
  related: [adr-001, arch-data-model, arch-ai-pipeline, arch-event-sourcing]
  resolves: [oq-monorepo-architecture]
tags: [architecture, monorepo, ddd, deployment]
---

# ADR-004: Hybrid Domain-Package Monorepo Architecture

## Context

Syntropy has two independently deployable products (Syntropy OS for end-users, Dev Platform for builders), multiple surfaces per product (mobile, web), a shared Firebase backend, and significant shared domain logic (types, business rules, event sourcing, AI pipeline). We need a code organization strategy that supports independent deployment, prevents business logic duplication, and remains practical for a small team during early development.

Full exploration of 5 options documented in `oq-monorepo-architecture`.

## Decision

**Option D: Hybrid — Domain Packages + Platform Apps.** A single monorepo using pnpm workspaces with build orchestration (Turborepo or Nx), organized into three package tiers:

1. **Domain packages** (`packages/domain-*`) — pure TypeScript business logic, zero UI dependencies. Each bounded context owns its types, validation rules, Firestore operations, event definitions, and event handlers.
2. **Infrastructure packages** (`packages/firebase`, `packages/shared-types`, `packages/config`) — shared plumbing consumed by domain packages and apps.
3. **UI packages** (`packages/design-tokens`, `packages/ui-web`, `packages/ui-mobile`) — rendering layer, consuming domain types but never writing to stores directly.
4. **Apps** (`apps/*`) — thin composition shells that wire domain packages + UI packages into deployable artifacts.

```
syntropy/
├── apps/
│   ├── mobile/                   # Syntropy OS — React Native (Expo)
│   ├── web/                      # Syntropy OS — React (Vite)
│   ├── dev-web/                  # Dev Platform — React (Vite)
│   ├── dev-mobile/               # Dev Platform — React Native (future)
│   └── functions/                # Firebase Cloud Functions
│
├── packages/
│   │
│   │  # ── Domain packages (pure TS, zero UI) ──
│   ├── domain-tasks/             # Task types, rules, events, Firestore ops
│   ├── domain-projects/          # Project hierarchy, dependencies
│   ├── domain-queue/             # Queue ordering, active task logic
│   ├── domain-spaces/            # Domains/Spaces, info categories
│   ├── domain-artifacts/         # Artifact metadata, AI extraction
│   ├── domain-integrations/      # Integration abstractions + specific impls
│   ├── domain-ai/                # AI pipeline, prompts, confidence scoring
│   ├── domain-events/            # Event sourcing core: types, replay, apply
│   │
│   │  # ── Infrastructure packages ──
│   ├── firebase/                 # Firestore client, auth, storage, config
│   ├── shared-types/             # Cross-domain types (UserId, Timestamp, etc.)
│   ├── config/                   # Shared TS, ESLint, Prettier config
│   │
│   │  # ── UI packages ──
│   ├── design-tokens/            # Colors, spacing, typography (platform-agnostic)
│   ├── ui-web/                   # React DOM component library
│   └── ui-mobile/                # React Native component library
│
├── docs/                         # Knowledge graph (unchanged)
├── agents/                       # Agent manifests (unchanged)
├── surfaces/
├── prototypes/
├── observations/
├── turbo.json                    # Build orchestration
└── pnpm-workspace.yaml           # Workspace config
```

### Dependency rules

```
domain-*    → shared-types, firebase, domain-events
              (peer domains only via events — never direct imports)
ui-web      → design-tokens, domain-* (reads types/hooks, never writes)
ui-mobile   → design-tokens, domain-* (reads types/hooks, never writes)
apps/*      → domain-*, ui-*, firebase (composition layer)
functions   → domain-*, firebase (no UI packages)
```

### Incremental start (Phase 1)

Start with fewer packages and split as complexity warrants:

```
packages/
├── domain-core/              # All domain logic in one package (split later)
├── domain-events/            # Event sourcing infrastructure
├── firebase/                 # Firestore client + helpers
├── shared-types/             # Cross-domain primitives
├── design-tokens/            # Visual constants
├── ui-web/                   # React DOM components
└── ui-mobile/                # React Native components
```

Split `domain-core/` into `domain-tasks/`, `domain-queue/`, `domain-spaces/`, etc. when any domain grows complex enough to warrant its own package boundary.

## Rationale

1. **Reinforces event-sourced architecture** — domain packages communicate via events, matching the Firestore event log pattern. Package boundaries enforce what the architecture already requires.
2. **Shared logic is first-class** — domain packages are pure TypeScript, imported by all apps and Cloud Functions. Business rules are single-source, not duplicated.
3. **Two products, one codebase** — Syntropy OS apps import all domain packages; Dev Platform apps import a relevant subset. Same packages, different composition.
4. **Independent deployment** — each app has its own build pipeline. Turborepo caching ensures only affected packages rebuild.
5. **Testable domains** — domain packages have zero React/RN dependencies. Unit-testable in plain Node.js.
6. **Incremental complexity** — start with `domain-core/` and split only when needed. No over-engineering on day one.

## Alternatives Considered

- **A: Flat Package Monorepo** — simpler but `core/` becomes a monolith; features scattered across packages.
- **B: Domain-Driven Vertical Slices** — strongest domain boundaries but UI-within-domains is awkward; too much overhead for a small team.
- **C: Platform-Centric Split** — clean product boundary but `foundation/` becomes a grab bag; weak feature boundaries within products.
- **E: Multi-Repo** — hardest deployment boundaries but devastating coordination tax for early-stage development with evolving types.

## Consequences

- Need to choose between Turborepo and Nx (separate decision).
- Domain packages must be disciplined about not importing peer domains directly — enforce via eslint-plugin-import or Nx boundary rules.
- Shared React hooks (e.g., `useTask`, `useQueue`) will likely live in domain packages, making them React-dependent. Acceptable trade-off — these hooks are consumed by apps, not by Cloud Functions. Can split into `domain-tasks/core` and `domain-tasks/react` sub-exports if needed.
- UI packages may need internal organization as they grow (by feature or by component type).
- The `docs/`, `agents/`, `observations/` directories remain in the same repo — they are the knowledge graph, not deployable code. If the repo becomes unwieldy, they could move to a separate workspace.

## Revisit Triggers

- Team grows beyond 3-4 engineers and products diverge significantly → consider Option C platform split.
- Individual domain packages exceed ~5K LOC → add internal structure from Option B.
- Dev Platform and Syntropy OS share less than 30% of domain code → consider splitting into separate repos.
