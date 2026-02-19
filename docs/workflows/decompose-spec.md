---
id: "wf-decompose-spec"
type: workflow
title: "Decompose a Spec Document"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [wf-add-feature, wf-make-decision, wf-integrate-knowledge]
---

# Workflow: Decompose a Spec Document

## When to Use

A monolithic specification or large document needs to be broken down into the knowledge graph structure — individual feature specs, use cases, architecture docs, decisions, and open questions.

## Prerequisites

- The source document exists and is readable
- The knowledge graph structure (directories, conventions, templates) is set up
- The source document will be archived but kept as historical reference

## Steps

### Step 1: Map the Source Document

Read through the entire source document and create a mapping:

| Source Section | Target Type | Target Path | Target ID |
|----------------|------------|-------------|-----------|
| Philosophy section | vision | `docs/vision/manifesto.md` | manifesto |
| Feature X | feature-spec | `docs/product/features/fNN-*.md` | fNN |
| Architecture section | architecture | `docs/architecture/*.md` | arch-* |
| Implicit decision | adr | `docs/decisions/adr-NNN-*.md` | adr-NNN |
| Open question | open-question | `docs/open-questions/oq-*.md` | oq-* |

### Step 2: Extract Vision Documents

Start with the foundational documents — philosophy, JTBD, principles, glossary. These are referenced by everything else, so they must exist first.

### Step 3: Extract Feature Specs

For each feature in the source:
1. Create the feature file using the template
2. Add frontmatter with all cross-references
3. Extract the full behavioral description (don't summarize)
4. Identify which JTBDs this feature addresses

### Step 4: Extract Use Cases and Stories

- Create individual use case files
- Map each use case to the features it exercises
- Create or update the stories file with feature mappings

### Step 5: Extract Architecture Documents

- Create individual architecture docs for each technical domain
- Identify implicit decisions and create ADRs for them
- Extract open questions into individual files

### Step 6: Extract UX Patterns

- Create individual UX pattern files
- Link each pattern to the features it serves

### Step 7: Wire Cross-References

After all files exist:
1. Go through every document and verify `refs` are complete
2. Ensure bidirectionality — if A refs B, B refs A
3. Check that every ID used in refs resolves to an actual file

### Step 8: Update Registry and Changelog

- Add every new document to `docs/_registry.md`
- Log the decomposition in `docs/_changelog.md`

### Step 9: Archive the Source

- Keep the original document but mark it as archived
- It serves as historical reference, not source of truth

## Validation Checklist

- [ ] Every section of the source document has a target in the graph
- [ ] No content is lost — everything from the source appears in the graph
- [ ] All cross-references are bidirectional
- [ ] Registry has every new document
- [ ] Changelog records the decomposition
- [ ] Source document is archived
- [ ] A new contributor can navigate from `CLAUDE.md` to any extracted concept in ≤3 hops

## Executor Notes

This workflow is typically executed by `meta-agent` with parallel delegation to domain agents for their respective content. It's designed for one-time use per source document.
