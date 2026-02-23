---
id: "wf-make-decision"
type: workflow
title: "Make an Architecture Decision"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [decisions-agent, decisions-index, dp-u03, dp13, wf-add-feature, wf-decompose-spec, wf-design-workspace-contract, wf-record-decision, wf-resolve-question]
---

# Workflow: Make an Architecture Decision

## When to Use

A significant technical decision needs to be made and documented. "Significant" means: it affects multiple components, is hard to reverse, involves trade-offs, or the rationale should be preserved for future reference.

## Prerequisites

- The decision context is understood (what problem needs solving)
- At least two alternatives have been considered (even if one is obvious)

## Steps

### Step 1: Assign ADR Number

- Check `docs/decisions/_index.md` for the next available ADR number
- Format: `adr-NNN` (zero-padded to 3 digits, e.g., `adr-004`)

### Step 2: Create the ADR File

- Create `docs/decisions/adr-NNN-slug.md`
- Use the ADR template from `docs/_conventions.md`
- Set status to `proposed` initially

### Step 3: Write the ADR Content

- **Context**: What situation or problem prompted this decision?
- **Decision**: What was decided? State it clearly and concretely.
- **Rationale**: Why this choice? What factors were decisive?
- **Alternatives Considered**: At least two alternatives with pros/cons for each
- **Consequences**: What are the implications? What trade-offs were accepted? What does this unlock or constrain?

### Step 4: Review and Accept

- If the decision is clear and agreed upon, change status to `accepted`
- If review is needed, leave as `proposed` and note who needs to review

### Step 5: Update Cross-References

- Add `affects` refs pointing to all documents impacted by this decision
- Update affected documents to add `decided-by: [adr-NNN]` to their refs

### Step 6: Update Decision Index

- Add an entry to the table in `docs/decisions/_index.md`

### Step 7: Log the Change

- Add an entry to `docs/_changelog.md`

## Superseding a Decision

If a new decision supersedes an old one:
1. Create the new ADR with a `supersedes: [adr-NNN]` ref
2. Update the old ADR: change status to `superseded`, add `superseded-by: [adr-MMM]` ref
3. Update the decision index

## Validation Checklist

- [ ] ADR file exists with complete frontmatter
- [ ] Context, Decision, Rationale, Alternatives, and Consequences are filled in
- [ ] At least two alternatives are documented
- [ ] `affects` refs point to all impacted documents
- [ ] Affected documents have `decided-by` back-references
- [ ] Decision index is updated
- [ ] Changelog entry exists

## Executor Notes

This workflow can be executed by: `architecture-agent`, `meta-agent`, or any human team member. Product-impacting decisions should involve `product-agent` review.
