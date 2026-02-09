---
id: "dp-u08"
type: use-case
title: "Capturing an Observation in the Moment"
status: defining
owner: observations-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp10, dp03]
  related: [wf-capture-observation, dp-u09, dp-u02]
tags: [dev-platform, use-case, observations, capture]
---

# DP-U08 — Capturing an Observation in the Moment

## Scenario

A contributor is working on refining a feature spec and notices that the cross-referencing process feels cumbersome — they keep having to manually check bidirectional refs. The friction is real but not urgent enough to stop what they're doing. Instead of forgetting about it or creating a formal issue, they capture a quick observation.

### Path A: Quick Dump (Unstructured)

1. The contributor creates a new file: `observations/2025-02-09-cross-ref-friction.md`
2. They copy the template frontmatter, set status to `raw`, and type a quick note:
   > "Adding bidirectional refs is tedious. Every time I add a ref to doc A pointing to B, I have to open B and add the reciprocal. Easy to forget. Feels like this should be automated or at least validated."
3. They set `observation-type: friction` and `domains: [meta]` because they know this is about the dev platform itself
4. Done — 2 minutes, back to their original work

### Path B: Assisted Capture (With Agent)

1. The contributor spins up the observations-agent and says: "I'm frustrated that cross-referencing is manual and error-prone"
2. The agent asks a few clarifying questions: "What were you doing when you noticed this? What would the ideal experience look like?"
3. The agent creates a well-structured observation file with full context, typed as `friction`, tagged to `meta` and `dp01` domains
4. The contributor reviews and approves — 3 minutes total

### Path C: Brain Dump (Minimal)

1. The contributor creates `observations/2025-02-09-random-thought.md`
2. They write only: "cross refs are annoying" with `status: raw`
3. That's it — the observations-agent will flesh this out during the next audit, potentially asking the contributor for more context
4. Done — 30 seconds

### Outcome

- The friction is captured and won't be forgotten
- The contributor didn't break their flow
- The observation exists as a signal that can be combined with others during audit
- If 3 other people capture similar observations about cross-referencing, a pattern emerges

## Features Exercised

- DP10 — Observation System (core feature)
- DP03 — Workflow Engine (capture workflow)
- DP02 — Agent System (observations-agent for assisted capture)

## Acceptance Criteria

- [ ] A new observation file exists in `observations/` with valid frontmatter
- [ ] The observation has at minimum: a title and some content (even one sentence)
- [ ] The capture process took less than 5 minutes (even for assisted)
- [ ] The contributor could return to their original work without significant context loss
