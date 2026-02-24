---
id: "wf-maintain-glossary"
type: workflow
title: "Maintain the Glossary"
status: active
owner: meta-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  related: [glossary, wf-update-document, wf-feature-inception, wf-add-knowledge-document, conventions]
---

# Workflow: Maintain the Glossary

## When to Use

- A new canonical term needs to be defined (introduced by a new feature, layer, or concept)
- An existing term's definition needs updating (scope changed, understanding deepened)
- A term needs disambiguation (context qualifier needed, like "Fog of War (experience layer)")
- After a feature inception that introduced new concepts

## Prerequisites

- The term represents a concept used across multiple documents or by multiple agents
- The definition can be stated in 1-3 sentences (if it takes more, it probably needs its own document with a glossary entry that summarizes)
- You've checked `docs/vision/glossary.md` to confirm the term doesn't already exist (or needs revision)

## Steps

### Step 1: Check Existing Terms

Read `docs/vision/glossary.md`. Verify:
- The term isn't already defined (search for the exact term)
- No existing term covers the same concept under a different name
- If the concept is already partially defined, this is an update, not an addition

### Step 2: Write the Definition

Follow the existing glossary pattern:

```markdown
| **Term Name** | Definition text in 1-3 sentences. Include the essential "what" and "why." Reference the parent system or layer if the term is scoped (e.g., "Part of the Experience Layer's progression system."). |
```

**Writing rules:**
- Start with what the term *is*, not what it *does*
- Include context qualifiers for ambiguous terms: `**Fog of War** (experience layer)`
- Reference the source layer/feature if scoped to one
- Keep it self-contained — a reader should understand the term without clicking elsewhere
- Use the same voice and density as existing entries

### Step 3: Place the Term

Insert the new term in the glossary table. Terms are organized by conceptual grouping (not alphabetical):
- Core platform terms first
- Then grouped by feature/layer
- New layer terms go after existing layer terms

### Step 4: Update Glossary Frontmatter

- Update `updated` date to today
- If the new term relates to a new layer or feature, add the layer/feature ID to `refs.related`

### Step 5: Cross-Reference from Source Documents

The document that introduced the term should reference the glossary:
- Add `glossary` to the source document's `refs.related` if not already present
- This ensures the term is traceable back to its origin

### Step 6: Log the Change

Add an entry to `docs/_changelog.md`:

```
| YYYY-MM-DD | updated | glossary | Added terms: {term1}, {term2}, ... | {author} |
```

## Validation Checklist

- [ ] Term follows the existing definition pattern (table row format)
- [ ] Definition is 1-3 sentences and self-contained
- [ ] No duplicate or conflicting term exists
- [ ] `updated` date on glossary is current
- [ ] Source document references the glossary
- [ ] Glossary `refs.related` includes the relevant layer/feature
- [ ] Changelog entry exists

## Executor Notes

This workflow can be executed by any agent or human. The glossary is a shared resource — changes should be conservative and precise. When in doubt about whether a term deserves a glossary entry, apply this test: "Would a new contributor need this term defined to understand the knowledge graph?" If yes, add it.

## Common Patterns

**After a feature inception**: Feature inception (Step 2) includes glossary updates. Use this workflow for the glossary-specific steps.

**After documenting a new layer**: A new layer typically introduces 5-15 new terms. Add them in a single batch with one changelog entry.

**Revising an existing term**: If the definition changed because understanding deepened, update in place. Don't create a new entry — that would break the "one canonical definition" rule.
