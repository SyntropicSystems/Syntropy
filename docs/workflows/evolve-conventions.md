---
id: "wf-evolve-conventions"
type: workflow
title: "Evolve Conventions"
status: active
owner: meta-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  related: [conventions, wf-record-decision, wf-update-document, wf-validate-knowledge-graph, dp05]
---

# Workflow: Evolve Conventions

## When to Use

- A new document type needs to be added (e.g., a new kind of knowledge graph node)
- An existing document type needs a new status in its lifecycle
- A new ID prefix convention is needed (e.g., for a new platform or layer)
- A naming convention needs to change
- A template needs to be added or updated
- Cross-reference rules need amendment

**This is a high-impact workflow.** Convention changes affect every document in the knowledge graph and every agent's behavior. Use `wf-record-decision` to document the rationale before applying the change.

## Prerequisites

- A clear need exists (not speculative — the convention gap has been encountered in practice)
- The change has been thought through for backward compatibility
- A decision record will be created if the change is significant (Type 1)

## Steps

### Step 1: Identify the Convention Gap

Document what's needed:
- What convention is missing or needs changing?
- What problem does this solve?
- What's the blast radius? (How many existing documents are affected?)

### Step 2: Assess Impact

| Impact level | Criteria | Example | Action |
|-------------|----------|---------|--------|
| **Low** | Additive, no existing docs affected | New template, new ID prefix | Proceed directly |
| **Medium** | Existing docs could benefit but aren't broken | New document type that retroactively applies to some docs | Record as Type 2 decision, proceed |
| **High** | Existing docs need migration | Changing an ID prefix, renaming a status value | Record as Type 1 decision, plan migration |

### Step 3: Record the Decision (if Medium or High)

Follow `wf-record-decision`:
- Problem: the convention gap
- Decision: the proposed convention change
- Success metrics: how you'll know the convention is working
- Revisit triggers: when to reconsider

### Step 4: Update `docs/_conventions.md`

Edit the conventions file:
1. Add new document type to the "Document Types" table
2. Add new ID prefix to the "Platform-Scoped ID Prefixes" or "Layer Module Prefixes" tables
3. Add new template to the "Document Templates" section
4. Update status lifecycles if applicable
5. Update naming conventions if applicable
6. Update `updated` date in frontmatter

### Step 5: Migrate Existing Documents (if needed)

For **High** impact changes only:

1. Identify all affected documents (search by type, status, or ID pattern)
2. Update each document's frontmatter to match the new convention
3. Follow `wf-update-document` for each changed file
4. Batch the changelog entries

### Step 6: Update Dependent Systems

Convention changes may ripple to:
- **Base traits** (`_base-traits.md`): if new conventions affect all agents
- **Agent manifests**: if new document types change domain scope
- **Validation tooling**: if the CLI needs to validate new types
- **Generated artifacts**: if conventions affect generation (run sync)

### Step 7: Communicate the Change

- Add changelog entry for the convention update
- If agents need to know, update relevant domain `CONTEXT.md` files
- The conventions file itself is in every agent's always-load context, so the change is automatically visible on next load

## Validation Checklist

- [ ] Convention change is documented in `docs/_conventions.md`
- [ ] Decision record exists (for Medium/High impact)
- [ ] Existing documents are migrated (for High impact)
- [ ] Base traits updated if needed
- [ ] Validation tooling updated if needed
- [ ] Generated artifacts synced
- [ ] Changelog entry exists
- [ ] `conventions` frontmatter `updated` date is current

## Executor Notes

This workflow should be executed by `meta-agent` or a human. Convention changes are governance-level decisions — they affect the entire system. Err on the side of additive changes (new types, new prefixes) rather than breaking changes (renamed types, changed statuses).

**Principle**: Conventions should be discovered from practice, not designed in advance. If you find yourself creating a convention for something you haven't done yet, wait until you've done it at least once and understand the pattern.

## Why This Workflow Exists

Without a process for evolving conventions, they either fossilize (becoming a constraint on growth) or drift silently (as individual contributors invent ad-hoc patterns). This workflow makes convention evolution explicit, deliberate, and traceable.
