---
id: "dp09"
type: feature-spec
title: "Domain Context Sync"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2026-02-25
refs:
  depends-on: [dp01, dp02, dp03, dp04]
  enables: [dp-u06, dp-u07, dp-u14, dp14, dp16, dp17, dp18, el-world-map]
  informed-by: [jtbd-dev-platform]
  related: [base-traits, dp-stories, dp-u15, dp08, dp10, dp11, dp12, dp13, dp15, dp19, wf-domain-review, wf-sync-domain-context]
tags: [dev-platform, core, agents, sync, context, p0]
---

# DP09 — Domain Context Sync

## Summary

A system that keeps each domain agent's working memory (context cache + domain state) current and coherent as the knowledge graph evolves. Every agent manifest maintains a **Domain State** section — a living snapshot of the agent's current understanding: what's active, what decisions are in effect, what's in progress, and what invariants hold. When changes occur anywhere in the graph, the affected domain agents can detect drift and sync their state through structured workflows.

This is the mechanism that prevents entropy, context loss, and silent drift as the system scales. It enables any contributor (human or AI) to spin up a domain agent, load its state, and be immediately productive — or to multiply themselves by delegating to domain experts who maintain their own coherent, up-to-date understanding.

## Jobs Addressed

- DJ7 — Preserve Domain Expertise and Enable Fast Context Recovery (primary)
- DJ1 — Maintain a Single Source of Truth (secondary)
- DJ6 — Ensure Consistency Across All Documentation (secondary)
- DJ4 — Scale Development Complexity Without Restructuring (secondary)

## How It Works

### Domain State (Working Memory)

Each agent manifest gains a **Domain State** section that captures the agent's living understanding. Unlike the context cache (which lists *files to load*), domain state captures *what is currently true* — a summary a new agent instance can read to immediately understand the domain without re-reading every file.

Domain state includes:

- **Current Focus**: What's actively being worked on or recently changed
- **Key Decisions in Effect**: Active ADRs and constraints that govern this domain
- **Invariants**: Rules that must always hold (violations indicate drift)
- **Open Threads**: Unresolved questions, in-progress work, pending decisions
- **Cross-Domain Dependencies**: Active coupling points with other domains
- **Last Synced**: Timestamp of last audit/sync pass

### Sync Protocol

The sync protocol defines how domain state stays current:

1. **On Change** — When an agent makes changes to their domain, they update their own domain state as a final step (part of every workflow's validation checklist)
2. **On Audit** — Any agent can run the `wf-sync-domain-context` workflow to audit their domain against the changelog, detect changes since their last sync, and update their state
3. **Before Merge** — The `wf-domain-review` workflow enables domain DRIs to review proposed changes that touch their domain, verify invariants hold, and sign off

### Drift Detection

Drift occurs when the knowledge graph changes but a domain agent's state doesn't reflect those changes. Detection mechanisms:

- **Changelog scanning**: Compare agent's `last-synced` timestamp against changelog entries that affect documents in the agent's scope
- **Invariant checking**: For each invariant the agent declares, verify it still holds
- **Cross-reference validation**: Confirm bidirectional refs between the agent's owned documents and external documents

### DRI Review Pattern

Before significant changes merge, domain agents review changes that touch their scope:

1. The implementer (human or AI) makes changes across multiple domains
2. For each affected domain, the implementer can either:
   - **Self-review**: If they have the domain expertise, review against the domain's invariants and rules
   - **Delegate review**: Spin up the domain's agent, load its context + state, and ask it to review
3. Each domain agent confirms: no invariant violations, coherent with existing decisions, no accidental complexity, cross-references intact
4. Domain agents update their domain state to reflect the reviewed changes

### Scalability Model

This design scales from solo contributor to team:

- **Solo with expertise**: One person does the work, reviews their own changes against domain invariants, updates domain state
- **Solo multiplied**: One person delegates to domain agents for review and implementation in unfamiliar domains — agents bring their preserved context
- **Team**: Multiple contributors, each potentially acting as or through domain agents, with the sync protocol ensuring nobody's working from stale understanding
- **AI-augmented**: AI agents can be spun up, load domain state instantly, and be productive without the "ramp-up" that humans need

## Dependencies

- Requires: DP01 (Knowledge Graph) — domain state lives in the graph; DP02 (Agent System) — agents are the owners; DP03 (Workflow Engine) — sync and review are workflows; DP04 (Registry & Changelog) — changelog enables drift detection
- Enables: New use cases for domain handoff, pre-merge review, and fast onboarding

## Open Questions

- [ ] Should domain state be in the agent manifest or a separate file? (In-manifest keeps it co-located with context cache; separate file enables independent versioning)
- [ ] What's the right granularity for invariants? Too fine and they're noisy; too coarse and they miss real drift
- [ ] Should sync be triggered automatically (e.g., git hooks) or manually?
