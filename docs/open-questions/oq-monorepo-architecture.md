---
id: "oq-monorepo-architecture"
type: open-question
title: "Monorepo Architecture — Code Organization Strategy"
status: resolved
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  affects: [arch-stack, f08]
  related: [adr-001, arch-data-model, arch-ai-pipeline]
  resolves-to: [adr-004]
tags: [architecture, monorepo, deployment, ddd]
---

# OQ: Monorepo Architecture — Code Organization Strategy

## Question

How should we organize the repository for production code, given two independently deployable products (Syntropy OS app + Dev Platform), multiple surfaces (mobile, web) per product, a shared Firebase backend, and significant shared domain logic?

## Context

### What we're deploying

| Deployable | Stack | Notes |
|------------|-------|-------|
| **Syntropy OS — Mobile** | React Native (Expo) | iOS + Android |
| **Syntropy OS — Web** | React (Vite) | Desktop browsers |
| **Dev Platform — Web** | React (Vite) | Knowledge graph tooling, agent UI |
| **Dev Platform — Mobile** | React Native (Expo) | Possible future surface |
| **Backend — Cloud Functions** | Node.js/TypeScript | Firebase serverless |
| **Shared AI Pipeline** | TypeScript | Claude/OpenAI orchestration |

### What's shared across deployables

- **TypeScript domain models** — Task, Project, Domain, Artifact, Event types
- **Firestore data access** — read/write patterns, query builders, security rule types
- **Event sourcing** — event definitions, event application logic, materialized view builders
- **AI pipeline** — prompt templates, confidence scoring, structured output parsing
- **Business rules** — queue ordering, confidence thresholds, domain routing
- **Auth** — Firebase Auth integration, OAuth token handling
- **Design tokens** — colors, spacing, typography (cross-platform)

### Constraints

1. **Independent deployment** — shipping a mobile fix must not require redeploying the web app or backend
2. **Shared business logic** — domain rules must be single-source, not duplicated across apps
3. **Two products** — Syntropy OS (end-user app) and Dev Platform (builder tooling) share core infrastructure but differ in features
4. **Cross-platform UI** — mobile and web share interaction patterns but not rendering
5. **Firebase backend** — Cloud Functions are a single deployable but serve all frontends
6. **Current state** — no production code yet; this is a green-field decision
7. **Small team** — overhead of multi-repo coordination is costly; developer experience matters

---

## Options

### Option A: Flat Package Monorepo

Classic monorepo organized by **technical concern**. Apps are thin shells; packages hold all logic.

```
syntropy/
├── apps/
│   ├── mobile/                   # Syntropy OS — React Native (Expo)
│   ├── web/                      # Syntropy OS — React (Vite)
│   ├── dev-web/                  # Dev Platform — React (Vite)
│   ├── dev-mobile/               # Dev Platform — React Native (Expo)
│   └── functions/                # Firebase Cloud Functions
├── packages/
│   ├── core/                     # Domain models, types, business rules
│   ├── firebase/                 # Firestore client, auth helpers
│   ├── ai/                       # Claude/OpenAI client, prompts
│   ├── events/                   # Event sourcing types + application logic
│   ├── ui-primitives/            # Cross-platform design tokens
│   ├── ui-web/                   # React DOM component library
│   ├── ui-mobile/                # React Native component library
│   └── config/                   # Shared ESLint, TS, Prettier config
├── docs/                         # Knowledge graph (unchanged)
├── agents/                       # Agent manifests (unchanged)
├── turbo.json
└── pnpm-workspace.yaml
```

**Tooling:** Turborepo or Nx + pnpm workspaces.

**Pros:**
- Simple, well-understood structure. Most JS/TS monorepo guides follow this pattern.
- Clear separation between deployables (`apps/`) and libraries (`packages/`).
- Easy to add new apps — just add to `apps/` and import packages.
- Excellent tooling support (Turborepo caching, Nx dependency graph).
- Low cognitive overhead for new contributors.

**Cons:**
- **Horizontal slicing** — a feature like "Gmail integration" is scattered across `core/`, `events/`, `ai/`, `ui-web/`, `ui-mobile/`, and `functions/`. No single place to reason about a domain.
- Packages tend to grow into monoliths over time (especially `core/`).
- Unclear boundaries — what goes in `core/` vs. `firebase/` vs. `events/`?
- Changing a domain concept (e.g., adding a field to Task) requires touching many packages.

**Best for:** Teams that want a proven pattern and prioritize simplicity over domain modeling.

---

### Option B: Domain-Driven Monorepo (Vertical Slices)

Organized by **business domain**. Each domain owns its types, logic, events, and even UI components. App shells compose domains.

```
syntropy/
├── domains/
│   ├── tasks/
│   │   ├── model/                # Task types, validation, business rules
│   │   ├── events/               # TaskCreated, TaskCompleted, etc.
│   │   ├── store/                # Firestore read/write for tasks
│   │   ├── ai/                   # Task-specific AI (action suggestions)
│   │   └── ui/                   # Task card components (cross-platform)
│   ├── queue/
│   │   ├── model/
│   │   ├── events/
│   │   ├── store/
│   │   └── ui/
│   ├── projects/
│   │   ├── model/
│   │   ├── events/
│   │   ├── store/
│   │   └── ui/
│   ├── spaces/
│   │   ├── model/
│   │   ├── events/
│   │   ├── store/
│   │   └── ui/
│   ├── ai-engine/
│   │   ├── model/
│   │   ├── pipeline/
│   │   ├── prompts/
│   │   └── confidence/
│   ├── integrations/
│   │   ├── gmail/
│   │   ├── calendar/
│   │   └── slack/
│   ├── artifacts/
│   │   ├── model/
│   │   ├── events/
│   │   ├── store/
│   │   └── ui/
│   └── events-core/              # Event sourcing infrastructure
│       ├── types/
│       ├── store/
│       └── replay/
├── apps/
│   ├── mobile/                   # Composes domains into mobile app
│   ├── web/                      # Composes domains into web app
│   ├── dev-web/                  # Composes subset of domains
│   ├── dev-mobile/
│   └── functions/                # Composes domain stores + event handlers
├── platform/
│   ├── firebase/                 # Firebase config, init, auth
│   ├── ui-primitives/            # Design system tokens
│   ├── ui-web/                   # React DOM rendering layer
│   ├── ui-mobile/                # React Native rendering layer
│   └── config/                   # Shared config
├── docs/
├── agents/
└── turbo.json
```

**Pros:**
- **Feature locality** — everything about "tasks" is in `domains/tasks/`. Adding a field to Task means changes in one place.
- Matches how the product is already specified (F01–F12 map to domains).
- Enforces domain boundaries — domains can't reach into each other's internals.
- Cross-domain communication happens through explicit events, which aligns with the event-sourced architecture.
- Each domain is independently testable.

**Cons:**
- **Cross-domain features are harder** — a task card in the queue that shows project info needs to compose `tasks/` + `projects/` + `queue/`. Where does that composition live?
- UI components that span domains (e.g., a card that shows task + project + space info) don't have a natural home.
- More upfront design work to get domain boundaries right.
- Risk of over-engineering for a small team — maintaining 8+ domain packages is overhead.
- `ui/` within each domain creates an awkward split: domain-specific React hooks/logic are separate from the rendering layer (`ui-web/` vs. `ui-mobile/`).

**Best for:** Teams committed to DDD with strong domain boundaries and event-driven communication between bounded contexts.

---

### Option C: Platform-Centric Split

Primary split is **product platform** vs. **dev platform**. Each platform owns its apps and shared code, with a common foundation.

```
syntropy/
├── foundation/                   # Shared by BOTH platforms
│   ├── types/                    # Core TypeScript types
│   ├── firebase/                 # Firestore, auth, storage clients
│   ├── events/                   # Event sourcing infrastructure
│   ├── ai/                       # AI pipeline client
│   └── design-tokens/            # Cross-platform visual constants
├── product/                      # Syntropy OS (end-user app)
│   ├── features/
│   │   ├── task-cards/           # F01
│   │   ├── project-hierarchy/    # F02
│   │   ├── gmail/                # F03
│   │   ├── ai-engine/            # F04
│   │   ├── quick-capture/        # F05
│   │   ├── queue/                # Queue management
│   │   ├── spaces/               # F11
│   │   └── artifacts/            # F12
│   ├── mobile/                   # React Native app shell
│   ├── web/                      # React Vite app shell
│   └── shared/                   # Shared between product mobile & web
│       ├── hooks/
│       ├── state/
│       └── components/
├── dev-platform/                 # Dev Platform (builder tooling)
│   ├── features/
│   │   ├── knowledge-graph/      # DP01
│   │   ├── agent-system/         # DP02
│   │   ├── workflow-engine/      # DP03
│   │   └── observation-system/   # DP10
│   ├── web/                      # Dev platform web app
│   ├── mobile/                   # Dev platform mobile (future)
│   └── shared/
├── backend/
│   ├── functions/                # Cloud Functions (serves both platforms)
│   └── scripts/                  # Deploy, seed, migrate scripts
├── docs/
├── agents/
└── turbo.json
```

**Pros:**
- **Clean product boundary** — clear what belongs to Syntropy OS vs. Dev Platform.
- Each product team can work independently within their subtree.
- Foundation packages are explicitly shared, making cross-product dependencies visible.
- Natural for independent deployment — `product/mobile/` deploys independently from `dev-platform/web/`.
- Maps to how users think about the products (they are different products).

**Cons:**
- **Duplication pressure** — when both products need similar patterns (state management, component structure), you either duplicate or keep pulling into `foundation/`.
- `foundation/` becomes a grab bag over time, similar to `core/` in Option A.
- Feature boundaries within each product are still not formalized — `product/features/` is just a convention, not a package boundary.
- Backend serves both products but lives outside both — ownership can be ambiguous.
- If a feature (e.g., observation capture) is used by both platforms, it doesn't have a clear home.

**Best for:** Organizations where the two products have distinct teams and lifecycles, and the main concern is product-level independence.

---

### Option D: Hybrid — Domain Packages + Platform Apps

Combines Option A's clean package structure with Option B's domain awareness. Domain logic is in packages organized by bounded context, apps compose them, and platform infrastructure is shared.

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
│   │  # ── Domain packages (business logic, zero UI) ──
│   ├── domain-tasks/             # Task types, rules, events, Firestore ops
│   ├── domain-projects/          # Project hierarchy, dependencies
│   ├── domain-queue/             # Queue ordering, active task logic
│   ├── domain-spaces/            # Domains/Spaces, info categories
│   ├── domain-artifacts/         # Artifact metadata, AI extraction
│   ├── domain-integrations/      # Integration abstractions + specific impls
│   ├── domain-ai/                # AI pipeline, prompts, confidence scoring
│   ├── domain-events/            # Event sourcing core: types, replay, apply
│   │
│   │  # ── Infrastructure packages (shared plumbing) ──
│   ├── firebase/                 # Firestore client, auth, storage, config
│   ├── shared-types/             # Cross-domain types (UserId, Timestamp, etc.)
│   ├── config/                   # Shared TS, ESLint, Prettier config
│   │
│   │  # ── UI packages (rendering layer) ──
│   ├── design-tokens/            # Colors, spacing, typography (platform-agnostic)
│   ├── ui-web/                   # React DOM component library
│   └── ui-mobile/                # React Native component library
│
├── docs/                         # Knowledge graph (unchanged)
├── agents/                       # Agent manifests (unchanged)
├── surfaces/
├── prototypes/
├── observations/
├── turbo.json
└── pnpm-workspace.yaml
```

**Package dependency rules:**

```
domain-* → shared-types, firebase, domain-events (peer domains via events only)
ui-web   → design-tokens, domain-* (reads types/hooks, never writes)
ui-mobile → design-tokens, domain-* (reads types/hooks, never writes)
apps/*   → domain-*, ui-*, firebase (composition layer)
functions → domain-*, firebase (no UI packages)
```

**Pros:**
- **Domain logic has a home** — `domain-tasks/` contains everything about tasks: types, validation, Firestore operations, events. Single source of truth.
- **Apps are thin** — they compose domain packages and UI packages. Adding a new surface means wiring existing packages into a new shell.
- **UI and domain are cleanly separated** — domain packages have zero React/RN dependencies. UI packages consume domain types.
- **Works for both products** — `apps/web/` imports all domain packages; `apps/dev-web/` imports a subset.
- **Independent deployment** — each app is its own build. Domain packages are internal dependencies, not deployed separately.
- **Scales incrementally** — start with fewer domain packages (e.g., just `domain-core/` at first), split as complexity warrants.
- **Testability** — domain packages are pure TypeScript, testable without any browser/device environment.

**Cons:**
- More packages to manage than Option A (but each is smaller and more focused).
- Need discipline to keep domain packages from importing each other directly (use events or shared-types for cross-domain communication).
- `domain-ai/` and `domain-events/` are infrastructure-like but live alongside business domains — naming helps but the boundary is soft.
- UI packages (`ui-web/`, `ui-mobile/`) can become monoliths if not further organized internally.

**Best for:** Teams that want domain-driven design benefits without full vertical slicing, and need a practical balance between structure and overhead.

---

### Option E: Multi-Repo with Shared Package Registry

Separate Git repositories per deployable. Shared code published as internal npm packages (GitHub Packages or Verdaccio).

```
# Separate repositories:

syntropy-core/              # @syntropy/core — domain models, types, events
syntropy-firebase/          # @syntropy/firebase — Firestore helpers
syntropy-ai/                # @syntropy/ai — AI pipeline client
syntropy-ui-web/            # @syntropy/ui-web — React DOM components
syntropy-ui-mobile/         # @syntropy/ui-mobile — RN components
syntropy-mobile/            # Syntropy OS mobile app
syntropy-web/               # Syntropy OS web app
syntropy-dev-web/           # Dev Platform web app
syntropy-functions/         # Firebase Cloud Functions
syntropy-docs/              # Knowledge graph (this repo)
```

**Pros:**
- **Hard deployment boundaries** — impossible to accidentally couple apps.
- Each repo has its own CI/CD pipeline, versioning, and release cycle.
- Clear ownership — each repo has a team/person responsible.
- No monorepo tooling needed — standard npm/yarn workflows.
- Works well at larger organizational scale.

**Cons:**
- **Coordination tax** — changing a type in `@syntropy/core` requires: publish new version → update in every consuming repo → verify integration. This is painful for a small team.
- Diamond dependency problems — app A pins `@syntropy/core@1.2` while app B pins `@syntropy/core@1.3`.
- Cross-repo PRs are difficult (e.g., adding a task field requires PRs in core, firebase, ui, web, mobile, functions).
- Loses atomic commits — can't commit a cross-cutting change as a single unit.
- Package registry infrastructure is additional overhead.
- Slows iteration dramatically in early development when types and interfaces are changing frequently.

**Best for:** Large organizations with dedicated teams per deployable and stable shared interfaces. Not recommended for early-stage projects with evolving data models.

---

## Comparison Matrix

| Criterion | A: Flat | B: Domain DDD | C: Platform | D: Hybrid | E: Multi-Repo |
|-----------|---------|---------------|-------------|-----------|----------------|
| **Feature locality** | Low | High | Medium | High | Low |
| **Domain boundaries** | Weak | Strong | Medium | Strong | Strong (forced) |
| **Simplicity** | High | Medium | Medium | Medium | Low |
| **Independent deploy** | Yes | Yes | Yes | Yes | Yes |
| **Cross-platform sharing** | Good | Complex | Good | Good | Complex |
| **Scales with team size** | Medium | High | Medium | High | High |
| **Iteration speed (early)** | Fast | Medium | Fast | Fast | Slow |
| **Avoids core/ monolith** | No | Yes | No | Yes | Yes |
| **Tooling maturity** | Excellent | Good | Good | Excellent | Excellent |
| **Cognitive overhead** | Low | High | Medium | Medium | High |
| **Two-product support** | Adequate | Good | Excellent | Good | Excellent |

---

## Current Thinking

**Option D (Hybrid)** appears to be the strongest fit given our constraints:

1. **Green-field advantage** — we can start with a simpler subset (e.g., 3-4 domain packages) and split as complexity grows, rather than committing to full DDD from day one.
2. **Matches our event-sourced architecture** — domain packages communicate via events, which is exactly how our Firestore event log works. The package structure reinforces the architecture.
3. **Shared business logic is first-class** — domain packages are pure TypeScript, shared by all apps and Cloud Functions. No duplication.
4. **Two products, one codebase** — Syntropy OS apps import all domain packages; Dev Platform apps import a relevant subset. Same packages, different composition.
5. **Small team friendly** — more structured than Option A but without Option B's overhead of domain-internal `model/`, `events/`, `store/`, `ui/` subdirectories for every bounded context.

**Possible evolutionary path:** Start with Option D. If the team grows and products diverge significantly, migrate toward Option C (platform split). If domains become very complex, add internal structure from Option B within individual domain packages.

### Starting simple — Phase 1 structure

For MVP, we don't need all domain packages immediately. A practical starting point:

```
packages/
├── domain-core/              # All domain types + logic (split later)
├── domain-events/            # Event sourcing infrastructure
├── firebase/                 # Firestore client + helpers
├── design-tokens/            # Visual constants
├── ui-web/                   # React DOM components
└── ui-mobile/                # React Native components
```

Then split `domain-core/` into `domain-tasks/`, `domain-queue/`, `domain-spaces/`, etc. as each domain grows complex enough to warrant its own package.

---

## Open Sub-Questions

1. **Tooling choice: Turborepo vs. Nx?** — Both support this structure. Turborepo is simpler; Nx has richer dependency analysis and code generation. Need to evaluate.
2. **Where do integration-specific Cloud Functions live?** — In `apps/functions/` importing from `domain-integrations/`? Or colocated in the domain package?
3. **Shared React hooks** — Should cross-platform hooks (e.g., `useTask`, `useQueue`) live in domain packages (making them React-dependent) or in a separate `hooks/` package?
4. **Dev platform features reusing product domains** — The Dev Platform's observation system and knowledge graph are unique, but it might also display tasks/projects. How much domain reuse is there?
5. **Docs and agents cohabitation** — The knowledge graph (docs/, agents/) currently lives in the same repo. Should it stay here or move to its own repo/workspace?

## Resolution Criteria

This question resolves into an ADR when:
- [ ] One option is selected with clear rationale
- [ ] Sub-questions 1–5 are answered or deferred with reasoning
- [ ] The initial package structure is defined
- [ ] Build/deploy pipeline sketch exists for at least mobile + web + functions
