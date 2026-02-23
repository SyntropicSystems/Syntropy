---
id: "wp03"
type: feature-spec
title: "Validation Engine"
status: building
owner: workspace-contracts-agent
priority: P0
created: 2026-02-21
updated: 2026-02-23
refs:
  architecture: [arch-workspace-contracts]
  decided-by: [dr-001, dr-002]
  depends-on: [wp01, wp02, wp08]
  enables: [wp-u03, wp-u04, wp04]
  informed-by: [jtbd-workspace-platform]
  open-questions: []
  related: [rp10, surf-workspace-platform, wp-stories, wp05, wp06, wp07]
tags: [workspace-platform, validation, coherence, p0]
---

# WP03 — Validation Engine

## Summary

The validation engine is `syntropy validate` — a deterministic checker that verifies workspace structural integrity, dependency direction, naming conventions, and contract compliance. It produces a machine-readable `ValidationReport` that can be consumed by CI, editors, agents, and humans.

## Bootstrap Implementation (v0)

The bootstrap slice implements a first-pass `syntropy validate` in `platform/crates/syntropy-sdk`:

- Lints the workspace root against the selected blueprint's **allowed top-level directories**
- Produces warning findings for unexpected directories (ignores common build outputs like `target/`)
- Outputs are deterministic and JSON is versioned via `schema_version: "v0"` (`syntropy --json validate`)

In addition, `syntropy check` is the canonical CI/local gate. It runs drift gates for generated artifacts (CLI reference, README contracts, agent adapters) and then runs workspace validation.

Dependency-direction checks and richer taxonomy/error codes are future work.

## Jobs Addressed

- WJ3 — Validate Workspace Coherence Continuously (primary)
- WJ9 — Enforce Architectural Invariants Automatically (secondary)

## How It Works

### What Gets Validated

The engine checks multiple layers of workspace coherence:

1. **Contract validity**: `syntropy.toml` matches the declared schema version
2. **Directory structure**: directories declared in the contract exist; no orphan directories
3. **Naming conventions**: files and directories follow declared naming rules
4. **Dependency direction**: platform never imports products, enforced by visibility rules
5. **Component completeness**: every declared service/app has required files (entry point, config, etc.)
6. **Schema drift**: generated schemas match their source types (if using code-first strategy)
7. **Checked-in hygiene**: no machine state in version control, no secrets in committed files

### Validation Report Contract

`syntropy validate --json` outputs a structured `ValidationReport`:

```json
{
  "schema_version": "v0",
  "timestamp": "2026-02-21T10:30:00Z",
  "valid": false,
  "errors": [
    {
      "code": "E001",
      "severity": "error",
      "category": "dependency-direction",
      "message": "platform/crates/syntropy-kernel imports from products/command-center",
      "location": { "file": "platform/crates/syntropy-kernel/src/lib.rs", "line": 12 },
      "fix_hint": "Move shared types to platform/crates/"
    }
  ],
  "warnings": [],
  "summary": { "errors": 1, "warnings": 0, "checked": 47 }
}
```

### Integration Points

- **CLI**: `syntropy validate` for on-demand checks
- **CI**: runs in pipeline, fails on errors
- **Editor**: LSP/extension shows violations inline
- **Plan/Apply**: validation runs before apply to prevent broken states
- **Agent**: agents query validation state before making changes

### Dependency Direction Enforcement

The sacred rule: **platform/ never imports products/**. The validation engine enforces this by:
- Analyzing import graphs across all declared components
- Checking visibility rules (e.g., Bazel visibility, Rust module boundaries)
- Producing clear error messages with fix hints

## Dependencies

- Requires: WP01 (Workspace Contract) — validates against the contract
- Requires: WP02 (Workspace Instance) — validates the instance structure
- Requires: WP08 (Contract Schema System) — uses schemas for contract validation
- Enables: WP04 (Plan/Apply Engine) — validation gates apply operations

## Open Questions

- [ ] Should validation be incremental (only check changed files) or always full-workspace?
- [ ] What's the error code taxonomy? Flat or hierarchical?
- [ ] Should there be a `--fix` mode that auto-corrects trivial violations?
- [ ] How does custom validation plug in (project-specific rules)?
