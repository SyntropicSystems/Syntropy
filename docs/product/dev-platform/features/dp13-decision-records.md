---
id: "dp13"
type: feature-spec
title: "Decision Records"
status: defining
owner: decisions-agent
priority: P0
created: 2025-02-09
updated: 2026-02-25
refs:
  depends-on: [dp01, dp04, dp05]
  enables: [dp-u12, dp-u13]
  informed-by: [jtbd-dev-platform]
  related: [decisions-agent, decisions-index, dp-stories, dp02, dp03, dp09, dp14, dp16, el-narrative, wf-make-decision, wf-record-decision]
tags: [dev-platform, core, decisions, reasoning-graph, traceability, p0]
---

# DP13 — Decision Records

## Summary

A lightweight system for capturing every decision — from high-stakes architectural choices to everyday methodology picks — as a structured record in a navigable reasoning graph. Decision records are the "why" layer of the knowledge graph: they explain why things are the way they are, what alternatives were considered, what would trigger a revisit, and how each decision connects to the mission.

The key insight is that **decisions are a graph, not a list**. Decisions have parents (the problem they serve), children (sub-decisions that implement them), domain scope (where they apply), and relationships to other decisions (dependencies, tensions, exceptions). The same problem in two domains can be solved differently — and that's fine, as long as the reasoning is captured.

This system generalizes and extends the existing ADR (Architecture Decision Record) pattern. ADRs remain valid as architecture-scoped decision records. The broader system encompasses all decision types: product, process, methodology, convention, principle, and more.

## Jobs Addressed

- DJ11 — Build a Reasoning Graph That Makes Every Decision Reproducible and Traceable (primary)
- DJ3 — Keep Decisions Traceable and Reversible (primary)
- DJ1 — Maintain a Single Source of Truth for All Product Knowledge (secondary)
- DJ2 — Enable Humans and AI Agents to Execute the Same Processes (secondary)
- DJ7 — Preserve Domain Expertise and Enable Fast Context Recovery (secondary)

## How It Works

### Decision Record Structure

Every decision record follows a minimal but effective structure. The core sections are:

1. **Problem Stack** — What problem does this solve? How does it connect to higher-level goals or the mission? This is the vertical alignment: every decision should trace up to something that matters.

2. **Context & Data** — What information, constraints, observations, or signals informed this decision? What was true at the time? This anchors the decision in reality, not abstraction.

3. **Options Explored** — What alternatives were considered? Even if the choice was obvious, documenting at least one alternative prevents future "why didn't we just..." conversations.

4. **Decision** — What was decided, stated clearly and concretely. No ambiguity.

5. **Success Metrics** — How do we know this decision is working? What would "effective" look like? Effectiveness is the measurement of truth.

6. **Revisit Triggers** — Under what conditions should this decision be reconsidered? What would change the calculus? This prevents decisions from becoming dogma.

### Decision Types

Decisions are classified by reversibility (following the Type 1 / Type 2 model):

- **Type 1** — High-stakes, hard to reverse. Require thorough exploration, multiple perspectives, explicit sign-off. Examples: technology stack choices, data model foundations, core architectural patterns.
- **Type 2** — Easily reversible, low blast radius. Should be made quickly with minimal ceremony. Examples: naming conventions, tool preferences, workflow tweaks.

Both types get recorded. Type 1 records are more thorough; Type 2 records can be as brief as a few sentences. The system should never be so bureaucratic that people avoid recording Type 2 decisions — those are often the ones that accumulate into tribal knowledge.

### Decision Scope

Every decision record declares its scope:

- **Domain** — Which domain(s) does this apply to? A decision can be global (applies everywhere) or domain-specific (applies only within architecture, or product, or a specific feature).
- **Hierarchy** — Decisions can have parents and children. A high-level principle decision might have several implementation decisions beneath it. A domain-specific decision might be a child of a cross-cutting decision with a domain-specific adaptation.
- **Exceptions** — A decision can note explicit exceptions: "We decided X globally, but in domain Y we do Z because of [reason]." Exceptions are first-class, not hidden.

### The Reasoning Graph

Decision records form a graph through their relationships:

- `parent` / `children` — hierarchical (problem stack)
- `depends-on` / `enables` — directional dependency
- `supersedes` / `superseded-by` — evolution over time
- `tensions` — explicit tensions between decisions that are acknowledged but not resolved (or resolved via exceptions)
- `domain` — scoping to one or more domains
- `related` — thematic links

This graph is the **reasoning trail**: taken together, the decision records explain how and why the system arrived at its current state. A new contributor can traverse the graph to understand not just what exists, but why it exists and what alternatives were considered.

### Relationship to Existing ADRs

The existing ADR system (adr-001, adr-002, adr-003) is preserved as-is. ADRs are architecture-scoped decision records. Going forward:

- Architecture decisions continue to use the `adr-NNN` ID and the `make-architecture-decision` workflow
- General decisions use the `dr-NNN` ID and the `record-decision` workflow
- Both live in `docs/decisions/` and are tracked in the decisions index
- The decisions-agent is DRI for the overall decision graph; the architecture-agent remains DRI for architecture-specific decisions

### Coherence & Conflict Detection

Decisions should not contradict each other. The decisions-agent periodically reviews the decision graph for:

- **Conflicts** — Two decisions that contradict each other without an explicit exception
- **Orphans** — Decisions without a problem stack connection (why does this exist?)
- **Staleness** — Decisions whose revisit triggers have fired but haven't been reconsidered
- **Gaps** — Areas where decisions are made implicitly (tribal knowledge) but not recorded

When a new decision potentially conflicts with an existing one, the workflow flags this and requires either: reconciliation, an explicit exception, or superseding the older decision.

### Keeping It Lightweight

The system is designed to reduce overhead, not add it:

- A Type 2 decision record can be 5 lines of frontmatter + 3 sentences
- The workflow prompts for structure but doesn't enforce length
- Decision records can start as rough captures and be refined later (like observations)
- The decisions-agent helps contributors articulate and structure their decisions
- The goal is that recording a decision takes less time than the conversation that would happen later when someone asks "why did we do it this way?"

## Dependencies

- Requires: DP01 (Knowledge Graph) — decision records are graph nodes with refs; DP04 (Registry & Changelog) — tracked in registry, changes logged; DP05 (Convention System) — follows document conventions
- Enables: DP-U12 (Recording a Decision), DP-U13 (Navigating the Decision Graph)
- Related: DP02 (Agent System) — decisions-agent is the DRI; DP03 (Workflow Engine) — record-decision is a workflow; DP09 (Domain Context Sync) — domain agents reference governing decisions in their state

## Open Questions

- [ ] Should decision records support voting or polling for Type 1 decisions?
- [ ] What's the right cadence for decision graph coherence audits?
- [ ] How do we handle decisions that span the application and dev platform boundary?
- [ ] Should there be a lightweight "decision intent" status before full record (like observations have `raw`)?
- [ ] At what scale does automated conflict detection become necessary vs. manual review?
