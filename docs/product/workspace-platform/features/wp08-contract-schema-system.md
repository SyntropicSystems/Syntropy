---
id: "wp08"
type: feature-spec
title: "Contract Schema System"
status: exploring
owner: workspace-contracts-agent
priority: P0
created: 2026-02-21
updated: 2026-02-21
refs:
  architecture: [arch-workspace-contracts]
  depends-on: []
  enables: [wp-u05, wp01, wp03, wp06, wp07]
  informed-by: [jtbd-workspace-platform]
  open-questions: []
  related: [rp08, surf-workspace-platform, wf-design-workspace-contract, wp-stories]
tags: [workspace-platform, schema, contracts, versioning, p0]
---

# WP08 — Contract Schema System

## Summary

The contract schema system provides versioned, machine-checkable schema definitions for all workspace boundaries — the config contract (`syntropy.toml`), workspace state, validation reports, and patchsets. Schemas are the enforcement mechanism that prevents contracts from drifting and keeps the platform's boundaries stable.

## Jobs Addressed

- WJ10 — Keep Contracts Versioned, Machine-Checkable, and Cross-Language (primary)
- WJ3 — Validate Workspace Coherence Continuously (secondary)

## How It Works

### The Two Contract Boundaries

Syntropy introduces two kinds of contracts, both equally important:

**Runtime contracts** (Boundary A): APIs between services
- Frontend ↔ API
- Daemon ↔ ingest service
- Worker ↔ analysis service
- Format: protobuf, OpenAPI, JSON Schema

**Workspace contracts** (Boundary B): APIs between Syntropy and a repo
- CLI ↔ repo filesystem + conventions
- Agent ↔ workspace state
- Plan/apply patchsets
- Format: JSON Schema (derived from Rust types)

### Contract Directory Structure

```
platform/
  contracts/
    runtime/                    # APIs your products expose
      proto/...
      openapi/...
      json-schema/...
    workspace/                  # APIs between Syntropy and a repo
      v0/
        syntropy-config.schema.json      # syntropy.toml shape + types
        workspace-state.schema.json      # output of syntropy state --json
        validation-report.schema.json    # output of syntropy validate --json
        patchset.schema.json             # plan/apply transactional patch format
```

### Source of Truth Strategy

**Strategy 2 (code-first, recommended for v0):**

Rust types are the source of truth. Schemas are emitted as artifacts.

1. Define Rust structs/enums with `serde` as canonical types
2. Generate JSON Schema from Rust using `schemars` into `platform/contracts/workspace/v0/*.schema.json`
3. CI enforces drift: schema snapshots must match code
4. If schemas drift from code, CI fails

This approach is chosen because:
- Moves fast with one mental model (Rust types)
- Schemas are always accurate (generated, not hand-maintained)
- Upgrade to contract-first later if/when third-party implementers need to consume schemas

### The Minimal v0 Contracts

The four workspace contracts that matter from day one:

1. **`syntropy-config.schema.json`** — config contract (`syntropy.toml` shape)
2. **`workspace-state.schema.json`** — agent hydration contract
3. **`validation-report.schema.json`** — deterministic errors contract
4. **`patchset.schema.json`** — transaction contract (plan → apply)

Everything else can emerge.

### Drift Gates

Bazel (or equivalent) targets enforce schema-code alignment:
- `bazel test //platform/contracts/workspace:schema_drift` — fails if generated schemas don't match checked-in snapshots
- Run as part of CI pipeline
- Developers regenerate schemas with `bazel run //platform/contracts/workspace:generate_schemas`

## Dependencies

- Enables: WP01 (Workspace Contract), WP03 (Validation Engine), WP06 (Migrations), WP07 (Workspace State)

## Open Questions

- [ ] When to upgrade from Strategy 2 (code-first) to Strategy 1 (schema-first)?
- [ ] Should schemas be published as an npm/crates.io package for consumers?
- [ ] How to handle schema versioning — directory-per-version or embedded version field?
- [ ] Should there be a `syntropy schema check` command for local drift detection?
