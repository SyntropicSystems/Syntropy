---
id: "observations-index"
type: reference
title: "Observations Index"
status: active
owner: observations-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [dp10, wf-capture-observation, wf-audit-observations, observations-agent]
tags: [observations, index, signals]
---

# Observations

A living collection of raw signals — thoughts, frictions, ideas, bugs, anxieties, notes, or anything noticed in the moment. Observations are the foundation of emergent intelligence: capture first, structure later, find patterns over time.

## How It Works

- **Anyone** can add an observation at any time
- **Anything goes** — structured or unstructured, articulate or raw
- **Capture workflow**: `docs/workflows/capture-observation.md`
- **Audit workflow**: `docs/workflows/audit-observations.md`
- **DRI**: `agents/observations-agent.md`

## Directory Structure

```
observations/
  _index.md           ← you are here
  _template.md        ← template for new observations
  YYYY-MM-DD-slug.md  ← individual observations (date-prefixed for chronology)
```

## Observation Types

The type system is intentionally open and will evolve. Current types:

| Type | When to use |
|------|------------|
| `friction` | Something that slowed you down or felt harder than it should |
| `bug` | Something broken or behaving incorrectly |
| `idea` | A new capability, approach, or possibility |
| `question` | Something you don't understand or want to explore |
| `anxiety` | A worry or concern about direction, quality, or sustainability |
| `pattern` | A recurring theme you've noticed |
| `need` | Something you need or want from the system or process |
| `praise` | Something that works well and should be preserved or amplified |
| `general` | Anything that doesn't fit the above — and that's fine |

## Domains

Observations can optionally be tagged with one or more domains. Use the agent/domain slugs from the routing table:

`product`, `architecture`, `ux`, `integration`, `meta`, `observations`, or any feature ID (`f01`–`f12`, `dp01`–`dp10`).

If you're unsure which domain, leave it blank — the observations-agent will tag it during audit.

## Finding Observations

- Browse chronologically in this directory
- Filter by type or domain using frontmatter tags
- The observations-agent periodically audits, structures, and surfaces patterns
