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
- 22 workflows codified in `docs/workflows/` (6 new knowledge graph maintenance workflows added 2026-02-24)
- Conventions expanded: `module` document type, layer module prefixes (`el-*`, `pl-*`), vision/architecture/module templates
- Base traits expanded: agents inherit knowledge graph maintenance workflows (update-document, maintain-glossary, validate-knowledge-graph, sync-generated-artifacts)
- Docs tooling updated: `docs sync` bumps `updated`, registry groups Dev Platform layer modules (2026-02-25)
- AGENTS.md workflow section reorganized into semantic categories

### Key Decisions in Effect

- ADR-003: Claude as primary LLM (active)
- ADR-006: Rust-first foundation (active)
- DR-002: CLI command grammar (verb-first)
- DR-003: Generated registry and doc sync

### Invariants

- Canonical agent specs are edited in `.syntropy/system-of-work/domains/**`
- Generated adapters are never hand-edited
- Routing is explicit and up-to-date (`.syntropy/system-of-work/ROUTER.md`)
- Every workflow is executable by both humans and AI agents
- All documents have complete YAML frontmatter
- Cross-references are bidirectional
- Convention changes go through `wf-evolve-conventions`

### Open Threads

- None currently (last drift check: 2026-02-25)

### Cross-Domain Dependencies

- All domains inherit base-traits changes
- Conventions affect all domains (loaded in every agent's always-load context)
- Generated artifacts depend on canonical domain specs

### Last Synced

2026-02-25
