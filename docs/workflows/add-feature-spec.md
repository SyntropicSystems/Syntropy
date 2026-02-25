---
id: "wf-add-feature"
type: workflow
title: "Add a New Feature Spec"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2026-02-25
refs:
  decided-by: [dr-002, dr-003]
  related: [dp-u01, el-feature-derivation, wf-add-knowledge-document, wf-create-agent, wf-decompose-spec, wf-feature-inception, wf-make-decision, wf-refine-story, wf-update-document]
---

# Workflow: Add a New Feature Spec

## When to Use

A new feature needs to be formally specified and added to the knowledge graph — whether it's a brand new idea or a capability that was discussed informally and needs to be captured.

## Prerequisites

- The feature addresses at least one Job to Be Done (see `docs/vision/jtbd.md`)
- A priority level (P0/P1/P2) has been determined or can be proposed

## Steps

### Step 1: Assign Feature ID

- Check `docs/_registry.md` for the next available feature number
- Format: `fNN` (zero-padded, e.g., `f13`, `f14`)

### Step 2: Create the Feature File

- Create `docs/product/features/fNN-feature-name.md`
- Use the feature-spec template from `docs/_conventions.md`
- Fill in all frontmatter fields:
  - `id`, `type: feature-spec`, `title`, `status` (start at `exploring`), `owner`, `priority`
  - `refs`: identify depends-on, enables, related, decided-by relationships
  - `tags`: relevant freeform tags

### Step 3: Write the Spec Content

- **Summary**: One paragraph describing what and why
- **Jobs Addressed**: Which JTBDs this feature serves (must have at least one)
- **How It Works**: Detailed behavioral description — what the user sees, what happens
- **Dependencies**: What this feature requires and what it enables
- **Open Questions**: Any unresolved items (create `oq-*` files for significant ones)

### Step 4: Update Cross-References

- Add your intended `refs` edges in the new feature spec frontmatter.
- Run `syntropy docs sync` to deterministically add any missing reciprocal refs (backrefs).

### Step 5: Update the Registry

- Run `syntropy gen registry` (the registry is generated; do not hand-edit `docs/_registry.md`)
- Add the feature to the appropriate priority section in `docs/product/_index.md`

### Step 6: Assign Agent Ownership

- Determine if this feature needs a dedicated feature-agent
- **Needs a feature agent if**: the feature has significant depth, its own UX patterns, its own data model concerns, or crosses multiple domain boundaries
- **Does NOT need a feature agent if**: it's small, well-scoped, and fits within an existing domain agent's scope
- If creating a feature agent, use `docs/workflows/create-agent.md`

### Step 7: Log the Change

- Add an entry to `docs/_changelog.md`

## Validation Checklist

- [ ] Feature file exists with complete frontmatter
- [ ] At least one JTBD is referenced
- [ ] `syntropy docs check` passes (or `syntropy docs sync --check` is clean)
- [ ] `syntropy gen registry --check` is clean
- [ ] Product index (`docs/product/_index.md`) is updated
- [ ] Agent ownership is assigned
- [ ] Changelog entry exists

## Executor Notes

This workflow can be executed by: `product-agent`, `meta-agent`, or any human team member. If the feature has architecture implications, consult `architecture-agent` during Step 3.

**Note:** If the new capability requires more than just a feature spec — e.g., it needs its own workflows, agent, directory, JTBD, or glossary terms — use `docs/workflows/feature-inception.md` instead. This workflow is for adding a single feature spec to the graph; feature inception covers the full cross-cutting scope.
