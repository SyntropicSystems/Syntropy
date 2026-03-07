---
id: pm-lifecycle-analysis
type: analysis
title: "Comprehensive PM Lifecycle Analysis: Syntropy Product Management System"
status: active
created: 2026-03-07
updated: 2026-03-07
owner: product-agent
refs:
  depends-on:
    - docs/product/_index.md
    - docs/vision/manifesto.md
    - docs/vision/jtbd.md
    - .syntropy/system-of-work/ROUTER.md
---

# Comprehensive PM Lifecycle Analysis

## Purpose

This document provides a complete analysis of how Product Management works across the Syntropy system — from vision through feature specification, decision-making, workflow execution, agent orchestration, and continuous improvement. It maps the full lifecycle of how product ideas become specifications, how specifications become architecture, and how governance ensures coherence at every stage.

---

## 1. Vision & Strategic Foundation

### 1.1 Manifesto

Syntropy's vision (defined in `docs/vision/manifesto.md`) establishes the product as an **AI-native life operating system** — not a traditional task manager or productivity app. The core thesis:

> "Your life's information exists as fragments scattered across apps, notes, conversations, and memory. Syntropy makes these fragments work together."

**Five defining principles:**

1. **Everything Connects** — Information linked across life domains, not siloed
2. **AI That Learns You** — System grows more helpful through observation, not configuration
3. **Depth on Demand** — Simple surface, structured depth available when needed
4. **Capture Once, Organize Everywhere** — Single input, intelligent multi-domain filing
5. **Your System, Your Rules** — User controls automation boundaries and AI behavior

**Key product positioning:** Syntropy is anti-todo-list. It treats life management as an information problem, not a checkbox problem. The AI companion learns patterns, surfaces connections, and automates with user-controlled confidence thresholds.

### 1.2 Jobs to Be Done (JTBD)

Three JTBD documents provide strategic grounding:

**Core App JTBD** (`docs/vision/jtbd.md`) — 10 jobs:
- JTBD-001: Capture anything instantly without deciding where it goes
- JTBD-002: See what matters right now without manual prioritization
- JTBD-003: Find connections between life areas automatically
- JTBD-004: Track commitments without constant manual upkeep
- JTBD-005: Process email into actions without app-switching
- JTBD-006: Understand project status at a glance
- JTBD-007: Remember important details about people and commitments
- JTBD-008: Plan across life domains without multiple tools
- JTBD-009: Handle recurring responsibilities automatically
- JTBD-010: Review and reflect on progress naturally

**Dev Platform JTBD** (`docs/vision/jtbd-dev-platform.md`) — 7 jobs:
- JTBD-DP-001: Find relevant documentation instantly
- JTBD-DP-002: Execute workflows without memorizing procedures
- JTBD-DP-003: Understand decisions and their reasoning
- JTBD-DP-004: Onboard into a domain quickly
- JTBD-DP-005: Surface relevant patterns from observations
- JTBD-DP-006: Maintain system coherence as it evolves
- JTBD-DP-007: Reflect meaningfully on work patterns

**Workspace Platform JTBD** (`docs/vision/jtbd-workspace-platform.md`) — 5 jobs:
- JTBD-WP-001: Validate repo structure automatically
- JTBD-WP-002: Scaffold new components from templates
- JTBD-WP-003: Migrate when contracts change
- JTBD-WP-004: Configure workspaces declaratively
- JTBD-WP-005: Detect structural drift before it spreads

### 1.3 Glossary

`docs/vision/glossary.md` defines 40+ canonical terms (Space, Project, Task, Card, Artifact, Domain, Observation, Pulse, etc.) providing shared vocabulary across all product documents. Every specification must use these terms consistently.

### 1.4 Principles

`docs/vision/principles.md` establishes 16 design principles across 5 categories:
- **Information Architecture** (4): Everything connects, capture once organize everywhere, depth on demand, structured knowledge not free text
- **AI Philosophy** (4): AI learns you, confidence always visible, user corrections teach, human controls boundaries
- **Interaction** (3): One card at a time, progressive disclosure, function over decoration
- **System** (3): Offline-first mentality, event-sourced history, privacy by design
- **Development** (2): Grow by emergence, decisions are first-class

---

## 2. Product Specification System

### 2.1 Three-Platform Product Model

Syntropy documents three distinct product platforms:

**Core App** (`docs/product/_index.md`):
- 12 features (F01–F12) spanning task management, AI engine, integrations, artifact intelligence
- 10 use cases covering capture, daily review, project management, cross-domain AI
- 17 user stories in standard format

**Dev Platform** (`docs/product/dev-platform/_index.md`):
- 17 features (DP01–DP17) spanning documentation, agent system, workflows, decision records, observation system, reflection, pulse companion, cognitive/operational engineering
- 10 use cases for developer workflows
- 7 user stories

**Workspace Platform** (`docs/product/workspace-platform/_index.md`):
- 8 features (WP01–WP08) spanning contracts, validation, scaffolding, migration, plan/apply, CLI, blueprint, README drift
- 7 use cases for workspace management

### 2.2 Feature Specification Pattern

Every feature spec follows a consistent structure:
```
---
id: fNN-slug
type: feature-spec
title: Feature Name
status: exploring | defining | specified | implementing | stable
priority: P0 | P1 | P2
refs:
  satisfies: [JTBD references]
  depends-on: [dependencies]
  related: [related features]
---

## Problem Statement
## Solution Overview
## Detailed Behavior
## Data Model Impact
## AI Integration Points
## Open Questions
```

**Status lifecycle for features:**
- `exploring` → initial investigation, problem validation
- `defining` → behavior being specified, requirements emerging
- `specified` → complete specification, ready for implementation
- `implementing` → active development
- `stable` → shipped, in maintenance

**Priority system:**
- P0: MVP-critical, must ship for v1
- P1: Important, ship soon after MVP
- P2: Valuable, can wait

### 2.3 Feature Status Snapshot (as of last sync)

| Feature | Status | Priority | Description |
|---------|--------|----------|-------------|
| F01 Task Management | specified | P0 | Card queue, epic drill-down |
| F02 AI Suggestions | specified | P0 | Smart suggestions with confidence |
| F03 Gmail Integration | specified | P1 | Email → action pipeline |
| F04 AI Action Engine | exploring | P0 | Confidence scoring, domain agents |
| F05 Natural Language | specified | P0 | NL input processing |
| F06 Activity History | specified | P0 | Event-sourced timeline |
| F07 Learning System | exploring | P1 | Correction-driven learning |
| F08 Follow-ups | specified | P1 | Commitment tracking |
| F09 Dependencies | specified | P1 | Cross-entity dependency viz |
| F10 Smart Defaults | specified | P1 | Confidence thresholds |
| F11 Domains/Spaces | defining | P0 | Persistent life contexts |
| F12 Artifact Intelligence | defining | P1 | Capture once, organize everywhere |

### 2.4 UX Pattern Library

Seven canonical UX patterns defined in `docs/product/ux/`:
1. **Card Queue** — "One Card at a Time" primary interaction
2. **Epic Drill-Down** — Progressive disclosure into project depth
3. **AI Suggestion** — Confidence-scored AI recommendation display
4. **Spaces Navigation** — Domain/space switching and awareness
5. **Artifact Intelligence Flow** — 5-stage capture-to-action pipeline
6. **Follow-Up Capture** — Commitment extraction and tracking
7. **Dependency Visualization** — Cross-entity relationship display

Each pattern references specific features and defines platform-specific adaptations (mobile vs web).

### 2.5 Module Deep-Dive System

Features with significant depth use a **module deep-dive** pattern with layer prefixes:

```
docs/product/dev-platform/features/dp16-experience-layer/
├── _index.md           (module overview)
├── xl-interaction.md   (XL: experience layer prefix)
├── xl-intelligence.md
├── xl-memory.md
└── ...
```

Layer prefixes documented: `xl-` (experience layer), `pl-` (personality layer). Each module has frontmatter linking to parent feature and siblings.

---

## 3. Decision System

### 3.1 Decision Record Types

Two decision record types, both in `docs/decisions/`:

**Architecture Decision Records (ADRs)** — prefix `adr-NNN`:
- ADR-001: Monorepo structure
- ADR-002: Event sourcing for activity history
- ADR-003: Claude as primary AI (with fallback strategy)
- ADR-004: Feature spec status lifecycle
- ADR-005: Module deep-dive pattern
- ADR-006: Rust-first foundation (replaces earlier Node/Nx decisions)

**Decision Records (DRs)** — prefix `dr-NNN`:
- DR-001: Repo structure contract
- DR-002: CLI grammar conventions
- DR-003: Generated registry pattern

### 3.2 Decision Lifecycle

```
proposed → accepted → [deprecated | superseded]
```

- **Proposed**: Under discussion, reasoning documented
- **Accepted**: Active, governs behavior
- **Deprecated**: No longer applicable (context changed)
- **Superseded**: Replaced by newer decision (must link successor)

### 3.3 Decision Governance

The `decisions` domain agent ensures:
- Every record has complete frontmatter (id, type, title, status, owner, decision-type, created, updated)
- Problem Statement and Decision sections always present
- No two accepted decisions contradict without documented exception
- Superseded records link to successors
- Parent-child relationships are bidirectional

### 3.4 Decision Workflows

Two formal workflows:

**`wf-record-decision`** (`docs/workflows/record-decision.md`):
1. Detect decision point
2. Check for existing decisions on topic
3. Draft record with problem statement, context, options, decision, consequences
4. Place in `docs/decisions/` with correct prefix
5. Update `docs/decisions/_index.md`
6. Cross-reference from affected domains

**`wf-make-architecture-decision`** (`docs/workflows/make-architecture-decision.md`):
1. Identify architectural concern
2. Research options with trade-offs
3. Document alternatives (even if obvious)
4. Draft ADR with full context
5. Review with affected domain agents
6. Accept and update architecture docs

---

## 4. Workflow System

### 4.1 Codified Workflows

22 workflows documented in `docs/workflows/`, organized by category:

**Core workflows** (triggered by any contributor):
- `wf-record-decision` — Capture a decision as a record
- `wf-make-architecture-decision` — Full ADR process
- `wf-resolve-open-question` — Close an open question with decision
- `wf-capture-observation` — Zero-barrier observation capture
- `wf-reflect` — Guided reflection on recent work

**Knowledge graph workflows**:
- `wf-update-document` — Modify any doc with proper cross-refs
- `wf-maintain-glossary` — Keep glossary current
- `wf-validate-knowledge-graph` — Check cross-reference integrity
- `wf-sync-generated-artifacts` — Regenerate tool adapters

**Domain hygiene workflows**:
- `wf-sync-domain-context` — Update a domain's CONTEXT.md
- `wf-domain-review` — Comprehensive domain health review

**Product workflows**:
- `wf-write-feature-spec` — Create new feature specification
- `wf-write-use-case` — Document a use case
- `wf-write-user-story` — Create user story in standard format
- `wf-update-product-index` — Keep product indexes current

**Agent/system workflows**:
- `wf-create-agent` — Define new domain agent
- `wf-run-syntropy-cli` — Execute syntropy CLI commands
- `wf-implement-syntropy-command` — Add new CLI command

**Observation workflows**:
- `wf-audit-observations` — Weekly observation triage

**System workflows** (in `.syntropy/system-of-work/`):
- `agents-sync` — Sync tool adapters from canonical specs
- `create-pr` — Turn changes into reviewable PR

### 4.2 Workflow Design Principles

From the `operational-engineering` domain:
- Every workflow executable by both humans and AI agents
- Verification steps are mandatory (not optional appendix)
- Small, reviewable commits preferred over sprawling diffs
- Workflows describe "what to do," not "how to think about it"

### 4.3 Workflow-to-Feature Mapping

Workflows satisfy dev platform features:
- DP03 (Workflow Engine): All `wf-*` workflows
- DP10 (Observation System): `wf-capture-observation`, `wf-audit-observations`
- DP11 (Reflection Loop): `wf-reflect`
- DP13 (Decision Records): `wf-record-decision`, `wf-make-architecture-decision`

---

## 5. Agent Orchestration System

### 5.1 Agent Hierarchy

```
meta-agent (system)
├── product-agent
│   ├── f04-ai-engine-agent
│   ├── f11-domains-agent
│   └── f12-artifact-agent
├── architecture-agent
│   └── integration-agent
├── ux-agent
├── workspace-contracts-agent
├── bazel-agent
├── devex-agent
├── tasks-agent
├── decisions-agent
├── observations-agent
│   └── pulse-companion-agent
├── cognitive-engineering-agent
│   └── pulse-companion-agent
└── operational-engineering-agent
```

### 5.2 Agent Manifest Pattern

Every domain agent has 5 canonical files:

| File | Purpose |
|------|---------|
| `AGENT.md` | Identity, load order, delegation graph |
| `OWNER.md` | DRI agent name, escalation target |
| `POLICY.md` | Autonomy boundaries, decision authority |
| `CONTEXT.md` | Living snapshot: focus, decisions, invariants, open threads |
| `workflows/README.md` | Index of domain-specific workflows |

### 5.3 Load Order Protocol

Every agent follows a deterministic context loading sequence:

```
EXECUTION_CONTRACT.md
  → system/_base-traits.md
    → domain/OWNER.md
      → domain/POLICY.md
        → domain/CONTEXT.md
          → [domain-specific sources]
```

Feature agents add their parent domain's AGENT.md:
```
EXECUTION_CONTRACT → _base-traits → product/AGENT.md → f04/OWNER → f04/POLICY → f04/CONTEXT
```

### 5.4 Base Traits (Inherited by All Agents)

Defined in `_base-traits.md`, every agent inherits:

**9 Rules:**
1. Single source of truth — one canonical location per fact
2. Frontmatter required — YAML metadata on every document
3. Bidirectional references — if A references B, B references A
4. Log all changes — document what changed and why
5. Decisions recorded — no significant decisions left inline
6. IDs stable — never reuse or renumber existing IDs
7. Escalation over assumption — ask rather than guess
8. Domain state hygiene — keep CONTEXT.md current
9. Uplevel others — make system better for next contributor

**Inherited workflows:** All 22 codified workflows available to every agent.

**Escalation protocol:** Route via ROUTER.md → hand off with context → escalate to meta-agent if unclear.

### 5.5 Governance: Autonomy vs. Escalation

Every domain's POLICY.md defines a two-tier authority model:

**Autonomous** (agent can do without asking):
- Content within its domain scope
- Specification structure and refinement
- Template and pattern evolution
- Feedback analysis

**Escalate** (must involve higher agent or human):
- Cross-domain changes
- Philosophy or principles changes
- Removals of core elements
- Breaking changes
- New features or feature types
- Security or privacy implications

### 5.6 Routing

`ROUTER.md` provides the routing table mapping 15 primary domains + 3 feature sub-domains to their agents. The meta-agent uses this to dispatch work to the correct domain agent.

---

## 6. Architecture Alignment

### 6.1 Technology Foundation

Per ADR-006 (Rust-First Foundation):
- **CLI/SDK**: Rust (`syntropy` CLI, `syntropy-sdk` library)
- **Build**: Bazel + Cargo (dual build system)
- **AI**: Claude (primary, per ADR-003)
- **App/backend**: Deferred (was Flutter/Firebase, now TBD)

### 6.2 Architecture Documents

`docs/architecture/` contains:
- `_index.md` — Architecture overview and document registry
- `data-model.md` — Entity model (Space, Project, Task, Card, Artifact, Event)
- `ai-pipeline.md` — AI processing architecture
- `integrations.md` — External integration patterns
- `security.md` — Security model
- `workspace-contracts.md` — Workspace validation system
- `plan-apply-engine.md` — Mutation engine design
- `north-star-layout.md` — Target repo structure

### 6.3 Product-to-Architecture Traceability

Architecture docs reference product features:
- Data model ← F01 (tasks), F06 (events), F11 (spaces), F12 (artifacts)
- AI pipeline ← F02 (suggestions), F04 (engine), F05 (NL), F07 (learning)
- Integrations ← F03 (Gmail), F08 (follow-ups)
- Security ← F10 (confidence thresholds), privacy model

---

## 7. Continuous Improvement Loop

### 7.1 Observation System

The observation system (`observations/` directory + DP10 feature) provides zero-barrier signal capture:

**Lifecycle:** `raw → structured → triaged → promoted/archived`

**Observation types:** Process, pattern, friction, insight, question, architecture, product, meta

**Promotion targets:** Observations can become:
- Open questions (`docs/open-questions/`)
- Feature specs (`docs/product/features/`)
- Decision records (`docs/decisions/`)
- Architecture changes (`docs/architecture/`)

### 7.2 Reflection Loop

The reflection workflow (`wf-reflect` + DP11) provides structured work review:
1. Review recent commits and changes
2. Identify patterns, friction points, wins
3. Capture observations from reflection
4. Surface signals for domain agents

The pulse companion agent (DP12) assists with Phase 1 reflection, growing toward continuous work companionship.

### 7.3 Knowledge Graph Integrity

Several mechanisms maintain coherence:
- `wf-validate-knowledge-graph` — Cross-reference integrity checks
- `wf-sync-domain-context` — Keep domain CONTEXT.md current
- `wf-domain-review` — Comprehensive domain health assessment
- CI drift checks — `cargo run -p syntropy -- gen agents --check`
- README drift gating — Checked-in READMEs match generated content

### 7.4 The Emergence Cycle

The system grows through a deliberate emergence pattern:

```
Observation (signal capture)
  → Pattern Detection (observation audit)
    → Decision (record-decision workflow)
      → Architecture (make-architecture-decision)
        → Product (write-feature-spec)
          → Implementation
            → Observation (new signals from use)
```

This cycle is not linear — any stage can feed back to any earlier stage. The key insight is that the system treats its own development process as a product, applying the same PM rigor to the development platform as to the core app.

---

## 8. Cross-Cutting Concerns

### 8.1 Open Questions

Active open questions tracked in `docs/open-questions/`:
- `oq-multi-user` — Multi-user/shared spaces model
- `oq-privacy-model` — Privacy boundaries for AI reading user data
- `oq-app-backend-stack` — Post-ADR-006 app/backend technology choice

These represent unresolved PM decisions that block or influence multiple features.

### 8.2 Conventions

`docs/_conventions.md` codifies:
- File naming (kebab-case, prefixed IDs)
- Frontmatter requirements (id, type, title, status minimum)
- Cross-referencing format (relative paths in `refs` block)
- Module type and layer prefix conventions
- Status values per document type

### 8.3 Registry

`docs/_registry.md` serves as the master index of all documents, organized by type. Updated via `wf-update-document` workflow. Provides global discoverability.

### 8.4 Changelog

`docs/_changelog.md` tracks significant changes to the documentation system itself, providing an audit trail of system evolution.

---

## 9. Maturity Assessment

### 9.1 What's Working Well

1. **Comprehensive specification system** — 37 features across 3 platforms, all following consistent patterns
2. **Decision traceability** — Every significant choice is an ADR/DR with full reasoning
3. **Agent governance** — Clear autonomy boundaries prevent scope creep
4. **Workflow codification** — 22 executable workflows covering the full PM lifecycle
5. **JTBD grounding** — Every feature traces back to a user job
6. **Knowledge graph integrity** — Bidirectional references, drift detection, validation workflows
7. **Self-documenting development** — The dev platform is documented as a product with the same rigor as the core app
8. **Base traits inheritance** — Consistent behavior across all domain agents

### 9.2 Current Gaps and Open Threads

1. **F04 (AI Engine) still exploring** — Core P0 feature without finalized architecture
2. **App/backend stack deferred** — ADR-006 chose Rust for platform, but app technology TBD
3. **Privacy model unresolved** — Blocks AI features that read external data
4. **Multi-user model unresolved** — Blocks shared spaces, collaboration features
5. **No implementation code yet** — System is entirely specification and tooling; no app code exists
6. **Cognitive engineering templates** — Domain established but no templates created yet
7. **Operational engineering audit** — Existing workflows not yet audited for actor-effectiveness
8. **Pulse companion Phase 1** — MVP scope still TBD

### 9.3 Lifecycle Stage Summary

| Area | Stage | Evidence |
|------|-------|----------|
| Vision & JTBD | Mature | 3 JTBD docs, manifesto, principles, glossary |
| Feature Specs | Active | 37 features, consistent format, status tracking |
| UX Patterns | Active | 7 patterns, prototypes exist |
| Decision System | Active | 6 ADRs, 3 DRs, 2 workflows |
| Agent System | Active | 16 domains, full governance model |
| Workflow System | Active | 22 codified workflows |
| Observation System | Establishing | Template exists, audit workflow defined |
| Workspace Platform | Active | CLI exists, contracts being hardened |
| Core App Implementation | Not Started | Specification only |
| Dev Platform Implementation | Partial | CLI/SDK in Rust, rest is specification |

---

## 10. How to Use This System (PM Playbook)

### 10.1 Adding a New Feature

1. Ground in JTBD — Which job(s) does this serve?
2. Run `wf-write-feature-spec` workflow
3. Assign priority (P0/P1/P2) based on MVP criticality
4. Create UX pattern if interaction is novel
5. Identify architecture impact → `wf-make-architecture-decision` if significant
6. Update product index → `wf-update-product-index`
7. Cross-reference from affected domains

### 10.2 Making a Product Decision

1. Check existing decisions (`docs/decisions/`)
2. Run `wf-record-decision` or `wf-make-architecture-decision`
3. Document alternatives even if choice seems obvious
4. Update affected CONTEXT.md files
5. Ensure no contradiction with existing accepted decisions

### 10.3 Evolving the System

1. Capture signal → `wf-capture-observation`
2. Detect pattern → `wf-audit-observations`
3. If significant → `wf-record-decision`
4. If architectural → `wf-make-architecture-decision`
5. If product-facing → `wf-write-feature-spec`
6. Reflect → `wf-reflect`

---

*This analysis covers the complete PM lifecycle as implemented in the Syntropy system-of-work. It is a living document — update it as the system evolves.*
