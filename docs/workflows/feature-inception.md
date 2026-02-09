---
id: "wf-feature-inception"
type: workflow
title: "Feature Inception"
status: active
owner: meta-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [wf-add-feature, wf-create-agent, wf-capture-observation, wf-refine-story]
---

# Workflow: Feature Inception

## When to Use

A new cross-cutting capability needs to be added to the system — not just a feature spec, but the full stack: JTBD, feature spec, use cases, user stories, workflows, agent, glossary terms, and directory structure as needed. This is the meta-workflow that orchestrates everything required to fully introduce a new capability into the knowledge graph.

Use this instead of `wf-add-feature` when the scope is larger than a single feature spec — when the new capability needs its own workflows, its own agent, its own directory, or touches multiple layers of the system simultaneously.

## Prerequisites

- The capability has been discussed and scoped at a high level
- It addresses at least one existing Job to Be Done, or a new JTBD needs to be created
- The implementer has read CLAUDE.md and understands the knowledge graph structure

## Steps

### Step 1: Scope the Inception

Determine which layers this capability touches. Check all that apply:

- [ ] **JTBD**: Does this need a new Job to Be Done? (New DJ for dev platform, new J for application)
- [ ] **Glossary**: Does this introduce new canonical terms?
- [ ] **Feature Spec**: Does this need a feature spec? (Almost always yes)
- [ ] **Use Cases**: Does this need concrete usage scenarios?
- [ ] **User Stories**: Does this need user stories across consumer types?
- [ ] **Workflows**: Does this need executable process documents?
- [ ] **Agent**: Does this need a dedicated DRI agent?
- [ ] **Directory**: Does this need its own directory for content? (e.g., `observations/`)
- [ ] **Base Traits**: Does this add inherited rules or workflows for all agents?
- [ ] **Conventions**: Does this introduce a new document type or status lifecycle?

Document the scope before proceeding. This prevents discovering missing layers halfway through.

### Step 2: Create in Dependency Order

Work through the checked layers in this order (each layer may reference the previous):

1. **JTBD** — Add to `docs/vision/jtbd.md` or `docs/vision/jtbd-dev-platform.md`
2. **Glossary** — Add terms to `docs/vision/glossary.md`
3. **Feature Spec** — Follow `wf-add-feature` (Steps 1–3 only: assign ID, create file, write spec)
4. **Use Cases** — Create use case files in the appropriate `use-cases/` directory
5. **User Stories** — Add stories to the appropriate stories file
6. **Workflows** — Create workflow files in `docs/workflows/`
7. **Agent** — Follow `wf-create-agent` if a new agent is needed
8. **Directory & Templates** — Create directory, `_index.md`, and `_template.md` if needed
9. **Base Traits** — Add inherited rules or workflows if this affects all agents
10. **Conventions** — Add document type, ID prefix, and status lifecycle if new

### Step 3: Wire Cross-References

After all documents are created, wire the graph:

- Every new document's `refs` should point to related existing documents
- Every referenced existing document should have a reciprocal ref added
- The feature spec's `enables` should list the use cases it enables
- The feature spec's `informed-by` should point to the JTBD
- The agent's `related` should point to its feature spec and workflows
- Workflows should cross-reference each other where related

### Step 4: Update All Indexes and Navigation

- `docs/_registry.md` — Add entries for every new document
- `docs/product/_index.md` or `docs/product/dev-platform/_index.md` — Add feature to feature map, update counts
- `CLAUDE.md` — Update if new workflows, agents, or directories were added
- Agent routing table in `agents/meta-agent.md` — Update if new agent was created
- Agent domain state — Update if domain focus or open threads changed

### Step 5: Log All Changes

Add entries to `docs/_changelog.md` covering:
- Every new document created
- Every existing document updated
- Group related changes where it aids readability

### Step 6: Reflect

Run `wf-reflect` — capture what worked, what was hard, what you'd want next time. This feeds the observation system and helps improve the inception process itself.

## Validation Checklist

- [ ] All scoped layers have been created (Step 1 checklist fully addressed)
- [ ] Cross-references are bidirectional across all new and updated documents
- [ ] Registry has entries for every new document
- [ ] Product index and/or dev platform index updated with correct counts
- [ ] CLAUDE.md updated if structure changed (new agents, workflows, directories)
- [ ] Meta-agent routing table updated if new agent created
- [ ] Changelog entries exist for all changes
- [ ] All new documents have complete YAML frontmatter
- [ ] A reflection has been captured (observation or inline notes)

## Executor Notes

This workflow can be executed by: `meta-agent` or any human. For large inceptions, consider breaking the work into phases: (1) vision layer (JTBD, glossary), (2) product layer (feature, use cases, stories), (3) process layer (workflows, agent), (4) infrastructure layer (directory, base traits, conventions), (5) integration layer (cross-refs, indexes, changelog).

## Why This Workflow Exists

When adding the Observation System (DP10), the implementer had to reverse-engineer the full scope by reading the changelog to see what was done for DP09. The changelog showed 13+ individual changes, but no single workflow described the complete inception. This workflow closes that gap — it's the single source of truth for "how do I add a complete new capability to the system?"
