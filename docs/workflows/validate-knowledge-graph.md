---
id: "wf-validate-knowledge-graph"
type: workflow
title: "Validate the Knowledge Graph"
status: active
owner: meta-agent
created: 2026-02-24
updated: 2026-02-24
refs:
  related: [wf-sync-domain-context, wf-update-document, wf-sync-generated-artifacts, conventions, dp01, dp05]
---

# Workflow: Validate the Knowledge Graph

## When to Use

- Before committing a batch of documentation changes
- After a feature inception or large documentation effort
- Periodically (e.g., weekly) to catch accumulated drift
- When something "feels off" — a reference doesn't resolve, an index seems stale, a convention seems violated
- As part of CI/CD gating

## Prerequisites

- The Syntropy CLI is buildable (`cargo build -p syntropy`)
- Access to the full repository

## Steps

### Step 1: Run Automated Validation

Run the full validation suite:

```bash
cargo run -p syntropy -- check
```

This runs:
- Workspace structure validation (does the repo match `syntropy.toml`?)
- Generated artifact drift check (are `.claude/**` and `.codex/**` in sync with canonical sources?)
- Registry drift check (does `docs/_registry.md` match actual documents?)

Fix any failures before proceeding. If generated artifacts are stale, use `wf-sync-generated-artifacts`.

### Step 2: Check Cross-Reference Integrity

Run cross-reference validation:

```bash
syntropy docs check
```

This checks:
- All referenced IDs resolve to existing documents
- Bidirectional references are complete (A → B implies B → A)
- Ref types are valid (no typos in `depends-on`, `enables`, etc.)

If missing backrefs are found, run `syntropy docs sync` to auto-add them.

### Step 3: Check Convention Compliance

Manually verify a sample of recently changed documents:

1. **Frontmatter completeness**: Does every document have `id`, `type`, `title`, `status`, `owner`, `created`, `updated`?
2. **ID stability**: Are IDs following the prefix conventions in `docs/_conventions.md`?
3. **Status validity**: Are status values valid for the document type?
4. **Date currency**: Are `updated` dates recent for recently changed files?

### Step 4: Check Index Currency

Verify that navigation indexes reflect the current state:

1. **Product indexes** (`docs/product/_index.md`, `docs/product/dev-platform/_index.md`, etc.):
   - Do feature counts match actual feature files?
   - Are all features listed with correct titles and statuses?
2. **Module indexes** (`_index.md` in module directories):
   - Do module lists match actual module files?
   - Are there orphaned modules (files not listed in index)?
3. **AGENTS.md**:
   - Does the workflow list match actual workflow files?
   - Does the JTBD count match actual jobs?
   - Does the repo structure section match reality?

### Step 5: Check Domain State Currency

For each domain that was touched by recent changes:

1. Read the domain's `CONTEXT.md`
2. Check `last-synced` date — if stale, run `wf-sync-domain-context`
3. Verify invariants still hold
4. Verify open threads are current

### Step 6: Document Findings

If issues were found:
- Fix what can be fixed immediately
- For larger issues, capture as observations (`wf-capture-observation`)
- For systemic issues, consider a convention evolution (`wf-evolve-conventions`)

## Validation Checklist

- [ ] `cargo run -p syntropy -- check` passes
- [ ] `syntropy docs check` passes (or `syntropy docs sync --check` is clean)
- [ ] Sampled documents have complete frontmatter
- [ ] Product indexes match actual feature files
- [ ] Module indexes match actual module files
- [ ] AGENTS.md is current
- [ ] Touched domain states are current
- [ ] No unresolved drift issues remain

## Executor Notes

This workflow can be executed by `meta-agent` or any human. For CI/CD, Steps 1-2 can be automated. Steps 3-5 require judgment and are best done by a human or experienced agent.

**Quick validation** (before a commit): Steps 1-2 only — takes < 1 minute.

**Full validation** (weekly or after major changes): All steps — takes 10-30 minutes depending on scope.

**Automated validation** (CI/CD): Step 1 is already gated in `.github/workflows/syntropy-validate.yml`. Step 2 can be added as an additional CI check.
