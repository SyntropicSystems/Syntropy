# System Domain Context

This domain owns the repo’s **System of Work** integrity: routing, conventions, and drift prevention.

## Always Load

- `.syntropy/system-of-work/EXECUTION_CONTRACT.md`
- `.syntropy/system-of-work/ROUTER.md`
- `.syntropy/system-of-work/domains/system/AGENT.md`
- `.syntropy/system-of-work/domains/system/_base-traits.md`
- `docs/_conventions.md`
- `docs/_registry.md`
- `docs/_changelog.md`

## On Demand

- Any document relevant to the current task
- Domain agent specs under `.syntropy/system-of-work/domains/**/AGENT.md` (when routing or coordinating)

## Domain State

### Current Focus

- System-of-work canonical sources live under `.syntropy/system-of-work/domains/**`
- Tool adapters are generated into `.claude/**` and `.codex/**` and drift-gated
- Workspace Platform bootstrap slice exists (`syntropy-sdk` + `syntropy` CLI)

### Invariants

- Canonical agent specs are edited in `.syntropy/system-of-work/domains/**`
- Generated adapters are never hand-edited
- Routing is explicit and up-to-date (`.syntropy/system-of-work/ROUTER.md`)

### Last Synced

2026-02-21
