---
id: "dp08"
type: feature-spec
title: "Entry Point Routing"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2026-02-21
refs:
  depends-on: [dp01, dp02]
  enables: [dp-u02, dp-u04]
  related: [meta-agent, base-traits]
  informed-by: [jtbd-dev-platform]
tags: [dev-platform, core, navigation, p0]
---

# DP08 — Entry Point Routing

## Summary

The navigation pattern that makes the knowledge graph discoverable. Every scope has an entry point file that routes to everything reachable from it. Contributors (human or AI) always start at a known entry point and follow links — they never need to search or guess file paths.

## Jobs Addressed

- DJ5 — Reduce Friction When Adding, Finding, or Changing Product Specs (primary)
- DJ4 — Scale Development Complexity Without Restructuring (secondary)

## How It Works

### The Pattern: Entry Point → Router → Graph

1. **Entry point** — a well-known file that serves as the starting location (e.g., `AGENTS.md` for the repo, an agent manifest for a domain)
2. **Router** — sections within the entry point that link to relevant subgraphs (context, rules, workflows)
3. **Graph** — the interconnected nodes reachable from the router's links

### Entry Points by Scope

| Scope | Entry Point | Routes To |
|-------|-------------|-----------|
| Repository | `AGENTS.md` | All top-level sections, agents, docs, workflows |
| Orchestration | `.syntropy/system-of-work/ROUTER.md` | Domain routing + system-of-work |
| Product domain | `docs/product/_index.md` | Features, use cases, stories, UX |
| Architecture domain | `docs/architecture/_index.md` | Stack, data model, ADRs |
| Dev platform | `docs/product/dev-platform/_index.md` | Dev platform features, use cases, stories |
| Surfaces | `surfaces/_index.md` | Mobile, web, dev platform surfaces |
| Feature (deep) | `.syntropy/system-of-work/domains/product/features/*/AGENT.md` | Feature-specific context, rules, workflows |

### Navigation Invariants

- Every entry point is reachable from `AGENTS.md` within 2 hops
- No document should require more than 3 hops from `AGENTS.md` to reach
- Index files (`_index.md`) serve as entry points for their directory scope
- Agent manifests serve as entry points for their domain scope
- If you can't find something by following links from an entry point, either the reference is missing or the entry point needs updating

## Dependencies

- Requires: DP01 (Knowledge Graph) — the graph that gets navigated; DP02 (Agent System) — agents serve as routers for their domains
- Enables: DP-U02 (Onboarding), DP-U04 (Exploring the Knowledge Graph)

## Open Questions

- [ ] Should we add a "site map" document that shows the full navigation tree?
- [ ] How do we detect and fix broken navigation paths?
