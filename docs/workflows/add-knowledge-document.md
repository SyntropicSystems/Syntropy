---
id: "wf-add-knowledge-document"
type: workflow
title: "Add a Knowledge Document"
status: active
owner: meta-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  related: [wf-add-feature, wf-feature-inception, wf-update-document, wf-maintain-glossary, conventions]
---

# Workflow: Add a Knowledge Document

## When to Use

A new non-feature document needs to be added to the knowledge graph: a vision document, architecture document, module deep-dive, or reference document. This complements `wf-add-feature` (which covers feature specs) and `wf-feature-inception` (which covers the full cross-cutting scope of a new capability).

Use this workflow when:
- Documenting a new architectural subsystem
- Creating a vision/philosophy document for a new layer or concept
- Adding module deep-dives to an existing feature/layer
- Creating a reference document (index, navigation, glossary-like)

## Prerequisites

- The document addresses a concept not already covered by an existing document
- You know which document type and directory it belongs in (see `docs/_conventions.md`)
- For module deep-dives: the parent feature or vision document already exists

## Steps

### Step 1: Determine Document Type and Location

| If creating... | Type | Location | ID Pattern |
|----------------|------|----------|------------|
| Vision/philosophy document | `vision` | `docs/vision/` | descriptive slug |
| Architecture document | `architecture` | `docs/architecture/` | `arch-` + slug |
| Module deep-dive | `module` | `docs/product/{platform}/{layer}/` | `{layer-prefix}-` + slug |
| Reference/index | `reference` | appropriate directory | descriptive slug |

### Step 2: Assign a Stable ID

- Check `docs/_registry.md` for ID conflicts
- Follow the ID prefix conventions from `docs/_conventions.md`
- The ID must be unique across the entire knowledge graph
- The ID never changes, even if the file moves

### Step 3: Create the File

Use the appropriate template from `docs/_conventions.md`:
- Vision → Vision Document template
- Architecture → Architecture Document template
- Module → Module Deep-Dive template
- Reference → minimal frontmatter + content

Fill in all frontmatter fields:
- `id`, `type`, `title`, `status`, `owner`, `created`, `updated`
- `refs`: identify depends-on, enables, related relationships
- `tags`: relevant freeform tags

### Step 4: Write the Content

Follow the template structure. Key principles:
- **Self-contained**: the document should make sense on its own
- **Linked**: reference related documents by ID, not by restating their content
- **Derivable**: for modules, include a "Derivable Features" table where applicable
- **Open-ended**: include "Open Questions" for unresolved items

### Step 5: Wire Cross-References

1. Add refs in the new document pointing to related existing documents
2. Update each referenced document with reciprocal refs back to the new document
3. For modules: update the parent feature spec's `refs` and the module index (`_index.md`)

Or run `syntropy docs sync` to auto-add missing backrefs.

### Step 6: Update Indexes

- **Module index** (`_index.md` in the module directory): add the new module
- **Product index** (platform `_index.md`): update if this adds a new documentation area
- **Registry**: run `syntropy gen registry`

### Step 7: Log the Change

Add an entry to `docs/_changelog.md`:

```
| YYYY-MM-DD | created | {document-id} | {brief description} | {author} |
```

## Validation Checklist

- [ ] File exists with complete YAML frontmatter
- [ ] ID is unique (no conflicts in registry)
- [ ] Document type matches conventions
- [ ] Cross-references are bidirectional
- [ ] Module index updated (if applicable)
- [ ] Product/platform index updated (if applicable)
- [ ] `syntropy gen registry --check` is clean
- [ ] Changelog entry exists

## Executor Notes

This workflow can be executed by any domain agent or human. The domain agent that owns the document's area should be the `owner` in frontmatter.

**For batch creation** (e.g., documenting a new layer with 10+ modules): create all documents first, then wire cross-references in a single pass, then update indexes, then write one batched changelog entry.

**Architecture vs. module**: Architecture documents live in `docs/architecture/` and describe *how* the system works technically. Module deep-dives live under their feature directory and describe *what* the design is in detail. Some concepts need both — an architecture doc for the technical integration and modules for the design deep-dives.

## Why This Workflow Exists

`wf-add-feature` covers feature specs. `wf-feature-inception` covers the full cross-cutting scope. But neither covers the common case of adding a single vision, architecture, or module document. This workflow fills that gap — it's the "add a non-feature document" counterpart to `wf-add-feature`.
