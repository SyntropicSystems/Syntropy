---
id: "dp-u04"
type: use-case
title: "Exploring the Knowledge Graph"
status: defining
owner: meta-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp01, dp04, dp08]
  related: [dp-u02]
tags: [dev-platform, use-case, navigation]
---

# DP-U04 — Exploring the Knowledge Graph

## Scenario

A contributor needs to understand how the product fits together — what features exist, how they relate, what decisions shaped them, and what's still unresolved. Instead of reading every document linearly, they use the knowledge graph's structure to navigate between related concepts and build a mental model.

### Steps

1. Contributor starts at a known entry point (`CLAUDE.md`, `docs/product/_index.md`, or `docs/_registry.md`)
2. Scans the feature map or registry to find a starting concept (e.g., "F04 — AI Action Engine")
3. Opens the feature spec and reads the Summary and How It Works sections
4. Follows `refs.depends-on` to see what the feature requires (e.g., F06 — Event Sourcing)
5. Follows `refs.enables` to see what use cases the feature unlocks (e.g., U01, U03)
6. Follows `refs.decided-by` to see what ADRs shaped this feature (e.g., ADR-003)
7. Checks `refs.open-questions` to see what's still unresolved
8. Navigates to related features via `refs.related` to understand the neighborhood
9. Optionally checks the changelog to see how this feature's spec has evolved

### Outcome

- The contributor understands a feature's context: why it exists, what it depends on, what it enables, what decisions shaped it, and what's still open
- They can do this without reading unrelated documents — the graph structure filters for relevance
- The exploration path is reproducible — anyone following the same refs reaches the same understanding

## Features Exercised

- DP01 — Knowledge Graph (navigating nodes and edges)
- DP04 — Registry & Changelog (finding starting points, checking history)
- DP08 — Entry Point Routing (starting from known entry points)

## Acceptance Criteria

- [ ] Every feature spec has populated `refs` with at least `depends-on`, `enables`, and `related`
- [ ] Following cross-references from any feature reaches all relevant context within 3 hops
- [ ] The registry provides a complete listing for finding any starting concept
- [ ] No orphaned documents (every document is reachable from at least one entry point)
