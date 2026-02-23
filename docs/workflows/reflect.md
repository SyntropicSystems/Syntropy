---
id: "wf-reflect"
type: workflow
title: "Reflect After Work"
status: active
owner: observations-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [dp-u10, dp-u11, dp10, dp11, dp12, observations-agent, pulse-companion-agent, wf-capture-observation, wf-feature-inception]
---

# Workflow: Reflect After Work

## When to Use

You just finished a piece of work — a feature inception, a spec review, a debugging session, an audit, a document restructuring, anything. Before you move on, take a few minutes to notice how it went. Not to fix anything. Just to notice.

This feeds the observation system. Over time, reflections from many contributors surface patterns that no individual could see alone.

## Prerequisites

- You just completed some work (or reached a meaningful stopping point)
- That's it. No other prerequisites.

## Steps

### Step 1: Pause

Stop before starting the next thing. The reflection happens in the gap between finishing one task and starting another. If you skip it now, you'll forget — the experience is freshest right after the work.

### Step 2: Notice Your Experience

Ask yourself these questions. You don't need to answer all of them — just the ones that resonate:

**What worked well?**
- What felt smooth, effective, or satisfying?
- Where did the system/process/tools help you?
- What would you want to keep doing exactly as you did?

**What was hard?**
- Where did you get stuck, feel confused, or lose time?
- What felt harder than it should have been?
- Where did you have to guess or improvise?

**How did it feel?**
- Was the work energizing or draining?
- Did you feel confident or uncertain?
- Were there moments of frustration, anxiety, or satisfaction?
- Feelings are data — they often point to issues before they're consciously recognized

**What would you need?**
- If you could change one thing about how this went, what would it be?
- What information, tool, process, or support was missing?
- What would make you more effective next time?

### Step 3: Capture It

Create an observation file using `wf-capture-observation` with these additions:

- Set `observation-type: reflection`
- Set `domains` to whatever domain(s) your work touched
- In the content, note what work you were doing (so there's context)

The same rules as observations apply: **any format, any length, any level of structure**. A single honest sentence beats a formulaic paragraph. Don't perform a reflection — just notice and write.

**Examples of good reflections:**

> "Adding the observations feature. I had to reverse-engineer what documents to create by reading the changelog for DP09. Would have been way faster with a 'feature inception' workflow that told me the full scope upfront."

> "Auditing cross-references. Spent 30 minutes and found 4 missing reciprocal refs. The process works but it's tedious and error-prone. I kept worrying I'd miss one."

> "Loading the architecture-agent context. The manifest lists 7 'Always' docs but I only needed 2 of them for this task. The rest was noise. Felt like I was reading a textbook before answering one question."

> "This went great. The workflow had every step I needed. Finished in 20 minutes and felt confident the result was correct."

### Step 4: Move On

That's it. The observations-agent will audit your reflection alongside other observations during the next audit cycle. You don't need to tag it perfectly, structure it beautifully, or propose solutions. You just needed to notice and capture.

## Validation Checklist

- [ ] An observation file exists with `observation-type: reflection`
- [ ] The reflection mentions what work was being done (context)
- [ ] At least one honest sentence about the experience
- [ ] You didn't spend more than 5 minutes (unless you wanted to)

## Executor Notes

This workflow can be executed by: **anyone** — human or AI agent. It's intentionally the last step of `wf-feature-inception` and can be the last step of any significant workflow.

**For AI agents**: Reflect genuinely on your actual experience processing the task. What context was helpful? What was missing? Where did you have to infer? Where were you uncertain? This is valuable data for improving how the system serves AI agents — not theoretical observations about what an ideal system would look like, but what actually happened when you did the work.

**This is not a performance review.** No one is evaluating the quality of your reflection. No reflection is too short, too messy, or too emotional. The only bad reflection is the one you didn't capture.

## Assisted Reflection (with Pulse Companion)

If you want help articulating your experience, you can invoke the pulse companion for an assisted reflection. Instead of reflecting alone, the companion:

1. **Reads your work context** — commits, files changed, AI agent threads, observations captured during the session
2. **Opens with a specific observation** — grounded in what actually happened, not a generic prompt
3. **Asks follow-up questions** — helps you get past "it was fine" to the specific frictions, satisfactions, and needs
4. **Captures the reflection for you** — creates a well-structured observation preserving your voice

### When to use assisted reflection
- When you notice something was hard but can't quite articulate why
- When the session was complex and you want help unpacking it
- When you want richer, more specific reflections than you'd produce solo
- When you're new to reflecting and want to learn what good noticing looks like

### When to reflect solo
- When you know exactly what you want to say
- When the reflection is quick and clear
- When you prefer privacy (the companion reads work artifacts to ask good questions)
- Always — solo reflection is the default and is never gated on companion availability

See `docs/product/dev-platform/features/dp12-pulse-companion.md` for the full companion spec.
