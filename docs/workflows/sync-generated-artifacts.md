---
id: "wf-sync-generated-artifacts"
type: workflow
title: "Sync Generated Artifacts"
status: active
owner: meta-agent
created: 2026-02-24
updated: 2026-02-25
refs:
  related: [base-traits, conventions, dr-003, wf-create-agent, wf-feature-inception, wf-validate-knowledge-graph]
---

# Workflow: Sync Generated Artifacts

## When to Use

- After editing any file under `.syntropy/system-of-work/domains/**` (agent manifests, contexts, policies)
- After creating a new agent (`wf-create-agent`)
- After adding, removing, or renaming documents in the knowledge graph
- Before committing changes that touch canonical sources
- When `cargo run -p syntropy -- check` reports drift

## Prerequisites

- The Syntropy CLI is buildable (`cargo build -p syntropy`)
- Canonical sources (`.syntropy/system-of-work/domains/**`, `docs/**`) are in the desired state

## Steps

### Step 1: Identify What Needs Syncing

| If you changed... | Sync command |
|-------------------|-------------|
| Agent manifests, contexts, or policies | `cargo run -p syntropy -- gen agents` |
| Any document in `docs/` (added, removed, renamed) | `cargo run -p syntropy -- gen registry` |
| Directory structure or workspace contract | `cargo run -p syntropy -- gen readmes` |
| Cross-references in any document | `syntropy docs sync` |
| Multiple of the above | Run all applicable commands |

### Step 2: Run the Sync Commands

Run the applicable commands:

```bash
# Regenerate tool adapters (Claude Code + Codex)
cargo run -p syntropy -- gen agents

# Regenerate document registry
cargo run -p syntropy -- gen registry

# Regenerate directory READMEs
cargo run -p syntropy -- gen readmes

# Auto-add missing bidirectional cross-references
syntropy docs sync
```

### Step 3: Verify No Remaining Drift

Run the drift checks:

```bash
# Check everything at once
cargo run -p syntropy -- check

# Or check individually:
cargo run -p syntropy -- gen agents --check
cargo run -p syntropy -- gen registry --check
```

All checks should pass. If they don't, repeat Step 2 for the failing component.

### Step 4: Review Generated Changes

Before committing, review what changed in the generated files:

```bash
git diff .claude/ .codex/ docs/_registry.md
```

Verify:
- New agents appear if you created new domain/feature agents
- Removed agents disappear if you archived a domain
- Registry entries match your document changes
- No unexpected changes (generated files should be deterministic)

### Step 5: Stage and Commit Together

Generated artifacts should be committed **in the same commit** as their canonical source changes. This ensures the repo is never in a state where canonical and generated are out of sync.

```bash
git add .syntropy/system-of-work/domains/... docs/... .claude/ .codex/ docs/_registry.md
git commit -m "description of canonical changes"
```

## Validation Checklist

- [ ] All applicable sync commands have been run
- [ ] `cargo run -p syntropy -- check` passes
- [ ] Generated changes are reviewed and make sense
- [ ] Generated files are staged with their canonical sources

## Executor Notes

This workflow can be executed by any agent or human. It is a mechanical process — no judgment required, just running the right commands in the right order.

**Common mistake**: Editing canonical sources and forgetting to regenerate. CI will catch this via `cargo run -p syntropy -- check`, but it's better to sync before pushing.

**Common mistake**: Hand-editing generated files (`.claude/**`, `.codex/**`, `docs/_registry.md`). These are overwritten by the sync commands. Always edit the canonical source instead.

**Automation note**: This workflow is partially automated in CI (`.github/workflows/syntropy-validate.yml` runs the check step). The generation step is manual because it produces file changes that need to be committed.
