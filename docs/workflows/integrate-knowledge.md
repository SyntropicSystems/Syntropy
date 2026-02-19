---
id: "wf-integrate-knowledge"
type: workflow
title: "Integrate Knowledge"
status: active
owner: meta-agent
created: 2026-02-19
updated: 2026-02-19
refs:
  related: [wf-add-feature, wf-capture-observation, wf-feature-inception, wf-decompose-spec, wf-record-decision, wf-refine-story, wf-resolve-question]
---

# Workflow: Integrate Knowledge

## When to Use

New information needs to enter the knowledge graph — from any source, in any form. This is the universal intake process that ensures nothing gets duplicated, everything stays structured, and the graph maintains integrity regardless of how the information arrived.

**Input modes this workflow handles:**

- **Conversational exploration** — chatting through ideas with AI or collaborators, exploring a concept before it's concrete
- **Notes and documents** — existing write-ups, brain dumps, meeting notes, or reference material that need to be distilled and placed
- **Existing systems** — concepts or systems you've already carved out mentally but haven't formalized into specs
- **Extending existing artifacts** — new JTBDs, features, use cases, or stories to add to what already exists
- **Quick ideas** — a single insight or idea that needs to find its home

**Use this instead of going directly to a specific workflow when:**

- You're not sure which type of artifact your information should become
- Your input contains multiple types of knowledge mixed together
- You want deduplication guarantees before creating anything
- You need help distilling raw thinking into structured artifacts
- You're unsure whether something already exists in the graph

**Skip this and use a specific workflow directly when:**

- You already know you're adding a feature spec → `wf-add-feature`
- You already know you're recording a decision → `wf-record-decision`
- You already know you're capturing a raw signal → `wf-capture-observation`
- You have a large cross-cutting capability → `wf-feature-inception`
- You have a monolithic document to break apart → `wf-decompose-spec`

## Prerequisites

- Access to `docs/_registry.md` (to search for existing artifacts)
- Familiarity with the knowledge graph structure, or willingness to follow the steps

## Steps

### Phase 1: Receive — Capture the Raw Input

Choose the input mode that matches your situation:

**A. Conversational Exploration**

When you're exploring an idea and don't have it written down yet:

1. Describe what you're thinking — don't worry about structure or completeness
2. The executor (human or AI) asks clarifying questions:
   - What problem does this solve? Who has this problem?
   - Is this about the application (what we're building), the dev platform (how we build), the repo platform (infrastructure), or multiple?
   - What already exists that's related to this?
   - What's the smallest version of this idea?
   - Is this a new concept or an evolution of something existing?
3. Continue the conversation until the idea has enough shape to work with — it doesn't need to be perfect, just clear enough to classify

**B. Note / Document Intake**

When you have existing material (notes, documents, transcripts, write-ups):

1. Gather all source material into one place
2. Read through it completely before doing anything
3. Note the scope — is this one concept or many? One domain or cross-cutting?
4. If the document is large and monolithic, consider whether `wf-decompose-spec` is more appropriate

**C. Existing System Formalization**

When you have a concept or system that exists in your head (or in scattered notes) that needs to be properly specified:

1. Write down the system as you understand it — describe what it does, why it exists, what problems it solves
2. List the key behaviors, rules, and boundaries
3. Note any dependencies on or relationships to existing features
4. This is effectively a mini-spec that Phase 2 will break into proper artifacts

**D. Quick Idea**

When you have a single, clear idea:

1. Write one sentence: what is this?
2. Write one sentence: why does it matter?
3. Proceed directly to Phase 2

### Phase 2: Distill — Extract Distinct Knowledge Nuggets

Read through your input from Phase 1 and extract each **distinct piece of knowledge**. A nugget is a single concept that could become one artifact or extend one existing artifact.

For each nugget, identify:

1. **Claim** — what is being said? (one sentence)
2. **Type signal** — what kind of thing is this? Best guess from:
   - **Job to be done** — a user need, motivation, or desired outcome
   - **Feature** — a capability the system should have
   - **Use case** — a concrete scenario where features are exercised together
   - **User story** — a specific user goal ("As a / I want / so")
   - **Architecture concern** — a technical design consideration
   - **Decision** — a choice that was made or needs to be made
   - **Open question** — something unresolved that needs exploration
   - **Glossary term** — a new canonical term or concept
   - **Observation** — a friction, idea, pattern, or raw signal
   - **UX pattern** — a design pattern or interaction model
3. **Confidence** — how sure are you about the type? (low / medium / high)
4. **Domain** — application product, dev platform, repo platform, or cross-cutting?

**If the input is a single nugget** → list one item, proceed to Phase 3.

**If the input is complex or mixed** → list all nuggets before proceeding. It is better to over-extract (split into too many nuggets) than to under-extract (lump things together). You can merge related nuggets in Phase 4.

**If a nugget's type is unclear** → mark confidence as "low" and proceed. Phase 3 will help clarify — seeing what already exists often reveals what the new thing actually is.

### Phase 3: Deduplicate — Search Before You Create

**This is the most critical phase.** The entire integrity guarantee depends on thorough deduplication. For EACH nugget from Phase 2:

#### Step 3a: Search the Registry

Scan `docs/_registry.md` — look at the relevant sections (Features, Use Cases, JTBDs, etc.) for anything with a similar title, scope, or purpose.

#### Step 3b: Search Existing Content

Read the index files for the relevant domain:
- Application product: `docs/product/_index.md`
- Dev platform: `docs/product/dev-platform/_index.md`
- Repo platform: `docs/product/repo-platform/_index.md`
- Architecture: `docs/architecture/_index.md`

If a potential match is found, **read the full document** to confirm whether it's actually the same concept or just a similar name.

#### Step 3c: Search the Glossary

Check `docs/vision/glossary.md`:
- Is this concept already defined under a different name?
- Does this overlap with an existing canonical term?
- Is the nugget using non-standard language for a concept that already has a canonical name?

#### Step 3d: Search JTBDs

Check `docs/vision/jtbd.md`, `docs/vision/jtbd-dev-platform.md`, `docs/vision/jtbd-repo-platform.md`:
- Is this need already captured as an existing job?
- Is this a sub-need of an existing JTBD?
- Does this suggest a new JTBD is needed?

#### Step 3e: Classify the Finding

| Finding | Action |
|---------|--------|
| **Exact match exists** | Update the existing artifact (Phase 4B) |
| **Partial overlap** | Extend the existing artifact or add cross-references (Phase 4B) |
| **Related but distinct** | Create new artifact with cross-references to the related one (Phase 4A) |
| **Truly new** | Create new artifact (Phase 4A) |
| **Contradicts existing** | Resolve the conflict before proceeding (Phase 4C) |

**Document your deduplication findings.** For each nugget, note: what you searched, what you found (or didn't find), and what action you're taking. This is the audit trail that prevents accidental duplication.

### Phase 4: Route — Determine the Right Action

#### 4A: Create New Artifact

Based on the nugget type, select the appropriate method:

| Type | Method | Notes |
|------|--------|-------|
| Job to be done | Direct edit | Add to `jtbd.md`, `jtbd-dev-platform.md`, or `jtbd-repo-platform.md`; assign next J/DJ/RJ number |
| Feature | `wf-add-feature` | For single features. Use `wf-feature-inception` if scope requires JTBD + feature + use cases + workflows |
| Use case | Template from `_conventions.md` | Create in the appropriate `use-cases/` directory |
| User story | Direct edit | Add to the appropriate `stories.md` file |
| Architecture | Template from `_conventions.md` | Create in `docs/architecture/` |
| Decision | `wf-record-decision` | For general decisions. Use `wf-make-decision` for architecture-specific decisions |
| Open question | Template from `_conventions.md` | Create in `docs/open-questions/` |
| Glossary term | Direct edit | Add to `docs/vision/glossary.md` using existing format |
| Observation | `wf-capture-observation` | Lowest barrier — use when the nugget isn't ready to be a formal artifact yet |
| UX pattern | Template from `_conventions.md` | Create in `docs/product/ux/`; consult ux-agent |
| Cross-cutting capability | `wf-feature-inception` | When the concept needs JTBD + feature + use cases + workflows + possibly an agent |

**When unsure between creating a formal artifact and an observation:** start with an observation. Observations are cheap, zero-barrier, and can be promoted to formal artifacts later through `wf-audit-observations`. A premature feature spec creates more entropy than a well-captured observation.

#### 4B: Update Existing Artifact

When deduplication found an existing artifact to extend:

1. **Read the existing document fully** — understand what's already there
2. **Identify what's genuinely new** — don't re-state what already exists
3. **Integrate the new information**:
   - Extend existing sections with new content
   - Add new sections only if the template calls for them and they were previously empty
   - Add new cross-references if the nugget reveals new relationships
   - Update the `updated` date in frontmatter
4. **Assess status impact** — does this update change the artifact's lifecycle status? (e.g., an `exploring` feature with enough detail to be `defining`)
5. **Preserve existing voice** — don't rewrite sections that don't need changing

#### 4C: Resolve Conflict

When new information contradicts what already exists:

1. **Do NOT silently overwrite** the existing artifact
2. **Assess the conflict**:
   - Is this a genuine contradiction or a misunderstanding?
   - Is the new information more current/accurate than the old?
   - Does the conflict affect other artifacts downstream?
3. **If minor and clearly an improvement** → update with a note explaining the change
4. **If significant or unclear** → create an open question (`oq-*`) documenting the conflict:
   - Reference both the existing artifact and the new information
   - Describe the tension
   - Route to the appropriate domain agent for resolution
5. **If urgent and blocking** → use `wf-record-decision` to decide and document the choice

### Phase 5: Wire — Cross-Reference Everything

After all nuggets are integrated:

1. **For every new document**:
   - Add `refs` to all related existing documents
   - Add reciprocal refs in those existing documents (bidirectionality rule)

2. **For every updated document**:
   - Check if the update reveals new relationships that weren't previously captured
   - Add refs where needed, maintain bidirectionality

3. **Verify traceability rules**:
   - Every feature references at least one JTBD
   - Every use case references the features it exercises
   - Every user story references the features it addresses
   - Architecture docs reference the features they enable
   - Open questions reference the artifacts they affect

### Phase 6: Update Indexes and Registry

For every document created or significantly updated:

1. **Registry** (`docs/_registry.md`) — add entries for new documents
2. **Product indexes** — update the appropriate index:
   - `docs/product/_index.md` (application product)
   - `docs/product/dev-platform/_index.md` (dev platform)
   - `docs/product/repo-platform/_index.md` (repo platform)
3. **Domain indexes** — update if relevant (`docs/architecture/_index.md`, `observations/_index.md`, etc.)
4. **Changelog** (`docs/_changelog.md`) — log every creation and significant update
5. **CLAUDE.md** — update only if structure changed (new directories, workflows, or agents added)

### Phase 7: Validate — Integrity Check

Before declaring the integration complete, verify:

- [ ] **No duplication** — every nugget either created something new or updated something existing; nothing was accidentally duplicated
- [ ] **Complete frontmatter** — every new document has full YAML frontmatter (id, type, title, status, owner, created, updated, refs)
- [ ] **Bidirectional refs** — if A references B, B references A
- [ ] **JTBD traceability** — every feature traces to at least one JTBD
- [ ] **Registry current** — every new document appears in the registry
- [ ] **Indexes updated** — product and domain indexes reflect all changes
- [ ] **Changelog logged** — every change has a changelog entry
- [ ] **No orphans** — every new document is reachable from its product/domain index in ≤3 hops
- [ ] **Glossary consistent** — new terms are in the glossary; existing terms are used correctly throughout
- [ ] **Status appropriate** — new artifacts start at the right lifecycle stage

## Validation Checklist

- [ ] All input from Phase 1 has been distilled — no knowledge was silently dropped
- [ ] Deduplication (Phase 3) was performed for every nugget with documented findings
- [ ] No artifacts were duplicated — every nugget maps to either create-new or update-existing
- [ ] Appropriate workflows were dispatched for each artifact type
- [ ] Cross-references are bidirectional and complete
- [ ] Registry and indexes are updated
- [ ] Changelog entries exist for all changes
- [ ] Phase 7 integrity check passes

## Executor Notes

This workflow can be executed by: `meta-agent`, `product-agent`, or any human.

**For conversational exploration (Phase 1A):** An AI agent is ideal — it can ask clarifying questions, search the existing graph during conversation, and help distill raw thinking. The conversation and the integration happen in one continuous flow.

**For bulk intake** (importing a large document or many notes at once):

1. Run Phase 1–2 on the entire input first (distill all nuggets)
2. Run Phase 3 on all nuggets as a batch (deduplication is more effective in batch — you can spot inter-nugget duplicates too)
3. Group nuggets by type and process each group through Phases 4–5
4. Run Phases 6–7 once at the end

**For extending existing artifacts** (the simplest path):

1. Phase 1D (quick idea) → Phase 2 (one nugget) → Phase 3 (find existing artifact) → Phase 4B (update it) → Phase 5–7 (wire, index, validate)

**The integration invariant:** Every time this workflow runs, the system must be strictly better — more knowledge, more connections, no more confusion. If integrating a nugget would degrade coherence (unclear where it goes, conflicts with existing, too vague to classify), capture it as an observation instead. An observation is always safe. A premature formal artifact is not.

## Why This Workflow Exists

The existing workflows handle specific artifact types effectively (`wf-add-feature`, `wf-refine-story`, `wf-record-decision`, `wf-capture-observation`, etc.), but there was no universal intake process for when knowledge arrives in unstructured or mixed form. Without this workflow:

- Ideas that span multiple artifact types had no clear entry point
- Notes and documents required the contributor to already know which workflow to use
- There was no explicit deduplication step — contributors could accidentally create features that overlapped with existing ones
- The gap between "I have a thought" and "it's in the graph" required too much context switching and system knowledge
- Conversational exploration had no defined path to structured integration

This is the front door. It handles any input, routes to the right place, and guarantees the system stays coherent.
