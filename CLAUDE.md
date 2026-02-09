# Syntropy OS

> A self-learning, human-AI collaborative system that removes mental overhead from life by automating personal and professional task management through intelligent agents, event sourcing, and continuous personalization.

## Navigation

- **Registry**: `docs/_registry.md` — master index of all documents (IDs, paths, status, ownership)
- **Conventions**: `docs/_conventions.md` — document templates, naming rules, formatting standards
- **Glossary**: `docs/vision/glossary.md` — canonical term definitions (shared language)
- **Changelog**: `docs/_changelog.md` — append-only log of all knowledge graph changes

## Agent System

This project uses **trait-based agent composition**. Each agent inherits shared base traits and composes its own domain-specific context, rules, and workflows.

- **Base traits**: `agents/_base-traits.md` — context, rules, and workflows inherited by all agents
- **Router**: `agents/meta-agent.md` — orchestrator that routes work to the right domain agent
- **Domain agents**: `agents/*.md` — DRIs (Directly Responsible Individuals) for specific domains
- **Feature agents**: `agents/feature-agents/*.md` — specialized agents for deep feature work

### Before working on any task:

1. Read this file (done)
2. Read `agents/meta-agent.md` to understand routing
3. Identify the right agent for the task scope
4. Load that agent's manifest — follow its context cache, domain state, rules, and workflows

### Inheritance model:

```
_base-traits.md              ← every agent inherits this
  ├── meta-agent.md          ← orchestrator, knows all agents
  ├── product-agent.md       ← inherits base + own rules/workflows/context
  │   └── f11-domains-agent  ← inherits base + product + own specialization
  ├── architecture-agent.md
  ├── ux-agent.md
  └── integration-agent.md
```

## Workflows

Executable process documents — same instructions work for humans and AI:

- Add a feature: `docs/workflows/add-feature-spec.md`
- Architecture decision: `docs/workflows/make-architecture-decision.md`
- Refine a story: `docs/workflows/refine-user-story.md`
- Create an agent: `docs/workflows/create-agent.md`
- Resolve a question: `docs/workflows/resolve-open-question.md`
- Decompose a spec: `docs/workflows/decompose-spec.md`
- Sync domain context: `docs/workflows/sync-domain-context.md`
- Domain DRI review: `docs/workflows/domain-review.md`

## Principles

1. **Single source of truth** — every concept has one canonical file
2. **Entry point → router → graph** — follow links, don't search; every scope has an entry file that routes to everything reachable from it
3. **Trait composition** — agents inherit base traits and compose their own; a specialized agent's entry file IS its root
4. **Event-sourced development** — log decisions as ADRs, changes in the changelog; decisions are traceable, not ephemeral
5. **Bidirectional references** — if A refs B, B refs A; knowledge graph, not knowledge tree
6. **Low entropy growth** — add nodes and edges, don't restructure; the system grows by emergence

## Repository Structure

```
CLAUDE.md                   ← you are here (root entry point)
docs/                       ← all project knowledge
  vision/                   ← WHY: philosophy, motivation, language
  product/                  ← WHAT: features, use cases, stories, UX
    dev-platform/            ← dev platform as product (features, use cases, stories)
  architecture/             ← HOW: technical design, data model, stack
  decisions/                ← ADRs: logged decisions with rationale
  open-questions/           ← unresolved explorations
  workflows/                ← executable process documents
agents/                     ← sub-agent manifests (trait composition)
  feature-agents/           ← per-feature specialized agents
surfaces/                   ← surface definitions (mobile, web, dev platform)
prototypes/                 ← interactive React JSX design prototypes
```

## Dev Platform as Product

The development platform (this knowledge graph + agent system) is documented as a product itself:

- **JTBD**: `docs/vision/jtbd-dev-platform.md` — 7 jobs the dev platform fulfills (DJ1–DJ7)
- **Product Index**: `docs/product/dev-platform/_index.md` — feature map, use cases, stories
- **Surface**: `surfaces/dev-platform.md` — platform definition and principles

## Current Status

- **Phase**: Discovery / Specification
- **Active areas**: Product spec decomposition, architecture decisions, knowledge graph setup
- See `docs/_changelog.md` for recent activity
