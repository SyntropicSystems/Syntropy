---
id: "wf-record-decision"
type: workflow
title: "Record a Decision"
status: active
owner: decisions-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [wf-make-decision, wf-resolve-question, dp13, decisions-agent]
---

# Workflow: Record a Decision

## When to Use

A decision has been made — or is about to be made — and should be captured. This applies to any decision type: product, process, methodology, convention, principle, tooling, or any other choice that someone might later ask "why did we do it this way?"

Use this workflow for general decisions. For architecture-specific decisions, you may also use `wf-make-decision` (Make an Architecture Decision), which produces an ADR with the `adr-NNN` prefix.

**Rule of thumb**: If it took more than 30 seconds of thought, or if someone else might make the same decision differently, it's worth recording.

## Prerequisites

- The decision context is understood (what problem you're solving)
- You know what was decided (or are about to decide)

## Steps

### Step 1: Classify the Decision

Determine the decision type:

- **Type 1** — Hard to reverse, high stakes, affects multiple areas. Requires thorough documentation and review.
- **Type 2** — Easily reversible, low blast radius. Can be brief. Should still be recorded to prevent tribal knowledge.

And the scope:

- **Architecture** → use `wf-make-decision` instead (produces `adr-NNN`)
- **Product, process, methodology, convention, principle, or other** → continue with this workflow (produces `dr-NNN`)

### Step 2: Assign ID and Create File

- Check `docs/decisions/_index.md` for the next available DR number
- Format: `dr-NNN` (zero-padded to 3 digits, e.g., `dr-001`)
- Create `docs/decisions/dr-NNN-slug.md`

### Step 3: Write the Decision Record

Fill in the core sections. For Type 2 decisions, keep it brief. For Type 1, be thorough.

**Required sections:**

- **Problem Stack**: What problem does this solve? How does it connect to higher-level goals? (Even one sentence connecting to a parent decision or a JTBD is enough.)
- **Decision**: What was decided? State it clearly.

**Recommended sections (especially for Type 1):**

- **Context & Data**: What was true when this decision was made? What constraints, observations, or data informed it?
- **Options Explored**: What alternatives were considered? At least one alternative, even if the choice was obvious.
- **Success Metrics**: How will we know this decision is working?
- **Revisit Triggers**: Under what conditions should we reconsider?

**Optional sections:**

- **Exceptions**: Does this decision have domain-specific exceptions?
- **Consequences**: What does this unlock or constrain?

### Step 4: Set Frontmatter

```yaml
---
id: "dr-NNN"
type: decision-record
title: "Decision Title"
status: accepted
owner: relevant-agent
decision-type: type-2
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  parent: []          # higher-level decision this serves
  children: []        # sub-decisions that implement this
  domain: []          # which domain(s) this applies to
  affects: []         # documents impacted by this decision
  tensions: []        # decisions this has acknowledged tension with
  related: []
tags: []
---
```

- Set `status` to `accepted` if the decision is made, `proposed` if it needs review
- Set `decision-type` to `type-1` or `type-2`
- Set `domain` to the relevant domain(s), or omit for global decisions

### Step 5: Check for Conflicts

Before finalizing, scan existing decisions for potential conflicts:

- Review decisions in the same domain
- Check parent and sibling decisions for contradictions
- If a conflict exists: either reconcile, add an explicit exception, or supersede the older decision

### Step 6: Update Cross-References

- Add `affects` refs pointing to all documents impacted by this decision
- Update affected documents to add `decided-by: [dr-NNN]` to their refs
- If this decision has a parent, add `children: [dr-NNN]` to the parent's refs
- If this supersedes an older decision, update the older decision's status and refs

### Step 7: Update Index, Registry, and Changelog

- Add an entry to `docs/decisions/_index.md`
- Add an entry to `docs/_registry.md`
- Log the change in `docs/_changelog.md`

## Validation Checklist

- [ ] Decision record file exists with complete frontmatter
- [ ] Problem Stack and Decision sections are filled in
- [ ] Decision type (Type 1/2) is set
- [ ] Domain scope is set (or explicitly global)
- [ ] No unresolved conflicts with existing decisions
- [ ] `affects` refs point to impacted documents
- [ ] Affected documents have `decided-by` back-references
- [ ] Decisions index is updated
- [ ] Registry entry exists
- [ ] Changelog entry exists

## Superseding a Decision

When a new decision supersedes an old one:

1. Create the new DR with `supersedes: [dr-NNN]` ref
2. Update the old DR: status → `superseded`, add `superseded-by: [dr-MMM]` ref
3. Check: does superseding this decision affect any of its children? If so, note and address.
4. Update the decisions index

## Executor Notes

This workflow can be executed by: `decisions-agent`, `meta-agent`, any domain agent within their scope, or any human contributor. For architecture-specific decisions, prefer `wf-make-decision` which routes through `architecture-agent`.
