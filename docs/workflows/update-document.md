---
id: "wf-update-document"
type: workflow
title: "Update an Existing Document"
status: active
owner: meta-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  related: [base-traits, conventions, dp01, wf-add-feature, wf-add-knowledge-document, wf-evolve-conventions, wf-maintain-glossary, wf-sync-domain-context, wf-validate-knowledge-graph]
---

# Workflow: Update an Existing Document

## When to Use

An existing document in the knowledge graph needs to be modified — content updated, status changed, references added, errors corrected, or content expanded. This is the most common documentation workflow.

## Prerequisites

- The document exists in the knowledge graph (has YAML frontmatter with a stable ID)
- You know what change is needed and why

## Steps

### Step 1: Read the Current Document

Read the document in full. Note:
- Current `updated` date in frontmatter
- Current `status`
- Current `refs` (all cross-references)
- Current content structure

### Step 2: Make the Content Changes

Edit the document content as needed. Follow the document's existing structure and conventions from `docs/_conventions.md`.

### Step 3: Update Frontmatter

- **Always** update the `updated` field to today's date
- If the status changed, update `status`
- If new cross-references are needed, add them to `refs`

### Step 4: Maintain Cross-References

If you added new `refs` entries:

1. For each new reference A → B, open document B and add the reciprocal reference B → A
2. Use the appropriate ref type:
   - Added a `depends-on`? → Add corresponding `enables` on the target
   - Added a `related`? → Add `related` on the target
   - Added a `decided-by`? → Add `affects` on the decision
3. Or run `syntropy docs sync` to auto-add missing backrefs

If you removed `refs` entries:
1. Check if the reciprocal reference in the target document should also be removed
2. Only remove reciprocal refs if the relationship no longer exists

### Step 5: Update Affected Indexes

If the change affects navigation or discovery:
- Product index (`docs/product/_index.md` or platform-specific `_index.md`) — update if title, status, or priority changed
- Module index (`_index.md` in the module's directory) — update if module scope changed
- Registry — run `syntropy gen registry` (registry is generated, not hand-edited)

### Step 6: Log the Change

Add an entry to `docs/_changelog.md`:

```
| YYYY-MM-DD | updated | {document-id} | {brief description of what changed} | {author} |
```

## Validation Checklist

- [ ] `updated` date in frontmatter is set to today
- [ ] All new cross-references are bidirectional
- [ ] No orphaned references (references to documents that don't exist)
- [ ] Affected indexes are current
- [ ] Changelog entry exists
- [ ] `syntropy docs check` passes (if available)

## Executor Notes

This workflow can be executed by any agent or human. It is the default workflow for any document modification. For specialized updates, consider:

- **Glossary changes** → use `docs/workflows/maintain-glossary.md` instead
- **Convention changes** → use `docs/workflows/evolve-conventions.md` instead
- **Status-only changes** → this workflow still applies (frontmatter is content)
- **Batch updates** (e.g., updating refs across 10 files after a new feature) → apply Step 4 to all files, then do a single changelog entry summarizing the batch

## Why This Workflow Exists

Without a codified update process, documents drift: `updated` dates become stale, cross-references become unidirectional, changelog entries are forgotten, and indexes fall behind. This workflow makes "update a document properly" a mechanical process rather than tribal knowledge.
