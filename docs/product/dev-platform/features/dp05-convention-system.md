---
id: "dp05"
type: feature-spec
title: "Convention System"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: []
  enables: [dp-u01, dp01, dp02, dp03, dp04, dp10, dp13]
  informed-by: [jtbd-dev-platform]
  related: [conventions, dp-stories, dp06, dr-002, dr-003, surf-dev-platform, wf-evolve-conventions, wf-validate-knowledge-graph]
tags: [dev-platform, core, conventions, p0]
---

# DP05 — Convention System

## Summary

The rules that govern how every document in the knowledge graph is structured. Defines YAML frontmatter schema, document type taxonomy, status lifecycles, naming conventions, cross-reference rules, and templates for each document type. The convention system is what makes the knowledge graph consistent and machine-parseable.

## Jobs Addressed

- DJ6 — Ensure Consistency Across All Documentation (primary)
- DJ5 — Reduce Friction When Adding, Finding, or Changing Product Specs (secondary)

## How It Works

### Frontmatter Schema

Every document starts with YAML frontmatter containing:
- `id` — stable identifier, never changes even if file moves
- `type` — document type from the taxonomy
- `title` — human-readable name
- `status` — current lifecycle state
- `owner` — DRI agent
- `priority` — P0/P1/P2 (where applicable)
- `created` / `updated` — ISO dates
- `refs` — typed cross-references (the graph's edges)
- `tags` — freeform labels for filtering

### Document Type Taxonomy

13 types, each with an ID prefix convention:
- `feature-spec` (f/dp), `use-case` (u/dp-u), `user-story` (s/dp-s), `ux-pattern` (ux-), `vision`, `architecture`, `adr` (adr-), `open-question` (oq-), `workflow` (wf-), `agent-manifest`, `surface` (surf-), `reference`, `prototype` (proto-)

### Status Lifecycles

Different document types have different lifecycle progressions:
- **Specs**: `exploring` → `defining` → `specified` → `building` → `shipped`
- **Decisions**: `proposed` → `accepted` → `deprecated` | `superseded`
- **Questions**: `draft` → `exploring` → `converging` → `resolved`
- **Infrastructure**: `draft` → `active` → `superseded` | `archived`

### Naming Conventions

- Files: lowercase, hyphen-separated (e.g., `f01-task-card-system.md`)
- Directories: no nesting beyond the established structure
- Meta-files: underscore prefix (`_registry.md`, `_index.md`)

### Templates

Each document type has a canonical template in `docs/_conventions.md` that defines the required sections and structure.

## Dependencies

- Requires: nothing — the convention system is the foundation everything else builds on
- Enables: DP01 (Knowledge Graph), DP02 (Agent System), DP03 (Workflow Engine), DP04 (Registry & Changelog)

## Open Questions

- [ ] Should we add a linter/validator that checks convention compliance?
- [ ] How do we handle convention changes without breaking existing documents?
- [ ] Should the convention system itself be versioned?
