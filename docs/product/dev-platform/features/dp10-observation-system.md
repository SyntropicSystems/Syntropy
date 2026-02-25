---
id: "dp10"
type: feature-spec
title: "Observation System"
status: defining
owner: observations-agent
priority: P0
created: 2025-02-09
updated: 2026-02-25
refs:
  depends-on: [dp01, dp02, dp03, dp04, dp05]
  enables: [dp-u08, dp-u09, dp-u10, dp-u11, dp-u17, dp11, dp12, dp14, dp15, dp16]
  informed-by: [jtbd-dev-platform]
  related: [dp-stories, dp09, el-progression, el-social, el-world-map, f07, observations-agent, observations-index, pulse-companion-agent, wf-audit-observations, wf-capture-observation, wf-reflect]
tags: [dev-platform, core, observations, signals, emergence, p0]
---

# DP10 — Observation System

## Summary

A low-friction system that enables anyone — human or AI — to capture raw observations (thoughts, frictions, ideas, bugs, anxieties, patterns, needs) the moment they occur. Observations are the atomic unit of emergent intelligence: they accumulate as raw signals that can later be audited for patterns, structured retroactively, and used to inform priorities, improvements, and system evolution.

The key insight is that **the bar for capture must be as low as possible**. Anyone can dump a thought in any form. A dedicated DRI (the observations-agent) periodically audits observations — adding structure where missing, tagging domains, asking clarifying questions, and surfacing patterns. Over time, contributors naturally learn to express observations more effectively, but the system never requires it — the safety net of retroactive structuring means no observation is lost or wasted.

This is the foundation for a future signal intelligence layer: when enough people notice the same friction, the signal becomes strong enough to act on. The system grows and evolves organically by emergence — from individual observations to collective intelligence.

## Jobs Addressed

- DJ8 — Capture and Surface Emergent Signals from All Contributors (primary)
- DJ5 — Reduce Friction When Adding, Finding, or Changing Product Specs (secondary)
- DJ1 — Maintain a Single Source of Truth for All Product Knowledge (secondary)
- DJ7 — Preserve Domain Expertise and Enable Fast Context Recovery (secondary)

## How It Works

### Capture

- Observations live in `observations/` at the repository root
- Each observation is a markdown file with YAML frontmatter following `observations/_template.md`
- Naming: `YYYY-MM-DD-slug.md` (date-prefixed for natural chronological ordering)
- The capture workflow (`wf-capture-observation`) is the single source of truth for how to create one
- A contributor can also spin up the observations-agent to help them articulate and capture an observation interactively

### Minimum Viable Observation

An observation needs only:
- A title (even "untitled" is fine)
- Any content — a sentence, a paragraph, a brain dump
- The `raw` status in frontmatter

Everything else (type, domain, refs, tags, "why it matters", "possible next steps") is optional. The observations-agent will add structure during audit.

### Observation Lifecycle

```
raw → structured → triaged → [promoted | archived]
```

| Status | Meaning |
|--------|---------|
| `raw` | Just captured, minimal or no structure |
| `structured` | Observations-agent has reviewed: type assigned, domains tagged, context clarified |
| `triaged` | Pattern analysis done, priority/relevance assessed |
| `promoted` | Converted to an actionable item: open question, feature request, bug, ADR proposal |
| `archived` | Noted, no action needed, or superseded |

### Type System

The observation type system is intentionally open and will evolve:

- `friction` — something that slowed you down or felt harder than it should
- `bug` — something broken or behaving incorrectly
- `idea` — a new capability, approach, or possibility
- `question` — something you don't understand or want to explore
- `anxiety` — a worry or concern about direction, quality, or sustainability
- `pattern` — a recurring theme noticed across observations
- `need` — something you need or want from the system or process
- `praise` — something that works well and should be preserved
- `general` — anything else

New types can be added as they emerge — the taxonomy grows from usage, not from pre-planning.

### Audit & Structuring

The observations-agent periodically runs the audit workflow (`wf-audit-observations`):

1. **Structure**: Review `raw` observations — add type, domain tags, clarify context, improve formatting
2. **Engage**: If an observation is unclear or lacks critical context, reach out to the observer for clarification
3. **Pattern Detection**: Look across observations for recurring themes, related signals, clustering
4. **Triage**: Assess which observations are actionable, which inform priorities, which are noise
5. **Promote**: Convert high-signal observations into formal items (open questions, feature requests, ADR proposals)
6. **Uplevel**: Notice what makes some observations highly effective and share those patterns — help contributors get better at capturing observations over time

### Domain DRI Integration

Domain agents can audit observations tagged with their domain:
- See what contributors are experiencing in their area
- Identify frictions and bugs they might not have noticed
- Discover ideas and needs from outside their perspective
- Use observations as input for their domain evolution

### Upleveling

A core design goal is that the system **uplevels everyone who uses it**:
- The observations-agent doesn't just fix observations — it models good observation practices
- When structuring a raw dump, the agent shows what a well-structured version looks like
- Over time, contributors internalize these patterns and capture better observations naturally
- The goal: anyone can write an observation that is clear, structured, and immediately useful — without rework
- This prevents learned helplessness and over-reliance on AI or others

### Signal Intelligence (Future)

Eventually, the observation system becomes the foundation for signal intelligence:
- **Frequency analysis**: "5 people noted friction with X this month"
- **Sentiment tracking**: pattern of anxieties in a domain may indicate deeper issues
- **Cross-domain correlation**: frictions in architecture and product may share a root cause
- **Priority signals**: when enough observations cluster around a theme, it becomes a candidate for action

## Dependencies

- Requires: DP01 (Knowledge Graph) — observations are graph nodes; DP02 (Agent System) — observations-agent is the DRI; DP03 (Workflow Engine) — capture and audit are workflows; DP04 (Registry & Changelog) — observations tracked in registry; DP05 (Convention System) — observation template follows conventions
- Enables: DP-U08 (Capturing an Observation), DP-U09 (Auditing Observations for Patterns)
- Related: DP09 (Domain Context Sync) — domain agents audit observations in their scope; F07 (Self-Learning) — observation patterns feed system evolution

## Open Questions

- [ ] What's the right audit cadence? Daily, weekly, on-demand?
- [ ] Should observations support attachments (screenshots, logs, recordings)?
- [ ] How do we measure observation quality improvement over time (upleveling)?
- [ ] At what observation volume does automated pattern detection become necessary vs. manual audit?
- [ ] Should observations be editable after creation, or append-only (new observation references old)?
