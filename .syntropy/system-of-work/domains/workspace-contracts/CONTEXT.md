# Workspace Contracts Domain Context

## Always Load

- `docs/product/workspace-platform/_index.md`
- `docs/architecture/workspace-contracts.md`
- `docs/architecture/plan-apply-engine.md`
- `docs/architecture/north-star-layout.md`
- `docs/vision/jtbd-workspace-platform.md`
- `syntropy.toml`
- `platform/crates/syntropy-sdk/src/lib.rs`
- `products/command-center/apps/cli/src/main.rs`
- `docs/workflows/run-syntropy-cli.md`
- `docs/workflows/implement-syntropy-command.md`

## On Demand

- `docs/product/workspace-platform/features/wp*.md`
- `docs/product/workspace-platform/use-cases/wp-u*.md`
- `docs/decisions/adr-*.md`

## Reference

- `docs/product/workspace-platform/user-stories/stories-workspace-platform.md`
- `surfaces/workspace-platform.md`
- `docs/product/repo-platform/_index.md`

## Domain State

### Current Focus

- Repo-structure contract hardening (v0):
  - Folder contracts are compositional (inheritance for rules/kind/purpose)
  - README contracts are drift-gated in CI (`syntropy gen readmes --check`)
  - Blueprint coverage expanded to match actual repo top-level dirs + semantics
  - Legacy `.work/` support removed (targeted migration error + validation warning)
- Follow-up work continues on WP04 plan/apply and WP08 schema generation/drift gates

### Key Decisions in Effect

- Code-first schema strategy (Rust types → JSON Schema) for v0
- Strict parsing for `syntropy.toml` (unknown keys are errors)
- Five-category mental model (Platform, Products, Tooling, Workspaces, Instance)
- Plan/apply for all workspace mutations
- `.syntropy/` as workspace instance directory
- `.work/` is not supported (migration required)
- Dependency direction: platform never imports products
- Bootstrap blueprint: built-in `north-star/v0` map + per-path overrides in `syntropy.toml`
- README contracts are generated views (not canonical) and drift-gated

### Invariants

- Every workspace mutation goes through plan/apply
- Workspace contracts are schema-backed
- `syntropy.toml` is the single reviewed config file
- Dependency direction is enforced by validators
- Generated schemas must match source types (CI drift check)
- Generated README contracts must be drift-free (`syntropy gen readmes --check`)
- No empty future folders

### Open Threads

- Exact v0 schema for `syntropy.toml` (WP01 open question)
- Blueprint format specification (WP05 open question)
- Validation error code taxonomy (WP03 open question)
- Migration reversibility policy (WP06 open question)
- When to upgrade from code-first to schema-first (WP08 open question)
- When to enforce errors vs warnings for structural drift in non-north-star repos

### Cross-Domain Dependencies

- Architecture domain: runtime contract design, stack decisions
- Operational engineering domain: workflow design for workspace operations
- Repo platform: build system integration (Bazel targets for schema drift)
- System-of-work: agent system consumes workspace state

### Last Synced

2026-02-23
