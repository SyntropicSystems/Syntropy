---
id: "dp01"
type: feature-spec
title: "Knowledge Graph"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2026-02-25
refs:
  depends-on: [dp05]
  enables: [dp-u01, dp-u02, dp-u03, dp-u04, dp-u05, dp-u12, dp-u13, dp02, dp03, dp04, dp06, dp07, dp08, dp09, dp10, dp13, dp18, dp19]
  informed-by: [jtbd-dev-platform]
  related: [dp-stories, dp04, dp05, dp16, dr-002, dr-003, el-world-map, surf-dev-platform, wf-add-knowledge-document, wf-update-document, wf-validate-knowledge-graph]
tags: [dev-platform, core, knowledge-graph, p0]
---

# DP01 — Knowledge Graph

## Summary

The foundation of the development platform. All product knowledge lives as markdown files organized as a directed graph. Each file has YAML frontmatter with a stable ID, typed cross-references, status, and ownership. The graph structure means concepts link to each other bidirectionally, forming a navigable web rather than a rigid hierarchy.

## Jobs Addressed

- DJ1 — Maintain a Single Source of Truth for All Product Knowledge (primary)
- DJ4 — Scale Development Complexity Without Restructuring (secondary)

## How It Works

- Every concept (feature, decision, question, use case, agent, etc.) gets exactly one canonical markdown file
- Files use YAML frontmatter for machine-parseable metadata: `id`, `type`, `title`, `status`, `owner`, `refs`, `tags`
- IDs are stable and never change, even if files move — all references use IDs, not file paths
- Cross-references are typed edges: `depends-on`, `enables`, `related`, `decided-by`, `affects`, `resolves-to`, `supersedes`
- All references must be bidirectional — if A references B, B must reference A
- The graph grows by adding nodes (new files) and edges (new references), never by restructuring existing nodes
- Each document type has a defined status lifecycle (e.g., `exploring` → `defining` → `specified` → `building` → `shipped` for specs)

### Graph Structure

```
Vision (why) → Product (what) → Architecture (how)
     ↕              ↕                    ↕
   JTBD ←→ Features ←→ ADRs
     ↕        ↕    ↕         ↕
  Stories ←→ Use Cases  Open Questions
     ↕        ↕
  UX Patterns ←→ Prototypes
```

### Document Types

13 document types, each with a dedicated ID prefix and template:
- Vision, feature-spec, use-case, user-story, ux-pattern, architecture, ADR, open-question, workflow, agent-manifest, surface, reference, prototype

## Dependencies

- Requires: DP05 (Convention System) — conventions define the graph's structure rules
- Enables: DP02 (Agent System), DP03 (Workflow Engine), DP04 (Registry & Changelog), DP06 (Surface Definitions), DP07 (Prototype System), DP08 (Entry Point Routing)

## Open Questions

- [ ] Should we add automated validation tooling that checks frontmatter completeness and bidirectional reference integrity?
- [ ] What's the practical upper bound on graph size before navigation becomes difficult without tooling?
- [ ] Should we support graph visualization (e.g., rendering the knowledge graph as an interactive diagram)?
