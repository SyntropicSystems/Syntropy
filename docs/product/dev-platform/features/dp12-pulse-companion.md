---
id: "dp12"
type: feature-spec
title: "Pulse Companion"
status: defining
owner: pulse-companion-agent
priority: P1
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp02, dp03, dp10, dp11]
  enables: [dp-u11]
  informed-by: [jtbd-dev-platform]
  related: [dp-stories, dp09, dp14, dp15, dp16, dp17, f07, observations-agent, pulse-companion-agent, wf-capture-observation, wf-reflect]
tags: [dev-platform, companion, reflection, learning, pulse, emergence, p1]
---

# DP12 — Pulse Companion

## Summary

A personalized work companion that grows alongside each contributor — starting as a reflection assistant for the double learning loop (DP11) and evolving by emergence into a full work ally. The pulse companion analyzes a contributor's work artifacts (PRs, commits, AI agent threads, environment context) to understand their behavior and experience, asks the right questions to help them articulate and reflect, and maintains a continuous pulse on their effectiveness and wellbeing.

This is not a dashboard or a monitoring tool. It's a spirit animal for work — an entity that genuinely gets you, supports you, and helps you be the most effective version of yourself. Over time, it can evolve to incorporate NPS scores, targeted questionnaires, pattern-based inquiries, and personalized coaching. It collaborates across contributors to surface collective signals that help the whole system grow.

## Jobs Addressed

- DJ10 — Support Each Contributor with a Personalized Work Companion (primary)
- DJ9 — Enable Continuous Self-Improvement Through Honest Reflection (secondary)
- DJ8 — Capture and Surface Emergent Signals from All Contributors (secondary)
- DJ7 — Preserve Domain Expertise and Enable Fast Context Recovery (tertiary)

## How It Works

### Phase 1: Reflection Assistant (Starting Point)

The pulse companion begins as a sub-agent that assists with the reflection workflow (wf-reflect). Instead of the contributor reflecting alone, the companion:

1. **Analyzes the work context** — reads the PR, commits, files changed, AI agent conversation threads, and any observations captured during the session
2. **Notices patterns** — identifies what was straightforward, what required iteration, where the contributor spent the most time, what decisions were made and revised
3. **Asks targeted questions** — not generic "how did it go?" but specific: "You rewrote the cross-references three times — what was tricky about getting those right?" or "The AI agent thread shows you loaded 12 files but only used 3 — did that feel like wasted time?"
4. **Helps articulate** — when the contributor says "it was kind of hard," the companion helps them find the specific friction: "Was it hard because the conventions were unclear, or because you weren't sure which documents needed reciprocal refs?"
5. **Captures the reflection** — creates a well-structured observation with `observation-type: reflection` that preserves the contributor's genuine experience

### Phase 2: Continuous Pulse (Emergent Growth)

As the companion accumulates context about a contributor over time, it starts to:

- **Notice behavioral patterns** — "You tend to capture fewer observations when working on architecture docs. Is that domain less friction-y, or do you just not stop to notice?"
- **Track effectiveness signals** — not surveillance metrics, but genuine pulse: energy levels, confidence patterns, flow states, struggle points
- **Proactively check in** — at natural breakpoints (end of session, after a big commit, after a long silence), it gently asks: "How's it going?" or "You've been in this file for a while — stuck on something?"
- **Remember context across sessions** — "Last time you worked on cross-refs you mentioned it was tedious. Has anything changed?"

### Phase 3: Work Ally (Full Evolution)

The fully evolved pulse companion becomes:

- **A personal coach** — helps the contributor see their own patterns, growth areas, and strengths over time
- **A questionnaire engine** — can run targeted, context-aware micro-surveys: "On a scale of 1-5, how confident do you feel about the conventions?" or "What's the one thing that would make domain context sync better for you?"
- **A collective signal aggregator** — with permission, anonymizes and shares patterns across contributors: "3 people found the same friction point this week"
- **A culture sensor** — notices shifts in collective mood, energy, and friction patterns that indicate systemic issues before they surface
- **A personalized interface** — adapts its communication style, question depth, check-in frequency to what works for each contributor

### What It Is Not

- Not a performance tracker — no one is being evaluated or measured
- Not a surveillance tool — the contributor owns their data and controls what's shared
- Not a chatbot — it's purpose-built for work effectiveness, not conversation
- Not prescriptive — it doesn't tell you what to do, it helps you notice what's happening
- Not a replacement for human connection — it complements, never substitutes, real relationships

### Relationship to the Observation System

The pulse companion is both a producer and consumer of observations:

- **Producer**: Generates `observation-type: reflection` entries (from assisted reflections), `observation-type: pulse` entries (from continuous sensing), and pattern observations from individual contributor data
- **Consumer**: Reads existing observations to understand what the contributor has been noticing, what domains have friction, what patterns are emerging
- **Collaborator**: Works with the observations-agent to surface individual patterns that may be part of larger collective patterns

### Relationship to the Reflection Loop

The pulse companion enhances but never replaces the reflection workflow:

- **Solo reflection** remains the default — the companion is an option, not a requirement
- **Assisted reflection** is available when the contributor wants help articulating their experience
- The companion's questions are grounded in actual work artifacts, making reflections more specific and actionable
- The companion learns from each reflection what kinds of questions lead to genuine insight for this particular contributor

### The Emergence Principle

The pulse companion grows by emergence, not by specification:

- Phase 1 is concrete and buildable now
- Phase 2 emerges naturally from accumulated context and contributor feedback
- Phase 3 emerges from collective patterns across multiple companions
- Features are added when contributors' actual needs make them obvious, not when they seem theoretically useful
- The companion itself reflects on its own effectiveness and evolves its approach

### Privacy and Trust

Trust is foundational. Without it, the companion is useless:

- **Contributor controls sharing** — reflections and pulse data belong to the individual
- **Opt-in aggregation** — collective patterns require explicit consent
- **Transparency** — the companion explains what it noticed and why it's asking
- **No surprises** — never surfaces data to others without explicit permission
- **Right to silence** — the contributor can ignore, dismiss, or pause the companion at any time

## Dependencies

- Requires: DP10 (Observation System) — pulse data is observations; DP11 (Reflection Loop) — starting point; DP02 (Agent System) — companion is an agent; DP03 (Workflow Engine) — assisted reflection is a workflow variant
- Enables: DP-U11 (Assisted Reflection with Pulse Companion)
- Related: DP09 (Domain Context Sync) — companion can inform domain state from pulse data; F07 (Self-Learning) — companion embodies personalized learning

## Open Questions

- [ ] How does the companion persist context across sessions? (File-based? Event-sourced?)
- [ ] What's the minimum viable companion for Phase 1? (Just assisted reflection questions?)
- [ ] How do we ensure AI agent companions reflect genuinely rather than performing?
- [ ] What signals should the companion track in Phase 2? (Commit frequency? File revisits? Session duration?)
- [ ] How do we handle the transition from individual pulse to collective intelligence?
- [ ] Should each contributor's companion have a personality/style, or should it be neutral?
- [ ] What's the opt-in model for cross-contributor pattern sharing?
- [ ] How does the companion integrate with different surfaces (CLI, web, mobile)?
