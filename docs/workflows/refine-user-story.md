---
id: "wf-refine-story"
type: workflow
title: "Refine a User Story"
status: active
owner: product-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [wf-add-feature]
---

# Workflow: Refine a User Story

## When to Use

A user story needs to be taken from a rough idea to a well-defined, testable statement that clearly connects to features and JTBDs.

## Prerequisites

- The story is captured in `docs/product/user-stories/stories.md`
- The features it relates to exist (at least as `exploring` status)

## Steps

### Step 1: Review the Story Format

Ensure the story follows the canonical format:

> As a [specific user role], I want [concrete goal] so [measurable benefit].

- **User role** should be specific (e.g., "busy professional", "homeowner", "user on the go") not generic ("user")
- **Goal** should describe a behavior, not an implementation
- **Benefit** should connect to a JTBD

### Step 2: Map to Features

- Identify which features (F01–F12+) this story exercises
- Add feature references below the story: `**Features:** F01, F04, F10`
- Ensure referenced features exist and are at least `exploring`

### Step 3: Map to JTBDs

- Identify which Job(s) to Be Done this story traces back to
- If a story doesn't trace to any JTBD, question whether it's needed

### Step 4: Check for Gaps

- Does this story reveal a feature gap? → use `docs/workflows/add-feature-spec.md`
- Does this story raise an open question? → create an `oq-*` file
- Does this story imply a UX pattern? → flag for `ux-agent`

### Step 5: Update Status

- If the story is well-defined and testable, mark as `specified`
- If it needs more detail, keep at `defining`

### Step 6: Log the Change

- Add an entry to `docs/_changelog.md`

## Validation Checklist

- [ ] Story follows "As a / I want / so" format
- [ ] User role is specific
- [ ] Goal is behavioral, not implementational
- [ ] Benefit connects to at least one JTBD
- [ ] Feature references are listed and bidirectional
- [ ] Changelog entry exists

## Executor Notes

This workflow can be executed by: `product-agent` or any human team member.
