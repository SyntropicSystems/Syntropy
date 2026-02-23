---
id: "wf-implement-syntropy-command"
type: workflow
title: "Implement a Syntropy CLI Command"
status: active
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-23
refs:
  related: [workspace-contracts-agent]
  decided-by: [dr-002]
tags: [workflow, workspace-platform, implementation, cli]
---

# Workflow: Implement a Syntropy CLI Command

## When to Use

When adding or changing a `syntropy` command (CLI surface), especially when it has a JSON output contract consumed by agents or tooling.

## Principles

- **One engine, many skins**: implement logic in `syntropy-sdk`; keep the CLI as IO glue.
- **Structured outputs**: JSON keys should be stable, typed, and versioned.
- **Deterministic behavior**: ordering should be stable; avoid timestamps unless explicitly requested.
- **Verb-first grammar**: prefer `syntropy <verb> <target>` (e.g., `syntropy gen agents`), not domain-first trees.
- **Single source of truth for invocation**: clap help output is authoritative; the checked-in CLI reference is a generated projection.

## Steps

### Step 1: Define the SDK API

1. Add/extend a typed function in `platform/crates/syntropy-sdk`
2. Return structured data types (no printing)
3. Include a `schema_version` field in JSON-serialized outputs

### Step 2: Wire the CLI

1. Add a clap subcommand in `products/command-center/apps/cli/src/main.rs`
2. Resolve paths in the CLI (absolute paths) before calling into the SDK
3. Implement:
   - human output (readable)
   - JSON output (`--json`, machine contract)

### Step 3: Validate the Contract

1. Run `cargo check` and `cargo test`
2. Manually sanity-check:
   - `cargo run -p syntropy -- <command>`
   - `cargo run -p syntropy -- --json <command>`
3. Refresh CLI reference docs:
   - `cargo run -p syntropy -- gen cli-docs`
   - Drift gate: `cargo run -p syntropy -- gen cli-docs --check`
4. Run the full drift/validation gate:
   - `cargo run -p syntropy -- check`

### Step 4: Update Knowledge Graph (Docs)

1. Update relevant Workspace Platform docs (WP01/WP03/WP05/etc.)
2. Add or update workflows if the execution steps changed
3. Append entries to `docs/_changelog.md`
4. Update `docs/_registry.md` if new documents were created

## Done Checklist

- [ ] SDK change is typed + deterministic
- [ ] CLI is thin and has `--json` support
- [ ] JSON payload includes `schema_version: "v0"`
- [ ] clap help text is accurate and discoverable
- [ ] `syntropy gen cli-docs --check` is clean
- [ ] `syntropy check` is clean
- [ ] Docs + changelog updated
