---
id: "arch-status-report-2026-03"
type: reference
title: "Platform Architecture Status Report — March 2026"
status: active
owner: architecture-agent
created: 2026-03-01
updated: 2026-03-01
refs:
  related: [arch-index, manifesto, principles, adr-006, coherence-engine, dp16, dp17, dp18]
tags: [architecture, status-report, north-star, platform]
---

# Platform Architecture Status Report — March 2026

> A comprehensive analysis of where we are in the effort to design the full Syntropy OS platform architecture, services, and system of work.

## Executive Summary

Syntropy OS has completed a massive specification and architectural design effort across 30+ efforts, producing **329 markdown documents**, **~4,700 lines of Rust code**, **18 domain agents**, **21 executable workflows**, and a fully operational workspace platform bootstrap. The project has transitioned from a monolith product spec to a living, interconnected knowledge graph with machine-checkable contracts, generated tool adapters, and drift-gated CI.

**Current phase**: Discovery + Specification + Bootstrap Implementation.
**Architecture decision posture**: Rust-first foundation shipping; app/backend stack intentionally deferred (ADR-006).
**Key recent milestone**: Experience Layer, Personality Layer, and Coherence Engine fully documented (Efforts 29-30).

---

## 1. The Vision — What We're Building

### 1.1 Core Mission

Syntropy OS is a **self-learning, human-AI collaborative system** that removes mental overhead from life by automating personal and professional task management through intelligent agents, event sourcing, and continuous personalization.

### 1.2 Three Philosophical Pillars (Manifesto)

| Pillar | Meaning |
|--------|---------|
| **Human-AI Collaboration** | AI acts as personal assistant with confidence-based autonomy; humans always remain in control |
| **Event Sourcing & Transparency** | Every action (human or AI) is immutably logged; trust through visibility |
| **Continuous Evolution** | System learns from every interaction; trainable, correctable, personalizable |

### 1.3 Ten Design Principles

1. **One Card at a Time** — reduce cognitive load
2. **Confidence-Based Handoff** — AI-human spectrum shifts with trust
3. **Capture Once, Organize Everywhere** — many-to-many linking
4. **Permanent Domains, Temporary Projects** — context never lost
5. **Event-Sourced Everything** — immutable, derived state
6. **Transparency Over Magic** — explainable AI actions
7. **Progressive Autonomy** — earn trust through accuracy
8. **Platform Parity, Surface Adaptation** — shared logic, adapted UX
9. **Dependencies as First-Class Citizens** — explicit task relationships
10. **Corrections as Training Data** — every correction improves the system

### 1.4 Jobs to Be Done — User Level (7 Jobs)

| ID | Job |
|----|-----|
| J1 | Remove mental overhead — single system for everything |
| J2 | Never lose track of commitments |
| J3 | Automate myself where possible |
| J4 | Maintain control while delegating to AI |
| J5 | Build a personal knowledge & action system |
| J6 | Have everything about a life domain at fingertips |
| J7 | Capture once, organize everywhere |

---

## 2. The Four-Layer Architecture

Syntropy is designed as four independent layers that collectively create an integrated system:

```
┌─────────────────────────────────────────────┐
│  Layer 4: EXPERIENCE LAYER                  │
│  Core loops, progression, discovery,        │
│  narrative, companion, social               │
├─────────────────────────────────────────────┤
│  Layer 3: PERSONALITY LAYER                 │
│  Agent archetypes, voice, flavor,           │
│  memory, moments, procedural generation     │
├─────────────────────────────────────────────┤
│  Layer 2: SYSTEM OF WORK LAYER              │
│  Domains, workflows, signals,               │
│  verification, context                      │
├─────────────────────────────────────────────┤
│  Layer 1: PLATFORM LAYER                    │
│  Code, infrastructure, CI/CD,              │
│  APIs, data storage                         │
└─────────────────────────────────────────────┘
```

### 2.1 Platform Layer (Layer 1) — Status: Bootstrap Shipping

The foundational layer. Currently focused on workspace platform tooling (Rust SDK + CLI). App/backend stack intentionally deferred per ADR-006.

**What's built:**
- `syntropy-sdk` Rust library (config, model, workspace, blueprint, validation, readmes, docs, agents, paths)
- `syntropy` CLI binary (tree, info, describe, validate, check, gen readmes/agents/all)
- `syntropy.toml` workspace contract system
- Bazel build integration (bzlmod, rules_rust)
- North-star repository layout with folder contracts
- Drift-gated README generation and tool adapter generation

**What's designed but not built:**
- Data model (storage-agnostic: Spaces, Projects, Tasks, Artifacts, Events)
- Event sourcing engine (append-only immutable log, materialized views)
- AI pipeline (ingest → analyze → decide → execute → learn)
- Offline strategy (local-first, optimistic UI, write queue)
- Security & auth (OAuth, data isolation, token management)
- Integration roadmap (6 phases: Gmail → Calendar → Slack → GitHub → Financial → IoT)

**What's intentionally deferred:**
- App frontend stack (React Native? Web?)
- Backend storage (Firestore? PostgreSQL? SQLite+sync?)
- Auth provider (Firebase Auth? Auth0? Clerk?)
- IaC and deployment

### 2.2 System of Work Layer (Layer 2) — Status: Operational

The methodology layer. **This layer is live and being used today** to build Syntropy itself.

**What's operational:**
- 18 domain agents with trait composition (meta, product, architecture, UX, integration, workspace-contracts, observations, pulse-companion, decisions, cognitive-engineering, operational-engineering, devex, bazel, tasks, + 3 feature agents)
- 21 executable workflows (feature inception, document management, decision recording, observation capture, reflection, agent creation, domain sync, etc.)
- Knowledge graph with 329 markdown files, YAML frontmatter, bidirectional references
- Generated tool adapters for Claude Code (`.claude/`) and OpenAI Codex (`.codex/`)
- Execution contract defining canonical source-of-truth model
- Convention system with document taxonomy, status lifecycles, naming rules, templates

### 2.3 Personality Layer (Layer 3) — Status: Fully Designed

The character layer. Documented across 1 vision doc, 1 feature spec, 1 architecture doc, and 9 module deep-dives.

**Key design decisions:**
- **Procedural personality** (Borderlands insight) — personality emerges from systems, not content
- **Five-layer stack**: Function (sacred) → Tone (platform-wide) → Brand (per-role) → Voice (per-agent) → Moments (memory-tracked)
- **Five role archetypes**: Navigator, Artisan, Scout, Sentinel, Custodian
- **Six design pillars**: Function Is Sacred, Character in Margins, One Sentence Max, Warmth Over Wit, Earned Not Imposed, Pattern Breakage Budget
- **Performance target**: <10ms per personality enrichment
- **Configuration levels**: Off / Minimal / Professional / Full

### 2.4 Experience Layer (Layer 4) — Status: Fully Designed

The satisfaction layer. Documented across 1 vision doc, 1 feature spec, 1 architecture doc, and 11 module deep-dives.

**Key design decisions:**
- **Games not gamification** — agency, mastery, discovery, expression, belonging, purposeful progress
- **Apprenticeship over dependency** — system makes you the best version of yourself
- **Core loops**: Moment (seconds-minutes), Session (hours-days), Adventure (weeks-months)
- **Companion evolution**: Interface → Translator → Navigator → Spirit Animal
- **Hard rules**: No fake progress, no attention hijacking, no social pressure, no addiction mechanics, off switch works, AI routes toward humans

**Modules designed:**
Core Loops, Apprenticeship, Progression (Pattern Journal, Emergent Archetypes, Loot), Companion, Social (Guilds), World Map (Fog of War, Discovery), Narrative (Quests, Lore), Expression & Crafting, Anti-Patterns, Phasing, Feature Derivation

---

## 3. Product Specifications — Complete Inventory

### 3.1 Core Product (Syntropy OS App)

| Category | Count | Status |
|----------|-------|--------|
| Features (F01-F12) | 12 | 8 P0 (MVP), 4 P1 |
| Use Cases (U01-U10) | 10 | All defining |
| User Stories (S01-S16) | 16 | All defining |
| UX Patterns | 7 | All defining |

**P0 Features (MVP):**
- F01 Task Card System — card-by-card queue interface
- F02 Recursive Task Hierarchy — epics, projects, sub-tasks, dependencies
- F03 Gmail/Google Workspace Integration — email → cards
- F04 AI Action Engine — confidence-based suggestions/auto-execution
- F06 Event Sourcing & Audit Trail — immutable event log
- F08 Cross-Platform — React Native + Web
- F10 Confidence Thresholds & Trust Controls
- F11 Domains/Spaces — persistent life contexts

**P1 Features:**
- F05 Quick Capture (voice, text, photo)
- F07 Self-Learning System
- F09 Follow-Up Tasks & Dependencies
- F12 Artifact Intelligence (upload → extract → link)

### 3.2 Dev Platform (as Product)

| Category | Count |
|----------|-------|
| Jobs to Be Done (DJ1-DJ21) | 21 |
| Features (DP01-DP18) | 18 |
| Module Deep-Dives | 20 (11 experience + 9 personality) |
| Use Cases (DP-U01 to DP-U17) | 17 |
| User Stories (DP-S01 to DP-S49) | 49 |

**Feature categories:**
- Foundation: Knowledge Graph, Agent System, Workflow Engine, Registry, Conventions, Surfaces, Prototypes, Entry Point Routing
- Domain Operations: Domain Context Sync, Observation System, Reflection Loop, Pulse Companion, Decision Records
- Methodology: Cognitive Engineering, Operational Engineering
- Satisfaction Architecture: Experience Layer, Personality Layer
- System Health: Coherence Engine

### 3.3 Repo Platform (as Product)

| Category | Count |
|----------|-------|
| Jobs to Be Done (RJ1-RJ10) | 10 |
| Features (RP01-RP10) | 10 |
| Use Cases (RP-U01 to RP-U07) | 7 |
| User Stories (RP-S01 to RP-S19) | 19 |

Covers: toolchain management, workspace/module management, build orchestration, project configuration, dev/build containers, IaC, version control, CI/CD, code quality.

### 3.4 Workspace Platform (as Product)

| Category | Count | Status |
|----------|-------|--------|
| Jobs to Be Done (WJ1-WJ10) | 10 | Active |
| Features (WP01-WP08) | 8 | 3 building, 5 exploring |
| Use Cases (WP-U01 to WP-U07) | 7 | All defining |
| User Stories (WP-S01 to WP-S24) | 24 | All defining |

**Building (bootstrap v0):** WP01 Workspace Contract, WP03 Validation Engine, WP05 Scaffolding & Generators
**Exploring:** WP02 Workspace Instance, WP04 Plan/Apply Engine, WP06 Migrations, WP07 State & Hydration, WP08 Schema System

---

## 4. Architecture Documents — Complete Inventory

12 architecture documents covering every major subsystem:

| Document | Status | Summary |
|----------|--------|---------|
| Data Model | Defining | Storage-agnostic: Spaces, Projects, Tasks, Artifacts, Events |
| Event Sourcing | Defining | Append-only immutable log, materialized views, event replay |
| AI Pipeline | Exploring | 5-stage pipeline (ingest→analyze→decide→execute→learn), domain agents, cost control |
| Offline Strategy | Defining | Local-first, optimistic UI, write queue, conflict resolution |
| Security & Auth | Defining | OAuth, data isolation, token encryption, client-side security |
| Integration Roadmap | Defining | 6-phase: Gmail → Calendar → Slack → GitHub → Financial → IoT |
| Workspace Contracts | Defining | Contract-first, 4 v0 contracts, 6 validation layers |
| Plan/Apply Engine | Defining | Transactional mutations, PatchSets, atomicity guarantees, rollback |
| North Star Layout | Defining | 5-category mental model, dependency direction, fold contracts |
| Personality Layer | Exploring | 5-layer stack, procedural generation, novelty tracking |
| Experience Layer | Exploring | Core loops, progression, companion, social, world map, narrative |
| Technology Stack | Defining | Rust-first (current), app/backend deferred |

---

## 5. Decision Log — What's Been Decided

### 5.1 Active Decisions (Currently Guiding Development)

| ID | Decision | Date | Impact |
|----|----------|------|--------|
| ADR-003 | Claude as Primary LLM (OpenAI fallback) | 2025-02-07 | All AI features use Claude API |
| ADR-006 | Rust-First Foundation; App/Backend Deferred | 2026-02-24 | Only Rust code is production; Firebase is candidate, not decision |
| DR-001 | Repo Structure Contract + Folder Contracts | 2026-02-23 | Schema-backed, code-first, compositional inheritance |
| DR-002 | Verb-First CLI Command Grammar | 2026-02-23 | `gen`, `validate`, `check`, `plan`, `apply`, `migrate` |
| DR-003 | Generated Registry + Docs Sync + Rust Gate | 2026-02-23 | Bidirectional refs enforced, registry generated, `syntropy check` single gate |
| DR-004 | Coherence Engine Three-Mode Architecture | 2026-02-25 | Passive monitoring + active integration + session management |

### 5.2 Superseded Decisions (Historical Context)

| ID | Was | Superseded By | Date |
|----|-----|---------------|------|
| ADR-001 | Firebase as Backend | ADR-006 | 2026-02-24 |
| ADR-002 | Event Sourcing on Firestore | ADR-006 | 2026-02-24 |
| ADR-004 | Hybrid Domain-Package Monorepo (Node/Nx/TS) | ADR-006 | 2026-02-24 |
| ADR-005 | Dev/Build Container Strategy (Node-based) | ADR-006 | 2026-02-24 |

### 5.3 Key Architectural Invariants

1. Events are the source of truth (append-only, immutable)
2. Storage-agnostic (data model independent of backend)
3. Offline-first (optimistic UI, background sync)
4. Single-user data isolation (each user's data completely isolated)
5. Contract-driven boundaries (machine-checkable schema at every boundary)
6. Four-layer architecture (Platform, System of Work, Personality, Experience)
7. Plan/Apply transactions (all mutations previewed, validated, applied atomically)
8. Self-building (system improves through use)

---

## 6. Open Questions — What's Not Yet Decided

Five open questions remain in draft status, all requiring exploration:

| ID | Question | Domain | Impact |
|----|----------|--------|--------|
| OQ-Conflict-Resolution | AI undo mechanisms when AI auto-acts incorrectly | Product | Trust, progressive autonomy |
| OQ-Monetization | Subscription model, tiers, free tier design | Business | Revenue, cost sustainability |
| OQ-Notification-Strategy | Alert users without creating noise | Product | Core UX paradox |
| OQ-Multi-User | Single-user only, or teams/shared projects? | Architecture | Data model, permissions, security |
| OQ-Privacy-Model | Where does AI processing happen? Data ownership? | Architecture | Trust, GDPR/CCPA, legal |

**Dependency analysis:** OQ-Monetization depends on ADR-003 (LLM costs drive pricing). OQ-Privacy depends on eventual backend choice. OQ-Multi-User is scope-defining and affects nearly every system component. These questions become critical when the app/backend stack decision is made.

---

## 7. The Coherence Engine — Newest Major Design (Effort 30)

The Coherence Engine addresses the meta-challenge: **how to move fast without losing the map.**

### Five Root Problems

1. **Capture Gap** — insights occur faster than they integrate into the system
2. **Semantic Drift** — structural validation works; semantic alignment doesn't
3. **Tuesday Morning Problem** — context recovery at session boundaries
4. **Tribal Knowledge** — reasoning lives in heads, not in the graph
5. **Force Multiplier** — enabling others to operate with correct judgment

### Seven New Jobs (DJ15-DJ21)

| Job | Description |
|-----|-------------|
| DJ15 | Integrate insights automatically into knowledge graph |
| DJ16 | Detect and surface semantic drift |
| DJ17 | Instant context recovery at session boundaries |
| DJ18 | Make every decision traceable principle → design → implementation |
| DJ19 | Enable correct judgment transfer |
| DJ20 | Maintain real-time bird's eye view |
| DJ21 | Ensure system of work evolves through its own principles |

### Implementation Phasing

| Phase | What | When |
|-------|------|------|
| Phase 0 | Session protocol as manual workflows | Now |
| Phase 1 | `syntropy coherence` CLI (structural + semantic validation) | Next |
| Phase 2 | Integration assistant (insight → changeset) | Soon |
| Phase 3 | Bird's eye dashboard | Later |
| Phase 4 | Calibration loop (agent decision review) | Eventually |

---

## 8. System of Work — The Meta-System

### 8.1 Agent System

18 domain agents organized by responsibility:

```
system/
├── meta-agent (orchestration, routing, knowledge graph integrity)
├── tasks-agent (planning, verification, decomposition)
│
├── product/ (product-agent, f04-ai-engine, f11-domains, f12-artifact)
├── architecture/ (architecture-agent)
├── ux/ (ux-agent)
├── integration/ (integration-agent)
├── workspace-contracts/ (workspace-contracts-agent)
├── bazel/ (bazel-agent)
├── devex/ (devex-agent)
├── decisions/ (decisions-agent)
├── observations/ (observations-agent)
├── pulse-companion/ (pulse-companion-agent)
├── cognitive-engineering/ (cognitive-engineering-agent)
└── operational-engineering/ (operational-engineering-agent)
```

Each agent has: `AGENT.md` (identity, scope, authority), `CONTEXT.md` (living state), `POLICY.md` (invariants, rules), `OWNER.md` (DRI pointer).

### 8.2 Workflow System

21 executable workflows organized by category:

**Building the Knowledge Graph** (6): add-feature, add-knowledge-document, feature-inception, decompose-spec, refine-story
**Maintaining the Knowledge Graph** (6): update-document, maintain-glossary, validate-knowledge-graph, sync-generated-artifacts, evolve-conventions
**Decisions & Questions** (3): record-decision, make-architecture-decision, resolve-open-question
**Agents & Domains** (3): create-agent, sync-domain-context, domain-review
**Observations & Reflection** (3): capture-observation, audit-observations, reflect
**Workspace Platform** (3): design-workspace-contract, run-syntropy-cli, implement-syntropy-command

### 8.3 Surfaces

5 surfaces defined:

| Surface | Type | Status |
|---------|------|--------|
| Mobile (iOS/Android) | Product | Defining |
| Web (Desktop) | Product | Defining |
| Dev Platform | Development | Active |
| Repo Platform | Development | Active |
| Workspace Platform | Development | Active |

---

## 9. Implementation State — What's Actually Built

### 9.1 Rust Codebase

**~4,700 lines of Rust** across 12 source files:

| Component | Location | Lines | Function |
|-----------|----------|-------|----------|
| `syntropy-sdk` | `platform/crates/syntropy-sdk/` | ~3,700 | Config parsing, model, workspace discovery, blueprint, validation, README gen, docs integrity, agent adapter gen |
| `syntropy` CLI | `products/command-center/apps/cli/` | ~1,000 | Binary entry point, subcommands, JSON mode |

**CLI Commands (v0):**
- `syntropy info <path>` — show folder metadata
- `syntropy tree <path>` — human-readable or JSON tree
- `syntropy describe <path>` — describe path purpose
- `syntropy validate` — run all validation checks
- `syntropy check` — CI entrypoint (drift gates + validation)
- `syntropy gen readmes [--check]` — generate/check folder READMEs
- `syntropy gen agents [--check]` — generate/check Claude+Codex adapters
- `syntropy gen all` — run all generators
- All commands support `--json` mode for machine consumption

### 9.2 Build Infrastructure

- **Cargo workspace** with 2 crates (SDK + CLI)
- **Bazel** (bzlmod with rules_rust) kept green as secondary build
- **Rust edition 2021**, version pinned via `rust-toolchain.toml`
- **Dev container** available for VS Code / Cursor / Codespaces

### 9.3 Knowledge Graph Infrastructure

- **329 markdown files** with YAML frontmatter
- **Bidirectional cross-references** enforced by `syntropy check`
- **Generated registry** (`docs/_registry.md`) — deterministic projection of frontmatter
- **Append-only changelog** (`docs/_changelog.md`) — 273 entries tracking all graph evolution
- **Convention system** (`docs/_conventions.md`) — document types, templates, naming rules, status lifecycles
- **Glossary** (`docs/vision/glossary.md`) — 50+ canonical term definitions

---

## 10. Evolution Timeline — How We Got Here

### Phase 1: Foundation (Feb 7, 2025)
- Extracted monolith product spec into knowledge graph
- Created 12 features, 10 use cases, 16 user stories, 6 UX patterns
- Established 7 architecture docs, 3 ADRs, 5 open questions
- Created initial agent system (8 agents) and 6 workflows

### Phase 2: Dev Platform as Product (Feb 9, 2025)
- Documented dev platform with JTBD (DJ1-DJ10), features (DP01-DP12)
- Created observation system, reflection loop, pulse companion, decision records
- Added observations-agent, pulse-companion-agent, decisions-agent
- Explored and decided monorepo architecture (ADR-004, later superseded)

### Phase 3: Methodology Layer (Feb 13, 2025)
- Added cognitive engineering (DP14) and operational engineering (DP15)
- Created specialized agents for each methodology domain
- Extended JTBD to DJ13

### Phase 4: Workspace Platform (Feb 21, 2026)
- Created workspace platform product documentation (WJ1-WJ10, WP01-WP08)
- Built bootstrap Rust implementation (syntropy-sdk + CLI)
- Established canonical agent system in `.syntropy/system-of-work/`
- Created workspace-contracts-agent

### Phase 5: Repo Structure Hardening (Feb 23, 2026)
- DR-001 (repo structure contract + folder contracts)
- DR-002 (verb-first CLI grammar)
- DR-003 (generated registry + docs sync + Rust-first gate)
- Folder contract inheritance, README drift gates

### Phase 6: Rust-First Pivot (Feb 24, 2026) — Effort 29
- ADR-006 superseded Firebase/Node/Nx scaffolding
- Removed all placeholder scaffolding
- Rewrote architecture docs to be backend/storage-agnostic
- **Experience Layer fully documented** (vision + feature + architecture + 11 modules)
- **Personality Layer fully documented** (vision + feature + architecture + 9 modules)
- Added 21 glossary terms, 6 new workflows

### Phase 7: Coherence Engine (Feb 25, 2026) — Effort 30
- Created Coherence Engine vision document
- Extended JTBD to DJ21 (coherence axis: DJ15-DJ21)
- Created DP18 Coherence Engine feature spec
- DR-004 three-mode architecture decision
- Added 10 new glossary terms
- Full cross-reference integrity pass

---

## 11. Quantitative Summary

| Metric | Count |
|--------|-------|
| Total markdown documents | 329 |
| Architecture documents | 12 |
| Vision documents | 10 |
| Product features (all platforms) | 48 (12 + 18 + 10 + 8) |
| Use cases (all platforms) | 41 (10 + 17 + 7 + 7) |
| User stories (all platforms) | 108 (16 + 49 + 19 + 24) |
| Module deep-dives | 20 (11 experience + 9 personality) |
| UX patterns | 7 |
| JTBD (all levels) | 48 (7 + 21 + 10 + 10) |
| Architecture decisions (ADRs) | 6 (2 active, 4 superseded) |
| Decision records (DRs) | 4 (all active) |
| Open questions | 6 (5 draft, 1 resolved) |
| Domain agents | 18 |
| Executable workflows | 21 |
| Surfaces defined | 5 |
| Glossary terms | 50+ |
| Changelog entries | 273 |
| Rust source files | 12 |
| Lines of Rust code | ~4,700 |
| Prototypes (JSX) | 5 |

---

## 12. What's Next — The Frontier

### 12.1 Immediate (Active Threads)

1. **Coherence Engine Phase 0** — codify session protocol as executable workflows (`wf-begin-session`, `wf-end-session`)
2. **Bootstrap hardening** — continue refining `syntropy check`, validation engine, workspace state hydration
3. **PR #149 review** — full north-star architecture review for the fireweed-platform repo

### 12.2 Near-Term (Next Decisions Required)

1. **App/backend stack decision** — the big deferred choice from ADR-006. Candidates: Firebase, PostgreSQL + custom, SQLite + sync, Supabase. This unlocks all the product architecture docs.
2. **Multi-user scope** (OQ-Multi-User) — single-user only or team features? Affects data model fundamentally.
3. **Privacy model** (OQ-Privacy-Model) — cloud processing vs. on-device, GDPR/CCPA compliance architecture.

### 12.3 Medium-Term (Ready to Build When Stack Decided)

1. **Data model implementation** — the storage-agnostic model is fully designed
2. **Event sourcing engine** — the append-only log pattern is fully designed
3. **AI pipeline prototype** — ingest → analyze → decide → execute → learn
4. **Gmail integration** (Phase 1 of integration roadmap)
5. **Coherence Engine Phase 1** — `syntropy coherence` CLI command

### 12.4 Longer-Term (Designed, Not Yet Scheduled)

1. **Personality Layer implementation** — procedural generation pipeline
2. **Experience Layer implementation** — core loops, pattern journal, companion
3. **Integration Phases 2-6** — Calendar, Slack, GitHub, Financial, IoT
4. **Coherence Engine Phases 2-4** — integration assistant, dashboard, calibration loop

---

## 13. Architectural Risks and Considerations

### 13.1 Specification Depth vs. Implementation Gap

The specification corpus is extraordinarily deep (329 documents, 48 JTBD, 48 features, 108 stories). This is a strength for design clarity but creates risk if the specification becomes doctrine before implementation validates assumptions. The event sourcing, AI pipeline, and offline strategy designs are all untested by implementation.

**Mitigation:** ADR-006's decision to defer the app/backend stack is explicitly designed to prevent premature commitment. The workspace platform bootstrap validates the specification methodology on real code.

### 13.2 Backend Stack Decision — Critical Path

Many architecture documents were originally written assuming Firebase (ADR-001, ADR-002) and have been rewritten to be storage-agnostic. When the backend decision is made, significant re-specification will be needed for:
- Event sourcing implementation details
- Offline sync strategy
- Security rules enforcement
- Integration token storage
- Real-time sync mechanism

### 13.3 Coherence at Scale

The knowledge graph already has 329 files and 273 changelog entries. The Coherence Engine (DP18) is explicitly designed to address this — the five problems it identifies (capture gap, semantic drift, session recovery, tribal knowledge, force multiplication) are real and growing.

### 13.4 Single-User vs. Multi-User

The entire architecture assumes single-user data isolation. OQ-Multi-User is flagged as a scope-defining question that could affect nearly every component. This needs resolution before significant backend implementation.

---

## 14. Conclusion

The Syntropy OS platform architecture effort has produced a remarkably comprehensive and internally coherent design system. The four-layer architecture (Platform, System of Work, Personality, Experience) provides clear separation of concerns. The workspace platform bootstrap proves the specification methodology works against real code. The Coherence Engine addresses the meta-challenge of maintaining design integrity as the system grows.

The critical path forward is:
1. **Decide the app/backend stack** (the intentionally deferred ADR-006 choice)
2. **Resolve OQ-Multi-User** (scope-defining for data model)
3. **Prototype the AI pipeline** (the core differentiator)
4. **Ship the first product surface** (mobile or web with Gmail integration)

The specification work is mature. The next phase is implementation.
