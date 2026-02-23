---
id: "wf-run-syntropy-cli"
type: workflow
title: "Run the Syntropy CLI (Bootstrap Slice)"
status: active
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-23
refs:
  related: [workspace-contracts-agent]
  decided-by: [dr-002]
tags: [workflow, workspace-platform, cli, bootstrap]
---

# Workflow: Run the Syntropy CLI (Bootstrap Slice)

## When to Use

When you want to:
- Initialize a workspace contract (`syntropy init`)
- Inspect structure (`syntropy tree`, `syntropy info`)
- Generate folder README contracts (`syntropy gen readmes`)
- Check README drift (`syntropy gen readmes --check`)
- Sync tool agent adapters (`syntropy gen agents`)
- Check adapter drift (`syntropy gen agents --check`)
- Generate drift-gated CLI reference docs (`syntropy gen cli-docs`)
- Run all generators (`syntropy gen all`)
- Lint workspace structure against a blueprint (`syntropy validate`)
- Run all drift gates + validation (`syntropy check`)

## Prerequisites

- Rust toolchain available (`cargo`)
- A workspace contract exists: `syntropy.toml` (repo root) or `.syntropy/syntropy.toml`

## Quickstart (Cargo)

From the repo root:

1. Inspect the root contract:
   - `cargo run -p syntropy -- info .`
2. Render a tree (depth-limited):
   - `cargo run -p syntropy -- tree . --depth 3`
3. Describe a path (human):
   - `cargo run -p syntropy -- info platform/crates/syntropy-sdk`
4. Describe a path (JSON contract):
   - `cargo run -p syntropy -- --json info platform/crates/syntropy-sdk`
5. Preview README generation:
   - `cargo run -p syntropy -- gen readmes --dry-run`
6. Apply README generation:
   - `cargo run -p syntropy -- gen readmes`
7. Drift gate (fail if README generation would change anything):
   - `cargo run -p syntropy -- gen readmes --check`
8. Validate the workspace:
   - `cargo run -p syntropy -- validate`
   - `cargo run -p syntropy -- --json validate`
9. Sync tool adapters (Claude/Codex):
   - `cargo run -p syntropy -- gen agents`
10. Check adapter drift:
   - `cargo run -p syntropy -- gen agents --check`
11. Generate CLI reference docs:
   - `cargo run -p syntropy -- gen cli-docs`
12. Run all generators:
   - `cargo run -p syntropy -- gen all`
   - Drift gate: `cargo run -p syntropy -- gen all --check`
13. Run all drift gates + validation:
   - `cargo run -p syntropy -- check`
   - `cargo run -p syntropy -- --json check`

## Optional (Bazel)

If Bazel is available:

- `bazel run //products/command-center/apps/cli:syntropy -- tree . --depth 3`
- `bazel run //products/command-center/apps/cli:syntropy -- --json info .`
- `bazel run //products/command-center/apps/cli:syntropy -- validate`
- `bazel run //products/command-center/apps/cli:syntropy -- check`

## Output Contract Notes

- JSON mode is enabled with `--json`
- All JSON payloads include `schema_version: "v0"`
- Prefer structured fields (arrays/objects) over free-form strings when extending outputs
