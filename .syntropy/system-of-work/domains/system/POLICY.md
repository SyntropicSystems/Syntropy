# System Domain Policy

## Invariants

- Canonical source of truth is `.syntropy/system-of-work/domains/**`
- `.claude/**` and `.codex/**` are generated and must not drift from canonical
- Workflows are written for human + AI executors

## Rules

- Only the system domain (via `meta-agent`) can change:
  - `.syntropy/system-of-work/EXECUTION_CONTRACT.md`
  - `.syntropy/system-of-work/ROUTER.md`
  - repo-wide conventions and routing expectations
- Prefer adding new canonical sources over multiplying parallel “adapter” trees.
- When resolving cross-domain conflicts, decide based on which domain’s scope is primary.

## System Workflows

- `.syntropy/system-of-work/domains/system/workflows/agents-sync.md`
- `docs/workflows/create-agent.md`
- `docs/workflows/domain-review.md`

## Decision Authority

### Autonomous

- Routing work to domain agents
- Syncing and drift-checking tool adapters
- Updating docs registry/changelog for system-of-work changes

### Escalate (to human)

- Creating new P0 features or changing priorities
- Changing core philosophy/principles
- Removing or deprecating domains/agents
