# Syntropy OS

> A self-learning, human-AI collaborative system that removes mental overhead from life by automating personal and professional task management through intelligent agents, event sourcing, and continuous personalization.

## Navigation

- **Registry**: `docs/_registry.md` — master index of all documents (IDs, paths, status, ownership)
- **Conventions**: `docs/_conventions.md` — document templates, naming rules, formatting standards
- **Glossary**: `docs/vision/glossary.md` — canonical term definitions (shared language)
- **Changelog**: `docs/_changelog.md` — append-only log of all knowledge graph changes

## Repo Collaboration Agent System (System of Work)

Canonical source of truth:

- **Execution contract**: `.syntropy/system-of-work/EXECUTION_CONTRACT.md`
- **Router**: `.syntropy/system-of-work/ROUTER.md`
- **Canonical agents**: `.syntropy/system-of-work/domains/**`
  - Base traits: `.syntropy/system-of-work/domains/system/_base-traits.md`
  - System/router agent: `.syntropy/system-of-work/domains/system/AGENT.md`
  - Domain agents: `.syntropy/system-of-work/domains/*/AGENT.md`
  - Feature agents: `.syntropy/system-of-work/domains/product/features/*/AGENT.md`

Generated tool adapters (checked in; do not edit by hand):

- **Claude Code**: `.claude/agents/**`, `.claude/commands/**`
- **OpenAI Codex**: `.codex/**`

Regenerate adapters:

- `cargo run -p syntropy -- gen agents`
- drift check: `cargo run -p syntropy -- gen agents --check`

### Before working on any task

1. Read this file (you are here)
2. Read `.syntropy/system-of-work/EXECUTION_CONTRACT.md`
3. Use `.syntropy/system-of-work/ROUTER.md` to choose the domain
4. Load that domain’s brain:
   - `.syntropy/system-of-work/domains/<domain>/CONTEXT.md`
   - `.syntropy/system-of-work/domains/<domain>/POLICY.md`
   - `.syntropy/system-of-work/domains/<domain>/OWNER.md`
5. Follow the relevant workflow(s)

## Workflows

Executable process documents — same instructions work for humans and AI:

### Building the Knowledge Graph

- Add a feature: `docs/workflows/add-feature-spec.md`
- Add a knowledge document (vision, architecture, module): `docs/workflows/add-knowledge-document.md`
- Feature inception (full cross-cutting scope): `docs/workflows/feature-inception.md`
- Decompose a spec: `docs/workflows/decompose-spec.md`
- Refine a story: `docs/workflows/refine-user-story.md`

### Maintaining the Knowledge Graph

- Update any document: `docs/workflows/update-document.md`
- Maintain the glossary: `docs/workflows/maintain-glossary.md`
- Validate integrity: `docs/workflows/validate-knowledge-graph.md`
- Sync generated artifacts: `docs/workflows/sync-generated-artifacts.md`
- Evolve conventions: `docs/workflows/evolve-conventions.md`

### Decisions & Questions

- Record a decision: `docs/workflows/record-decision.md`
- Architecture decision: `docs/workflows/make-architecture-decision.md`
- Resolve a question: `docs/workflows/resolve-open-question.md`

### Agents & Domains

- Create an agent: `docs/workflows/create-agent.md`
- Sync domain context: `docs/workflows/sync-domain-context.md`
- Domain DRI review: `docs/workflows/domain-review.md`

### Observations & Reflection

- Capture observation: `docs/workflows/capture-observation.md`
- Audit observations: `docs/workflows/audit-observations.md`
- Reflect after work: `docs/workflows/reflect.md`

### Workspace Platform

- Design workspace contract: `docs/workflows/design-workspace-contract.md`
- Run the Syntropy CLI (bootstrap): `docs/workflows/run-syntropy-cli.md`
- Implement a Syntropy CLI command: `docs/workflows/implement-syntropy-command.md`

System-of-work maintenance workflows live under `.syntropy/system-of-work/domains/**/workflows/` and are surfaced as Claude slash commands in `.claude/commands/**` (generated).

## Principles

1. **Single source of truth** — every concept has one canonical file
2. **Entry point → router → graph** — follow links, don’t search; every scope has an entry file that routes to everything reachable from it
3. **Trait composition** — agents inherit base traits and compose their own; a specialized agent's entry file is its root
4. **Event-sourced development** — log decisions as ADRs; decisions are traceable, not ephemeral
5. **Bidirectional references** — if A refs B, B refs A; knowledge graph, not knowledge tree
6. **Low entropy growth** — add nodes and edges, don't restructure; the system grows by emergence

## Repository Structure

```
AGENTS.md                   ← you are here (root entry point)
CLAUDE.md                   ← shim for Claude users (points here)

.syntropy/                  ← workspace instance (checked-in human artifacts)
  system-of-work/           ← canonical system of work (agents, workflows, templates)

.claude/                    ← GENERATED tool adapters (Claude Code)
.codex/                     ← GENERATED tool adapters (OpenAI Codex)

docs/                       ← project knowledge graph
  vision/                   ← WHY: philosophy, motivation, language
  product/                  ← WHAT: features, use cases, stories, UX
    dev-platform/           ← dev platform as product
    repo-platform/          ← repo platform as product
    workspace-platform/     ← workspace platform as product
  architecture/             ← HOW: technical design, data model, stack
  decisions/                ← ADRs + decision records
  open-questions/           ← unresolved explorations
  workflows/                ← executable process documents

surfaces/                   ← surface definitions
prototypes/                 ← interactive React JSX design prototypes
observations/               ← raw signals: frictions, ideas, bugs, thoughts

platform/                   ← reusable foundation (Rust crates, contracts)
products/                   ← shipped surfaces built on the platform
```

## Dev Platform as Product

The development platform (this knowledge graph + system-of-work) is documented as a product itself:

- **JTBD**: `docs/vision/jtbd-dev-platform.md` — 24 jobs the dev platform fulfills (DJ1–DJ24)
- **Product Index**: `docs/product/dev-platform/_index.md` — feature map, use cases, stories
- **Surface**: `surfaces/dev-platform.md` — platform definition and principles

## Repo Platform as Product

The engineering infrastructure (build, containers, CI/CD, IaC) is documented as a product:

- **JTBD**: `docs/vision/jtbd-repo-platform.md` — 10 jobs the repo platform fulfills (RJ1–RJ10)
- **Product Index**: `docs/product/repo-platform/_index.md` — feature map, use cases, stories
- **Surface**: `surfaces/repo-platform.md` — platform definition and principles

## Workspace Platform as Product

The workspace contract and tooling layer (contracts, validation, scaffolding, plan/apply) is documented as a product:

- **JTBD**: `docs/vision/jtbd-workspace-platform.md` — 10 jobs the workspace platform fulfills (WJ1–WJ10)
- **Product Index**: `docs/product/workspace-platform/_index.md` — feature map, use cases, stories
- **Surface**: `surfaces/workspace-platform.md` — platform definition and principles
- **Architecture**: `docs/architecture/workspace-contracts.md`, `docs/architecture/plan-apply-engine.md`, `docs/architecture/north-star-layout.md`

## Workspace Platform Implementation (Bootstrap)

The bootstrap slice is implemented in Rust:

- **SDK**: `platform/crates/syntropy-sdk`
- **CLI**: `products/command-center/apps/cli` (binary: `syntropy`)
- **Workspace contract**: `syntropy.toml`

Run commands (Cargo):

- `cargo run -p syntropy -- info .`
- `cargo run -p syntropy -- tree . --depth 3`
- `cargo run -p syntropy -- gen readmes --dry-run`
- `cargo run -p syntropy -- gen readmes`
- `cargo run -p syntropy -- validate`
- `cargo run -p syntropy -- gen agents`
- `cargo run -p syntropy -- gen agents --check`
- JSON mode: add `--json` (e.g., `cargo run -p syntropy -- --json validate`)

## Current Status

- **Phase**: Discovery / Specification / Bootstrap implementation
- **Active areas**: Workspace Platform CLI + SDK, plus ongoing product/architecture documentation
- See `docs/_changelog.md` for recent activity
