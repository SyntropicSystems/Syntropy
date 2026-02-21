# Workspace Contracts Domain Policy

## Invariants

- `syntropy` CLI is an IO layer; business logic lives in `syntropy-sdk`.
- Outputs must be deterministic; JSON keys must be stable and versioned.

## Rules

1. Every workspace mutation must go through plan/apply — no direct writes by the platform.
2. Workspace contracts are schema-backed and machine-checkable — not documentation-backed conventions.
3. The workspace contract (`syntropy.toml`) is strict: unknown keys error, missing required fields error.
4. Dependency direction is sacred: `platform/` never imports `products/`.
5. Don't create empty future folders — only scaffold what's real.
6. Checked-in vs ignored is explicit — no ambiguity about what goes into version control.
7. Rust types are source of truth for v0 schemas — generate JSON Schema, CI enforces drift.

## Workflows

- `docs/workflows/design-workspace-contract.md`
- `docs/workflows/run-syntropy-cli.md`
- `docs/workflows/implement-syntropy-command.md`
- `docs/workflows/make-architecture-decision.md` (inherited)
- `docs/workflows/add-feature-spec.md` (inherited)

## Decision Authority

### Autonomous

- Workspace contract schema design (field names, types, structure)
- Validation rule additions and modifications
- Blueprint/template design and updates
- Scaffolding command behavior
- PatchSet format and operations
- Migration path design between schema versions
- Contract directory organization

### Escalate

- Changing the five-category mental model → `.syntropy/system-of-work/domains/system/AGENT.md` / human
- Breaking changes to workspace contracts (v0 → v1) → `.syntropy/system-of-work/domains/system/AGENT.md` / human
- Adding new product categories to the north star layout → `.syntropy/system-of-work/domains/system/AGENT.md` / human
- Changes affecting dependency direction rules → `.syntropy/system-of-work/domains/architecture/AGENT.md`
- Cross-cutting changes affecting how agents consume workspace state → `.syntropy/system-of-work/domains/system/AGENT.md`
