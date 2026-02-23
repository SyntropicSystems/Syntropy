---
id: "dp11"
type: feature-spec
title: "Reflection Loop"
status: defining
owner: observations-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp02, dp03, dp10]
  enables: [dp-u10, dp-u11, dp12]
  informed-by: [jtbd-dev-platform]
  related: [dp-stories, dp09, dp14, f07, observations-agent, pulse-companion-agent, wf-reflect]
tags: [dev-platform, core, reflection, learning, observations, p0]
---

# DP11 — Reflection Loop

## Summary

A structured practice where every contributor (human or AI) pauses after completing work to notice and capture their personal experience: what worked for them, what didn't, where they got stuck, what felt effective, what was frustrating, what they'd need to be better next time. This is not a retrospective about the system's architecture or what the ideal platform should look like — it's a genuine, personal observation about the lived experience of doing the work.

The reflection loop is the double learning loop: the first loop is doing the work, the second loop is noticing how the work went. The reflections flow into the observation system (DP10), where they accumulate alongside ad-hoc observations. Over time, patterns emerge organically — if enough people feel the same friction, it becomes a strong enough signal to act on. No one needs to be a platform architect. They just need to honestly notice their experience.

## Jobs Addressed

- DJ9 — Enable Continuous Self-Improvement Through Honest Reflection (primary)
- DJ8 — Capture and Surface Emergent Signals from All Contributors (secondary)
- DJ7 — Preserve Domain Expertise and Enable Fast Context Recovery (secondary)

## How It Works

### The Reflection

After completing a piece of work, the contributor runs `wf-reflect`. The workflow prompts them to notice — not analyze, not solve, just notice — their experience across a few dimensions:

- **What worked well?** — What felt effective, smooth, or satisfying? What do you want to keep doing?
- **What was hard?** — Where did you get stuck, feel confused, or spend more time than expected?
- **What was your experience?** — How did the work feel? Energizing? Draining? Boring? Engaging?
- **What would you need?** — If you could change one thing about how this went, what would it be?

These are personal questions with personal answers. An AI agent reflecting might note: "I loaded 12 files to understand the context but only 3 were relevant — the context cache feels too broad." A human might note: "I kept second-guessing whether my observation was 'good enough' to capture."

### What It Is Not

- Not a system design exercise — "the architecture should use X" is an observation, not a reflection
- Not a retrospective about others — "the team should do Y" is out of scope
- Not a performance review — there's no judgment, just noticing
- Not mandatory structured data — a single sentence is fine
- Not about "best practices" — it's about what actually happened for you, right now

### Relationship to Observations

Reflections are a special case of observations. They use the same infrastructure (DP10), the same directory (`observations/`), the same template, the same lifecycle. The only distinction is:

- `observation-type: reflection` — marks it as a post-work reflection
- Reflections are triggered by a specific workflow (`wf-reflect`) rather than being spontaneous
- Reflections tend to be more introspective and personal than ad-hoc observations

The observations-agent audits reflections alongside other observations. Patterns emerge: "3 contributors noted that context loading takes too long" → that's a signal, even though no one proposed a solution.

### The Emergence Principle

The reflection loop deliberately avoids asking contributors to solve problems or design improvements. That's someone else's job (or the same person's job at a different time, in a different mode). The reflection is pure signal generation.

What makes this powerful is volume and honesty:
- If one person says "cross-refs are tedious" — it's a data point
- If five people say it — it's a pattern
- If five people say it and two of them also say "I started skipping reciprocal refs because it takes too long" — it's urgent

The system doesn't need anyone to be an architect. It just needs everyone to be honest about their experience. The architecture will emerge from the collection of honest reflections.

### Upleveling Through Reflection

The act of reflecting is itself upleveling:
- Noticing what worked reinforces effective habits
- Noticing what was hard builds self-awareness about where you need growth
- Over time, contributors develop a natural reflective practice that transfers beyond this system
- The reflection workflow gently models how to notice and articulate experience, without being prescriptive

## Dependencies

- Requires: DP10 (Observation System) — reflections are observations; DP02 (Agent System) — agents can reflect; DP03 (Workflow Engine) — reflection is a workflow
- Enables: DP-U10 (Reflecting After Completing Work)
- Related: DP09 (Domain Context Sync) — reflections can inform domain state updates; F07 (Self-Learning) — reflection patterns feed system evolution

## Open Questions

- [ ] Should there be a nudge/reminder to reflect, or should it be purely voluntary?
- [ ] How do we handle reflections from AI agents that might be formulaic rather than genuine?
- [ ] Should reflections be anonymous to encourage honesty, or attributed to enable follow-up?
- [ ] What's the minimum cadence? After every task? After every session? After every significant milestone?
