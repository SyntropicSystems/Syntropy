# Execution Contract (Repo Collaboration)

This is the contract for how humans and coding AIs collaborate in this repo.

## Source of Truth

- Canonical domain specs live under `.syntropy/system-of-work/domains/**`
- **Only** canonical files are hand-edited

## Generated Tool Adapters (Checked In)

These directories are generated output and should not be edited by hand:

- `.claude/**`
- `.codex/**`

Regenerate them after any canonical change:

- `cargo run -p syntropy -- gen agents`

CI should enforce no drift:

- `cargo run -p syntropy -- gen agents --check`

## Local-Only Configuration

Local, machine-specific configuration must remain untracked:

- `.claude/settings.local.json`
- any `*.local.*` variants we introduce in the future

## Editing Rules

1. Prefer **one** canonical place to edit (a file in `.syntropy/system-of-work/domains/**` or `docs/**`).
2. Never maintain parallel copies of agent prompts across tools.
3. Keep canonical `AGENT.md` files thin; move living domain state into `CONTEXT.md`.
4. Workflows are executable “how-to” docs: write them so a human can follow them unassisted.

## Change Flow (Agents / Workflows)

1. Edit canonical files under `.syntropy/system-of-work/domains/**`
2. Run `cargo run -p syntropy -- gen agents`
3. Validate:
   - `cargo run -p syntropy -- gen agents --check`
   - `cargo run -p syntropy -- validate`
4. Update knowledge graph if needed (`docs/_registry.md`, `docs/_changelog.md`)
