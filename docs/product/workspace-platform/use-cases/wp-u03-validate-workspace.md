---
id: "wp-u03"
type: use-case
title: "Validating Workspace Coherence"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp03]
  related: [wp-u04, rp-u05]
tags: [workspace-platform, use-case, validation]
---

# WP-U03 — Validating Workspace Coherence

## Scenario

A developer (or CI pipeline) needs to verify that the workspace is structurally sound — no orphan directories, no naming violations, no dependency direction breaches, no contract drift. They run `syntropy validate` and get a deterministic report.

### Steps

1. Developer runs `syntropy validate` (or CI runs it as a pipeline step)
2. The validation engine reads `syntropy.toml` and the filesystem
3. Checks are run in order:
   - Contract validity (schema compliance)
   - Directory structure (declared vs actual)
   - Naming conventions
   - Dependency direction (platform ↛ products)
   - Component completeness
   - Schema drift (generated schemas match source types)
4. Results are output as a structured `ValidationReport`
   - Human-readable format on terminal
   - JSON format with `--json` flag for CI/tooling
5. Exit code: 0 if valid, 1 if errors exist

### Outcome

- Clear, actionable report of all violations
- Each violation has: error code, severity, category, message, location, and fix hint
- CI can gate merges on validation passing
- Developers can fix issues before they accumulate
- Entropy is caught at the source, not discovered later

## Features Exercised

- WP01 — Workspace Contract (validated against schema)
- WP03 — Validation Engine (runs all checks)

## Acceptance Criteria

- [ ] `syntropy validate` exits 0 on a valid workspace
- [ ] `syntropy validate` exits 1 with clear error messages on violations
- [ ] `--json` flag outputs a machine-readable `ValidationReport`
- [ ] Each error includes an actionable fix hint
- [ ] Dependency direction violations are caught (platform importing products)
- [ ] Running after `syntropy init` or `syntropy add` always passes
- [ ] Validation is fast enough to run on every commit in CI
