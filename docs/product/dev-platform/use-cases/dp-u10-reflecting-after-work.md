---
id: "dp-u10"
type: use-case
title: "Reflecting After Completing Work"
status: defining
owner: observations-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp03, dp10, dp11]
  related: [dp-u08, dp-u09, dp-u11, wf-reflect]
tags: [dev-platform, use-case, reflection, observations, learning]
---

# DP-U10 — Reflecting After Completing Work

## Scenario

A contributor just finished adding a new feature to the knowledge graph using `wf-feature-inception`. The workflow's last step says "Run `wf-reflect`." They pause before moving on.

### Steps

1. The contributor stops and asks themselves: how did that go?
2. They notice:
   - "The feature inception workflow was really helpful — I didn't miss any layers this time"
   - "But I still struggled with cross-references. I had to manually track which existing docs needed reciprocal refs. I kept a scratch list on paper, which felt wrong"
   - "Loading 10 files for context at the start took a while. I wonder if half of them were unnecessary for what I was doing"
   - "Overall it felt good — I was confident the result was correct by the end"
3. They create an observation file: `observations/2025-02-09-reflection-feature-inception.md`
   - Set `observation-type: reflection`
   - Set `domains: [meta]`
   - Write their notes in natural language
   - Set `status: raw`
4. Done — 3 minutes. They move on to their next task.

### What Happens Next

During the next observation audit, the observations-agent processes this reflection:
- Tags it as `structured`
- Notices the cross-reference friction is a pattern — 2 other contributors mentioned the same thing
- Creates a `pattern` observation linking all three
- The pattern eventually gets promoted to a feature request for automated cross-ref validation

The contributor didn't have to propose a solution or design a feature. They just honestly noticed what their experience was. The system did the rest.

### AI Agent Variant

An AI agent completing a domain sync pauses to reflect:
- "I loaded 14 documents from the 'Always' context list but only referenced 4 during this task. The context loading feels inefficient — I'd benefit from task-specific context recommendations rather than a static 'Always' list."
- Creates a reflection observation tagged to `meta` and `dp02`

This is genuine signal about how the agent system serves AI agents — not a theoretical improvement proposal, but data from actual use.

## Features Exercised

- DP11 — Reflection Loop (core feature)
- DP10 — Observation System (reflections are observations)
- DP03 — Workflow Engine (wf-reflect as executable process)

## Acceptance Criteria

- [ ] A reflection observation exists in `observations/` with `observation-type: reflection`
- [ ] The reflection references what work was being done
- [ ] The reflection captures genuine personal experience (not system design proposals)
- [ ] The entire reflection process took less than 5 minutes
- [ ] The contributor moved on to their next task without lingering
