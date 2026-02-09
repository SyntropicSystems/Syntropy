---
id: "wf-capture-observation"
type: workflow
title: "Capture an Observation"
status: active
owner: observations-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [wf-audit-observations, dp10, observations-agent]
---

# Workflow: Capture an Observation

## When to Use

You notice something — a friction, bug, idea, question, anxiety, pattern, need, praise, or anything at all — and want to capture it before you forget. You don't need to have a solution. You don't need to be eloquent. You just need to get it down.

## Prerequisites

- None. Anyone can capture an observation at any time.

## Steps

### Step 1: Create the Observation File

- Create a new file in `observations/`
- Naming: `YYYY-MM-DD-short-slug.md` (e.g., `2025-02-09-cross-ref-friction.md`)
- If you write multiple observations on the same day, add a distinguishing slug

### Step 2: Fill in Frontmatter

Copy from `observations/_template.md` and fill in what you can:

```yaml
---
id: "obs-YYYY-MM-DD-slug"
type: observation
title: "Short descriptive title"
status: raw
observer: "your-name-or-role"
observation-type: "friction | bug | idea | question | anxiety | pattern | need | praise | general"
created: YYYY-MM-DD
updated: YYYY-MM-DD
domains: []
refs:
  related: []
tags: []
---
```

**Required**: `id`, `type`, `title`, `status` (set to `raw`), `created`

**Optional but helpful**: `observer`, `observation-type`, `domains`, `tags`, `refs`

If you're unsure about type or domain, leave them blank — the observations-agent will fill them in during audit.

### Step 3: Write the Observation

Write whatever is on your mind in the `## What happened / What I noticed` section. There is no wrong format:

- A single sentence is fine
- A detailed paragraph with context is great
- A brain dump with bullet points works
- Screenshots or log snippets are welcome (reference file paths)

**More context = more useful**, but don't let the desire for completeness stop you from capturing something. A vague note is infinitely better than a forgotten insight.

### Step 4 (Optional): Add Why and Next Steps

If you know why this matters or have ideas for what to do about it, add them in the optional sections. If not, skip them entirely.

### Step 5 (Optional): Add Structure

If you feel like it and it's natural for you:
- Set the `observation-type` to one of: `friction`, `bug`, `idea`, `question`, `anxiety`, `pattern`, `need`, `praise`, `general`
- Tag relevant `domains` (e.g., `[product, f04]` or `[architecture]` or `[meta]`)
- Add `refs` to related documents if you know them
- Add freeform `tags` for anything else

**Don't stress about this.** The observations-agent will add structure during audit. Your job is to capture, not to organize.

## Assisted Capture (Alternative)

If you'd rather talk through your observation or need help articulating it:

1. Spin up the observations-agent
2. Describe what you noticed conversationally
3. The agent will ask clarifying questions and create a well-structured observation file
4. Review and approve

This is especially useful when:
- You're not sure how to express what you're feeling
- The observation is complex and crosses multiple areas
- You want to make sure all relevant context is captured

## Validation Checklist

- [ ] Observation file exists in `observations/` with `YYYY-MM-DD-slug.md` naming
- [ ] Frontmatter has at minimum: `id`, `type: observation`, `title`, `status: raw`, `created`
- [ ] At least one sentence of content exists
- [ ] You didn't spend more than 5 minutes on this (unless you wanted to)

## Executor Notes

This workflow can be executed by: **anyone** — any human contributor, any AI agent, any role. The observations-agent can assist with capture or do it on someone's behalf. The whole point is zero barrier to entry.

## Tips for Effective Observations (Aspirational, Not Required)

These make observations more useful — but never let them stop you from capturing something:

1. **Be specific**: "The cross-ref process is slow" → "I spent 10 minutes updating 6 reciprocal refs after adding one feature spec"
2. **Include context**: What were you doing? What did you expect vs. what happened?
3. **Name the feeling**: Is this annoying? Scary? Exciting? Confusing? Feelings are valid data
4. **Suggest a direction**: Even "maybe we should automate this?" helps
5. **Link related things**: If you know which feature or doc is related, reference it

You'll naturally get better at this over time. The observations-agent will help.
