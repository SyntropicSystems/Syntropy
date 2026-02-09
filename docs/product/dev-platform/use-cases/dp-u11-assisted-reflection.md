---
id: "dp-u11"
type: use-case
title: "Assisted Reflection with Pulse Companion"
status: defining
owner: pulse-companion-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp12, dp11, dp10]
  related: [dp-u10, dp-u08, wf-reflect]
tags: [dev-platform, companion, reflection, use-case]
---

# DP-U11 — Assisted Reflection with Pulse Companion

## Scenario

Alex just finished a multi-hour session implementing a cross-cutting feature. It involved creating 6 new documents, updating 8 existing ones, and coordinating across 3 domain agents. The feature inception workflow helped, but some parts were harder than expected.

Instead of reflecting solo (which might produce "it was fine, took a while"), Alex invokes the pulse companion for an assisted reflection.

### Path A: Assisted Reflection After Feature Work

**Trigger**: Alex finishes the work and types `wf-reflect --assisted` (or the companion notices the natural stopping point and offers).

**Step 1 — Companion analyzes the session** (30 seconds)

The companion reads:
- The commits made during the session
- Files created and modified
- The AI agent thread (what context was loaded, what questions were asked, what errors occurred)
- Any observations captured during the work
- Time between commits (rough indicator of where effort concentrated)

**Step 2 — Companion opens with a specific observation** (not a generic prompt)

> "You created 6 new documents and updated 8 existing ones in this session. The cross-reference updates took 3 separate commits — it looks like you discovered missing reciprocal refs incrementally. How did that feel? Was it a natural part of the flow, or more like chasing your tail?"

**Step 3 — Alex responds honestly**

> "Chasing my tail, honestly. I'd finish a document, move to the next, then realize the first one needed a back-ref I forgot. I wish there was a way to see all the refs I need to add at the end."

**Step 4 — Companion goes deeper on the specific friction**

> "That makes sense — you edited `_registry.md` three separate times. When you say 'see all the refs at the end,' do you mean like a validation step that checks for missing reciprocal refs before you commit? Or more like a preview of all the cross-refs a new document will need?"

**Step 5 — Alex clarifies**

> "Both, actually. A preview upfront would save time, and a validation at the end would catch what I miss."

**Step 6 — Companion captures the reflection**

Creates an observation with `observation-type: reflection`:

```markdown
## What worked well
- Feature inception workflow provided complete scope upfront — didn't miss any document types
- Domain state sections in agent manifests made it clear what to update

## What was hard
- Cross-reference updates were iterative and error-prone — discovered missing reciprocal refs incrementally across 3 separate commits
- Edited _registry.md three times; each pass found more entries needed

## What I'd need
- A preview of all cross-references a new document will require (upfront planning)
- A validation step that checks for missing reciprocal refs before commit (safety net)

## Companion notes
- Contributor expressed frustration with "chasing tail" on cross-refs
- This friction aligns with 2 previous observations about cross-ref tedium
- Potential signal for automated cross-ref validation tooling
```

### Path B: Companion Notices a Pattern Across Sessions

After Alex's third session that mentions cross-ref friction, the companion notes:

> "This is the third time cross-references have come up in your reflections. The first time you called it 'tedious,' the second time 'error-prone,' and now 'chasing your tail.' It seems like this is a real and growing friction for you. Would you like me to surface this as a pattern observation for the observations-agent to consider?"

Alex agrees. The companion creates a `observation-type: pattern` observation linking all three reflections.

### Path C: AI Agent Assisted Reflection

An AI agent just completed a feature inception. The pulse companion analyzes its processing:

> "You loaded 14 context files but your output only referenced 5 of them. You also re-read 3 files that you'd already loaded in the 'Always' context cache. Was the context cache too broad, or were you re-reading for a specific detail?"

The AI agent reflects: "I re-read the registry, changelog, and glossary because I needed to find the exact current state — the cached version was from my initial load but those files changed during my work."

The companion captures this as signal about context cache freshness during long sessions.

## Features Exercised

- DP12 — Pulse Companion (assisted reflection, context analysis, pattern detection)
- DP11 — Reflection Loop (the underlying practice)
- DP10 — Observation System (reflections are observations)
- DP02 — Agent System (companion is an agent)

## Acceptance Criteria

- [ ] Companion can analyze recent work artifacts (commits, files, agent threads)
- [ ] Companion asks specific, context-grounded questions (not generic prompts)
- [ ] Companion helps contributor articulate vague feelings into specific frictions
- [ ] Reflection is captured as a well-structured observation preserving the contributor's voice
- [ ] Companion notices patterns across multiple reflections from the same contributor
- [ ] Solo reflection remains available and is never blocked by companion availability
- [ ] AI agents can receive assisted reflection with questions relevant to their processing experience
