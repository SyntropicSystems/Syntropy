---
id: "conventions"
type: reference
title: "Document Conventions"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2026-02-24
refs:
  decided-by: [dr-002, dr-003]
  related: [dp05, wf-add-knowledge-document, wf-evolve-conventions, wf-maintain-glossary, wf-update-document, wf-validate-knowledge-graph]
---

# Document Conventions

Standards for all documents in the Syntropy OS knowledge graph.

## Universal Frontmatter

Every document starts with YAML frontmatter:

```yaml
---
id: "f01"                    # Stable ID — never changes, even if file moves
type: feature-spec           # Document type (see types below)
title: "Task Card System"    # Human-readable title
status: exploring            # Lifecycle status (see statuses below)
owner: product-agent         # Which agent is DRI
priority: P0                 # P0 | P1 | P2 (where applicable)
created: 2025-02-07          # ISO date
updated: 2025-02-07          # ISO date, update on every change
refs:                        # Cross-references (knowledge graph edges)
  depends-on: [f06, f04]    # This requires these
  enables: [u01, u04]       # This unlocks these
  related: [f02, f09]       # Thematically linked
  decided-by: [adr-001]     # ADRs informing this
tags: [core, mvp, queue]     # Freeform tags for filtering
---
```

## Document Types

| Type | Description | ID Prefix |
|------|-------------|-----------|
| `vision` | Philosophy, motivation, language | — |
| `feature-spec` | Feature specification | `f` + zero-padded number |
| `module` | Deep-dive module within a feature or layer | `{layer-prefix}-` + slug |
| `use-case` | Concrete usage scenario | `u` + zero-padded number |
| `user-story` | User story | `s` + zero-padded number |
| `ux-pattern` | UX pattern or design decision | `ux-` + slug |
| `architecture` | Technical architecture document | `arch-` + slug |
| `adr` | Architecture Decision Record | `adr-` + zero-padded number |
| `decision-record` | General Decision Record | `dr-` + zero-padded number |
| `open-question` | Unresolved exploration | `oq-` + slug |
| `workflow` | Executable process document | `wf-` + slug |
| `agent-manifest` | Sub-agent configuration | slug |
| `observation` | Raw signal, friction, idea, reflection | `obs-` + date + slug |
| `surface` | Platform surface definition | `surf-` + slug |
| `prototype` | Interactive prototype artifact (JSX) | `proto-` + slug |
| `reference` | Index, navigation, or reference document | — |

### Platform-Scoped ID Prefixes

Features and modules use platform-scoped prefixes:

| Platform | Feature Prefix | Module Prefix | Example |
|----------|---------------|---------------|---------|
| Application | `f` + zero-padded | — | `f01`, `f12` |
| Dev Platform | `dp` + zero-padded | per-layer | `dp01`, `dp17` |
| Repo Platform | `rp` + zero-padded | — | `rp01`, `rp10` |
| Workspace Platform | `wp` + zero-padded | — | `wp01`, `wp08` |

### Layer Module Prefixes

When a feature has module deep-dives, each module uses a layer prefix:

| Layer | Prefix | Example |
|-------|--------|---------|
| Experience Layer | `el-` | `el-core-loops`, `el-progression` |
| Personality Layer | `pl-` | `pl-personality-stack`, `pl-voice-sheets` |

New layers follow the pattern: two-letter abbreviation + hyphen + slug.

## Status Lifecycles

### Specs (features, use cases, stories, UX patterns):
`exploring` → `defining` → `specified` → `building` → `shipped`

### Decisions (ADRs and Decision Records):
`proposed` → `accepted` → `deprecated` | `superseded`

### Open Questions:
`draft` → `exploring` → `converging` → `resolved`

### Observations:
`raw` → `structured` → `triaged` → `promoted` | `archived`

### Workflows, agents, references:
`draft` → `active` → `superseded` | `archived`

## Cross-Reference Rules

1. **IDs are stable** — use IDs (`f01`, `adr-001`), not file paths
2. **Bidirectional** — if document A references B, document B must reference A
3. **Typed edges** — use semantic ref types:
   - `depends-on` / `enables` — directional dependency
   - `related` — thematic link
   - `decided-by` / `affects` — decision ↔ affected docs
   - `resolves-to` — open question → ADR
   - `supersedes` / `superseded-by` — versioning
   - `owned-by` — agent ownership
4. **Tooling enforces coherence** — prefer:
   - `syntropy docs check` (validate)
   - `syntropy docs sync` (auto-add missing backrefs)
5. **`refs.domain` is non-graph** — `refs.domain` may be used for categorization; it is excluded from backref enforcement.
6. **`refs` is tool-normalized** — `syntropy docs sync` may rewrite only the `refs:` block (sorted + deduped, missing backrefs added). Treat ordering/formatting inside `refs` as tool-managed.

## Generated Artifacts

- `docs/_registry.md` is generated (deterministic projection). Do not hand-edit it.
  - Update it via `syntropy gen registry`
  - Drift-gate via `syntropy gen registry --check`
- Generated frontmatter docs include `mode: generated` (in addition to the content marker) so it’s visible even when only the frontmatter is skimmed.
- Generated Markdown files include a marker at the top of the generated content:
  - `<!-- syntropy:generated -->`
  - `<!-- GENERATED — DO NOT EDIT. -->`
  - `<!-- Run: cargo run -p syntropy -- <command> -->`

## Naming Conventions

### Files
- Lowercase, hyphen-separated: `f01-task-card-system.md`
- Feature specs: `fNN-slug.md` (or `dpNN-slug.md`, `rpNN-slug.md`, `wpNN-slug.md` for platform features)
- Use cases: `uNN-slug.md`
- ADRs: `adr-NNN-slug.md`
- Decision records: `dr-NNN-slug.md`
- Open questions: `oq-slug.md`
- Observations: `YYYY-MM-DD-slug.md` (in observations directory)
- Workflows: `slug.md` (in workflows directory)
- Module deep-dives: `slug.md` (in their layer directory, e.g., `experience-layer/core-loops.md`)
- Vision documents: `slug.md` (in `docs/vision/`)
- Architecture documents: `slug.md` (in `docs/architecture/`)

### Directories
- Underscore prefix for meta-files: `_registry.md`, `_index.md`, `_conventions.md`
- No nesting beyond what's shown in the directory structure

## Prototype Frontmatter (JSX)

Prototypes under `prototypes/*.jsx` are first-class nodes in the knowledge graph.

They must start at byte 0 with a `/* ... */` comment containing YAML frontmatter:

```js
/*
---
id: "proto-..."
type: prototype
title: "..."
status: active
owner: ux-agent
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  related: [dp07]
tags: [prototype]
---
*/
```

## Document Templates

### Vision Document

```markdown
---
id: "slug"
type: vision
title: "Vision Document Title"
status: active
owner: meta-agent
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  enables: []
  related: []
tags: [vision]
---

# Vision Document Title

## Core Insight
The fundamental idea or philosophy this document captures.

## Why This Matters
How this connects to the broader system.

## Key Concepts
Detailed exploration of the concepts.

## Module Index
(If this vision has associated deep-dive modules)

| Module | Description | ID |
|--------|-------------|-----|
| ... | ... | ... |
```

### Architecture Document

```markdown
---
id: "arch-slug"
type: architecture
title: "Architecture Document Title"
status: defining
owner: architecture-agent
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  depends-on: []
  related: []
tags: [architecture]
---

# Architecture Document Title

## Overview
What this architecture covers and why.

## Data Model
Key entities, relationships, and state.

## Integration Points
How this connects to other system components.

## Performance Considerations
Constraints and budgets.

## Open Questions
- [ ] ...
```

### Module Deep-Dive

```markdown
---
id: "XX-slug"
type: module
title: "Layer Name — Module Name"
status: exploring
owner: relevant-agent
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  depends-on: [parent-feature-id, parent-vision-id]
  related: [sibling-module-ids]
tags: [layer-name, module-topic, module]
---

# Module Name

One-paragraph summary of what this module covers and why it exists.

## Core Concepts
Detailed exploration of the module's design.

## Examples
Concrete examples showing the concepts in action.

## Derivable Features
| Feature | Phase | Complexity | Notes |
|---------|-------|------------|-------|
| ... | ... | ... | ... |

## Open Questions
- [ ] ...
```

### Feature Spec

```markdown
---
id: "fNN"
type: feature-spec
title: "Feature Name"
status: exploring
owner: product-agent
priority: P0
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  depends-on: []
  enables: []
  related: []
tags: []
---

# FNN — Feature Name

## Summary
One-paragraph description.

## Jobs Addressed
- J1 — ... (primary)
- J5 — ... (secondary)

## How It Works
Detailed behavioral specification.

## Dependencies
- Requires: ...
- Enables: ...

## Open Questions
- [ ] ...
```

### Architecture Decision Record (ADR)

```markdown
---
id: "adr-NNN"
type: adr
title: "Decision Title"
status: proposed
owner: architecture-agent
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  affects: []
---

# ADR-NNN: Decision Title

## Context
What situation prompted this decision?

## Decision
What did we decide?

## Rationale
Why this choice over alternatives?

## Alternatives Considered
- **Alternative A:** description, pros, cons
- **Alternative B:** description, pros, cons

## Consequences
What are the implications and trade-offs?
```

### Open Question

```markdown
---
id: "oq-slug"
type: open-question
title: "Question Title"
status: draft
owner: agent-name
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  affects: []
  resolves-to: []
---

# OQ: Question Title

## Question
The specific question.

## Context
Why this matters.

## Exploration
Research, options, notes.

## Current Thinking
Where we're leaning and why.

## Resolution Criteria
What would resolve this into a decision?
```

### Use Case

```markdown
---
id: "uNN"
type: use-case
title: "Use Case Name"
status: defining
owner: product-agent
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  depends-on: []
  related: []
tags: []
---

# UNN — Use Case Name

## Scenario
Narrative description of the use case.

## Features Exercised
- F1 — ...
- F4 — ...

## Acceptance Criteria
- [ ] ...
```

### Workflow

```markdown
---
id: "wf-slug"
type: workflow
title: "Workflow Name"
status: active
owner: meta-agent
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  related: []
---

# Workflow: Name

## When to Use
Trigger conditions.

## Prerequisites
What must be true before starting.

## Steps

### Step 1: ...
...

### Step 2: ...
...

## Validation Checklist
- [ ] ...

## Executor Notes
Who/what can execute this workflow.
```

### Decision Record

```markdown
---
id: "dr-NNN"
type: decision-record
title: "Decision Title"
status: proposed
owner: relevant-agent
decision-type: type-2
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  parent: []
  children: []
  domain: []
  affects: []
  tensions: []
  related: []
tags: []
---

# DR-NNN: Decision Title

## Problem Stack
What problem does this solve? How does it connect to higher-level goals?

## Context & Data
What was true when this decision was made?

## Options Explored
- **Option A:** description, pros, cons
- **Option B:** description, pros, cons

## Decision
What was decided? State it clearly.

## Success Metrics
How will we know this is working?

## Revisit Triggers
Under what conditions should we reconsider?
```

## Changelog Entry Format

```
| YYYY-MM-DD | action | document ID | description | author |
```

Actions: `created`, `updated`, `extracted`, `archived`, `superseded`
