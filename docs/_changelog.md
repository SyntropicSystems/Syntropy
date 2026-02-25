---
id: "changelog"
type: reference
title: "Changelog"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2026-02-25
refs:
  related: [dp04]
---

# Changelog

Append-only log of all knowledge graph changes. Every document creation, update, extraction, or archival is recorded here.

| Date | Action | ID | Description | Author |
|------|--------|----|-------------|--------|
| 2025-02-07 | created | — | Initial knowledge graph scaffold: directory structure, CLAUDE.md, conventions, registry, changelog, base-traits | meta-agent |
| 2025-02-07 | extracted | manifesto | Extracted core philosophy from monolith spec §1 | meta-agent |
| 2025-02-07 | extracted | jtbd | Extracted Jobs to Be Done from monolith spec §2 | meta-agent |
| 2025-02-07 | extracted | glossary | Extracted glossary from monolith spec §10 | meta-agent |
| 2025-02-07 | created | principles | Synthesized design principles from philosophy | meta-agent |
| 2025-02-07 | extracted | f01–f12 | Extracted 12 feature specs from monolith spec §3 | meta-agent |
| 2025-02-07 | extracted | u01–u10 | Extracted 10 use cases from monolith spec §4 | meta-agent |
| 2025-02-07 | extracted | s01–s16 | Extracted 16 user stories from monolith spec §5 | meta-agent |
| 2025-02-07 | extracted | ux-* | Extracted 6 UX patterns from monolith spec §6 | meta-agent |
| 2025-02-07 | extracted | arch-* | Extracted 7 architecture docs from monolith spec §7 | meta-agent |
| 2025-02-07 | created | adr-001–003 | Created 3 initial ADRs from implicit decisions in spec | meta-agent |
| 2025-02-07 | extracted | oq-* | Extracted 5 open questions from monolith spec §9 | meta-agent |
| 2025-02-07 | created | agents | Created agent manifests: meta, product, architecture, ux, integration + 3 feature agents | meta-agent |
| 2025-02-07 | created | wf-* | Created 6 workflow documents | meta-agent |
| 2025-02-07 | created | surf-* | Created surface definitions | meta-agent |
| 2025-02-07 | moved | — | Moved 5 JSX prototypes to prototypes/ directory | meta-agent |
| 2025-02-07 | archived | — | Archived original monolith spec (taskcard-product-spec.md) | meta-agent |
| 2025-02-07 | updated | registry | Added 13 missing files to registry: index/meta files, ux-dependency-viz, prototypes | meta-agent |
| 2025-02-07 | updated | f01–f12 | Added bidirectional cross-refs: informed-by, ux-patterns, architecture, open-questions, decided-by | meta-agent |
| 2025-02-07 | updated | u03, u05 | Fixed missing depends-on/related back-references | meta-agent |
| 2025-02-07 | updated | jtbd, glossary | Added missing related back-references (stories, principles) | meta-agent |
| 2025-02-07 | updated | arch-* | Fixed bidirectional refs across architecture docs | meta-agent |
| 2025-02-07 | updated | ux-* | Fixed bidirectional refs across UX pattern docs | meta-agent |
| 2025-02-07 | updated | agents | Added meta-agent/product-agent bidirectional refs across all agent manifests | meta-agent |
| 2025-02-07 | updated | wf-*, adr-003 | Fixed remaining cross-reference gaps | meta-agent |
| 2025-02-09 | created | jtbd-dev-platform | Created dev platform Jobs to Be Done (DJ1–DJ6) — parallel to app JTBD | meta-agent |
| 2025-02-09 | created | dp01–dp08 | Created 8 dev platform feature specs: Knowledge Graph, Agent System, Workflow Engine, Registry & Changelog, Convention System, Surface Definitions, Prototype System, Entry Point Routing | meta-agent |
| 2025-02-09 | created | dp-u01–dp-u05 | Created 5 dev platform use cases: Add Feature, Onboarding, Architecture Decision, Explore Graph, Resolve Question | meta-agent |
| 2025-02-09 | created | dp-stories | Created 15 dev platform user stories (DP-S01–DP-S15) for developers, AI agents, and future tooling | meta-agent |
| 2025-02-09 | created | dp-product-index | Created dev platform product index with feature map, use cases, and stories | meta-agent |
| 2025-02-09 | updated | registry | Added dev platform vision, features, use cases, stories, and index to registry | meta-agent |
| 2025-02-09 | updated | surf-dev-platform | Added product documentation references to dev platform surface | meta-agent |
| 2025-02-09 | updated | product-index | Added dev platform section to main product index | meta-agent |
| 2025-02-09 | created | dp09 | Created DP09 Domain Context Sync feature spec — living domain state, drift detection, DRI review pattern | meta-agent |
| 2025-02-09 | created | wf-sync-domain-context | Created workflow for auditing and syncing domain agent context state | meta-agent |
| 2025-02-09 | created | wf-domain-review | Created workflow for domain DRI review before merge | meta-agent |
| 2025-02-09 | updated | jtbd-dev-platform | Added DJ7 — Preserve Domain Expertise and Enable Fast Context Recovery | meta-agent |
| 2025-02-09 | updated | base-traits | Added Domain State Protocol, sync workflows to inherited workflows, domain state hygiene rule | meta-agent |
| 2025-02-09 | updated | agents | Added Domain State sections to all 8 agent manifests (meta, product, architecture, ux, integration, f04, f11, f12) | meta-agent |
| 2025-02-09 | created | dp-u06 | Created use case: Syncing Domain Context After Changes | meta-agent |
| 2025-02-09 | created | dp-u07 | Created use case: Domain DRI Review Before Merge | meta-agent |
| 2025-02-09 | updated | dp-stories | Added 6 new user stories (DP-S16–DP-S21) for domain context sync — developer and AI agent stories | meta-agent |
| 2025-02-09 | updated | dp-product-index | Added DP09 to feature map, updated use case and job counts | meta-agent |
| 2025-02-09 | updated | registry | Added DP09, wf-sync-domain-context, wf-domain-review, dp-u06, dp-u07 to registry | meta-agent |
| 2025-02-09 | created | dp10 | Created DP10 Observation System feature spec — zero-barrier signal capture, audit, pattern detection, upleveling | meta-agent |
| 2025-02-09 | created | observations-agent | Created observations-agent manifest — DRI for observation capture, structuring, and pattern detection | meta-agent |
| 2025-02-09 | created | wf-capture-observation | Created workflow for capturing observations with zero barrier to entry | meta-agent |
| 2025-02-09 | created | wf-audit-observations | Created workflow for periodic observation audit, structuring, pattern detection, and promotion | meta-agent |
| 2025-02-09 | created | observations-index | Created observations directory with index and template | meta-agent |
| 2025-02-09 | created | dp-u08 | Created use case: Capturing an Observation in the Moment | meta-agent |
| 2025-02-09 | created | dp-u09 | Created use case: Auditing Observations for Patterns and Priorities | meta-agent |
| 2025-02-09 | updated | jtbd-dev-platform | Added DJ8 — Capture and Surface Emergent Signals from All Contributors | meta-agent |
| 2025-02-09 | updated | dp-stories | Added 6 new user stories (DP-S22–DP-S27) for observations — developer and AI agent stories | meta-agent |
| 2025-02-09 | updated | glossary | Added Observation and Upleveling terms | meta-agent |
| 2025-02-09 | updated | base-traits | Added upleveling rule (#9) and capture-observation to inherited workflows | meta-agent |
| 2025-02-09 | updated | meta-agent | Added observations-agent to routing table and domain state | meta-agent |
| 2025-02-09 | updated | registry | Added DP10, observations-agent, wf-capture-observation, wf-audit-observations, dp-u08, dp-u09, observations-index to registry | meta-agent |
| 2025-02-09 | created | wf-feature-inception | Created meta-workflow for full cross-cutting feature inception — scoping, creation order, cross-refs, validation | meta-agent |
| 2025-02-09 | created | dp11 | Created DP11 Reflection Loop feature spec — post-work personal reflection practice feeding observation system | meta-agent |
| 2025-02-09 | created | wf-reflect | Created workflow for post-work reflection — genuine personal experience capture | meta-agent |
| 2025-02-09 | created | dp-u10 | Created use case: Reflecting After Completing Work | meta-agent |
| 2025-02-09 | updated | jtbd-dev-platform | Added DJ9 — Enable Continuous Self-Improvement Through Honest Reflection | meta-agent |
| 2025-02-09 | updated | conventions | Added observation document type, observation status lifecycle, observation naming convention | meta-agent |
| 2025-02-09 | updated | glossary | Added Reflection term | meta-agent |
| 2025-02-09 | updated | dp-stories | Added 3 new user stories (DP-S28–DP-S30) for reflection loop and feature inception | meta-agent |
| 2025-02-09 | updated | base-traits | Added wf-reflect to inherited workflows | meta-agent |
| 2025-02-09 | updated | observations-agent | Added DP11, wf-reflect to context and workflows | meta-agent |
| 2025-02-09 | updated | registry | Added DP11, wf-feature-inception, wf-reflect, dp-u10 to registry | meta-agent |
| 2025-02-09 | created | dp12 | Created DP12 Pulse Companion feature spec — personalized work companion starting as reflection assistant, growing by emergence | meta-agent |
| 2025-02-09 | created | pulse-companion-agent | Created pulse-companion-agent manifest — DRI for assisted reflection, continuous pulse sensing, personalized companionship | meta-agent |
| 2025-02-09 | created | dp-u11 | Created use case: Assisted Reflection with Pulse Companion | meta-agent |
| 2025-02-09 | updated | jtbd-dev-platform | Added DJ10 — Support Each Contributor with a Personalized Work Companion | meta-agent |
| 2025-02-09 | updated | glossary | Added Pulse Companion term | meta-agent |
| 2025-02-09 | updated | dp-stories | Added 5 new user stories (DP-S31–DP-S35) for pulse companion — developer and AI agent stories | meta-agent |
| 2025-02-09 | updated | wf-reflect | Added assisted reflection mode with pulse companion integration | meta-agent |
| 2025-02-09 | updated | observations-agent | Added pulse-companion-agent to refs and domain state | meta-agent |
| 2025-02-09 | updated | meta-agent | Added pulse-companion-agent to routing table and domain state | meta-agent |
| 2025-02-09 | updated | registry | Added DP12, pulse-companion-agent, dp-u11 to registry; updated dp-stories count to DP-S01–DP-S35 | meta-agent |
| 2025-02-09 | updated | dp-product-index | Added DP12 to feature map, updated job and use case counts | meta-agent |
| 2025-02-09 | updated | product-index | Updated dev platform counts to 10 JTBD, 12 features, 11 use cases, 35 stories | meta-agent |
| 2025-02-09 | updated | CLAUDE.md | Added pulse-companion-agent to inheritance tree, updated JTBD count to DJ1–DJ10 | meta-agent |
| 2025-02-09 | created | dp13 | Created DP13 Decision Records feature spec — reasoning graph for all decisions, generalizing ADRs with hierarchy, domain scoping, Type 1/2 classification, success metrics, revisit triggers | meta-agent |
| 2025-02-09 | created | decisions-agent | Created decisions-agent manifest — DRI for decision records, reasoning graph integrity, conflict detection | meta-agent |
| 2025-02-09 | created | wf-record-decision | Created workflow for recording any decision — general-purpose complement to wf-make-decision | meta-agent |
| 2025-02-09 | created | dp-u12 | Created use case: Recording a Decision During Work | meta-agent |
| 2025-02-09 | created | dp-u13 | Created use case: Navigating the Decision Graph to Understand Why | meta-agent |
| 2025-02-09 | updated | jtbd-dev-platform | Added DJ11 — Build a Reasoning Graph That Makes Every Decision Reproducible and Traceable | meta-agent |
| 2025-02-09 | updated | glossary | Added Decision Record, Reasoning Graph, and Revisit Trigger terms | meta-agent |
| 2025-02-09 | updated | conventions | Added decision-record document type, dr-NNN naming convention, decision record template | meta-agent |
| 2025-02-09 | updated | decisions-index | Expanded from ADR-only to full decision log with DR section, updated owner to decisions-agent | meta-agent |
| 2025-02-09 | updated | meta-agent | Added decisions-agent to routing table and domain state | meta-agent |
| 2025-02-09 | updated | base-traits | Updated rule #5 to include decision records, added wf-record-decision to inherited workflows | meta-agent |
| 2025-02-09 | updated | dp-product-index | Added DP13 to feature map, updated job count to 11 and use case count to 13 | meta-agent |
| 2025-02-09 | updated | CLAUDE.md | Added decisions-agent to inheritance tree, record-decision to workflows, updated JTBD count to DJ1–DJ11 | meta-agent |
| 2025-02-09 | updated | registry | Added DP13, decisions-agent, wf-record-decision, dp-u12, dp-u13 to registry | meta-agent |
| 2025-02-09 | created | oq-monorepo-architecture | Created open question exploring monorepo architecture options: Flat Package, Domain DDD, Platform-Centric, Hybrid, Multi-Repo — with comparison matrix and current thinking | architecture-agent |
| 2025-02-09 | created | adr-004 | Accepted ADR-004: Hybrid Domain-Package Monorepo — domain packages (pure TS) + infrastructure packages + UI packages + thin app shells, with incremental phase 1 starting from domain-core | architecture-agent |
| 2025-02-09 | updated | oq-monorepo-architecture | Resolved → ADR-004 | architecture-agent |
| 2025-02-09 | updated | decisions-index | Added ADR-004 to decision log | architecture-agent |
| 2025-02-09 | updated | arch-index | Added ADR-004 to key decisions | architecture-agent |
| 2025-02-09 | updated | registry | Added ADR-004, updated oq-monorepo-architecture status to resolved | architecture-agent |
| 2025-02-09 | updated | adr-004 | Added concrete tooling: Nx 20.x, Pulumi 3.x (TypeScript), Node 24 LTS (nvm), pnpm 9.x; added infra/ to structure | architecture-agent |
| 2025-02-09 | updated | arch-stack | Added toolchain section: Node 24 LTS, pnpm, Nx, Pulumi; added Pulumi to stack | architecture-agent |
| 2025-02-09 | created | — | Scaffolded monorepo: root config (nx.json, pnpm-workspace.yaml, tsconfig.base.json, .nvmrc, .gitignore), Phase 1 packages (shared-types, domain-events, domain-core, firebase, design-tokens), app stubs (web, mobile, dev-web, functions), infra/ (Pulumi) | architecture-agent |
| 2025-02-09 | created | adr-005 | Accepted ADR-005: Dev Container and Build Container Strategy — multi-stage Dockerfile (base → build → devcontainer), devcontainer Features for dev tools, single source of truth for all environments | architecture-agent |
| 2025-02-09 | created | — | Added .devcontainer/Dockerfile (3-stage: base, build, devcontainer) and .devcontainer/devcontainer.json (VS Code, Cursor, Codespaces support) | architecture-agent |
| 2025-02-09 | created | jtbd-repo-platform | Created Repo Platform Jobs to Be Done (RJ1–RJ10) — engineering infrastructure jobs: reproducible environments, incremental builds, version consistency, declarative IaC, domain isolation, CI/CD, code quality, type safety, onboarding, scalable growth | architecture-agent |
| 2025-02-09 | created | rp01–rp10 | Created 10 Repo Platform feature specs: Runtime Version Management, Workspace & Package Management, Build Orchestration & Caching, TypeScript Project Configuration, Development Container, Build Container, Infrastructure as Code, Version Control & Conventions, CI/CD Pipeline, Code Quality Automation | architecture-agent |
| 2025-02-09 | created | rp-u01–rp-u07 | Created 7 Repo Platform use cases: Setup Local Dev, Add Package, Incremental Build, Deploy Infrastructure, CI/CD on PR, GitHub Codespaces, Upgrade Dependency | architecture-agent |
| 2025-02-09 | created | rp-stories | Created 19 Repo Platform user stories (RP-S01–RP-S19) for developers, CI/CD pipelines, platform engineers, and future tooling | architecture-agent |
| 2025-02-09 | created | rp-product-index | Created Repo Platform product index with feature map, use cases, and stories | architecture-agent |
| 2025-02-09 | created | surf-repo-platform | Created Repo Platform surface definition — engineering infrastructure layer, tool-agnostic specs pattern | architecture-agent |
| 2025-02-09 | updated | registry | Added Repo Platform vision, features, use cases, stories, surface, and index to registry | architecture-agent |
| 2025-02-09 | updated | surfaces-index | Added Repo Platform to development surfaces | architecture-agent |
| 2025-02-09 | updated | product-index | Added Repo Platform section, fixed Dev Platform counts to 11 JTBD, 13 features, 13 use cases | architecture-agent |
| 2025-02-09 | updated | CLAUDE.md | Added Repo Platform as Product section, updated repository structure | architecture-agent |
| 2025-02-09 | updated | arch-stack | Added Repo Platform cross-reference | architecture-agent |
| 2025-02-13 | created | dp14 | Created DP14 Cognitive Engineering feature spec — methodology for structuring information for comprehension: review templates, learning briefs, knowledge compression, progressive disclosure, cognitive adaptation | meta-agent |
| 2025-02-13 | created | cognitive-engineering-agent | Created cognitive-engineering-agent manifest — DRI for information architecture for human comprehension, review structures, learning methodologies, knowledge compression, cognitive adaptation | meta-agent |
| 2025-02-13 | created | dp-u14 | Created use case: Structuring a Code Review for Comprehension | meta-agent |
| 2025-02-13 | created | dp-u15 | Created use case: Creating a Learning Brief for Architecture Comprehension | meta-agent |
| 2025-02-13 | updated | jtbd-dev-platform | Added DJ12 — Ensure Every Piece of Communicated Knowledge Is Structured for Actual Comprehension | meta-agent |
| 2025-02-13 | updated | glossary | Added Cognitive Engineering and Progressive Disclosure terms | meta-agent |
| 2025-02-13 | updated | dp-stories | Added 7 new user stories (DP-S36–DP-S42) for cognitive engineering — developer, AI agent, and cross-agent stories | meta-agent |
| 2025-02-13 | updated | meta-agent | Added cognitive-engineering-agent to routing table and domain state | meta-agent |
| 2025-02-13 | updated | CLAUDE.md | Added cognitive-engineering-agent to inheritance tree, updated JTBD count to DJ1–DJ12 | meta-agent |
| 2025-02-13 | updated | pulse-companion-agent | Added cognitive-engineering-agent cross-reference and DP14 dependency | meta-agent |
| 2025-02-13 | updated | observations-agent | Added cognitive-engineering-agent cross-reference and DP14 dependency | meta-agent |
| 2025-02-13 | updated | registry | Added DP14, cognitive-engineering-agent, dp-u14, dp-u15 to registry; updated dp-stories count to DP-S01–DP-S42 | meta-agent |
| 2025-02-13 | updated | dp-product-index | Added DP14 to feature map, updated job count to 12, use case count to 15 | meta-agent |
| 2025-02-13 | updated | product-index | Updated dev platform counts to 12 JTBD, 14 features, 15 use cases, 42 stories | meta-agent |
| 2025-02-13 | created | dp15 | Created DP15 Operational Engineering feature spec — methodology for designing effective workflows, rules, skills, context, agent configs for different actor types | meta-agent |
| 2025-02-13 | created | operational-engineering-agent | Created operational-engineering-agent manifest — DRI for process design methodology, actor-effective workflows, rule design, context architecture | meta-agent |
| 2025-02-13 | created | dp-u16 | Created use case: Designing an Actor-Effective Workflow | meta-agent |
| 2025-02-13 | created | dp-u17 | Created use case: Auditing Process Effectiveness Across Actor Types | meta-agent |
| 2025-02-13 | updated | jtbd-dev-platform | Added DJ13 — Ensure Every Work Process Is Designed for the Actor Who Will Execute It | meta-agent |
| 2025-02-13 | updated | glossary | Added Actor (dev platform) and Operational Engineering terms | meta-agent |
| 2025-02-13 | updated | dp-stories | Added 7 new user stories (DP-S43–DP-S49) for operational engineering — developer and AI agent stories | meta-agent |
| 2025-02-13 | updated | meta-agent | Added operational-engineering-agent to routing table and domain state | meta-agent |
| 2025-02-13 | updated | CLAUDE.md | Added operational-engineering-agent to inheritance tree, updated JTBD count to DJ1–DJ13 | meta-agent |
| 2025-02-13 | updated | cognitive-engineering-agent | Added operational-engineering-agent as sibling cross-reference | meta-agent |
| 2025-02-13 | updated | observations-agent | Added operational-engineering-agent cross-reference and DP15 dependency | meta-agent |
| 2025-02-13 | updated | pulse-companion-agent | Added operational-engineering-agent cross-reference and DP15 dependency | meta-agent |
| 2025-02-13 | updated | registry | Added DP15, operational-engineering-agent, dp-u16, dp-u17 to registry; updated dp-stories count to DP-S01–DP-S49 | meta-agent |
| 2025-02-13 | updated | dp-product-index | Added DP15 to feature map, updated job count to 13, use case count to 17 | meta-agent |
| 2025-02-13 | updated | product-index | Updated dev platform counts to 13 JTBD, 15 features, 17 use cases, 49 stories | meta-agent |
| 2026-02-21 | created | jtbd-workspace-platform | Created Workspace Platform Jobs to Be Done (WJ1–WJ10) — workspace contracts, validation, scaffolding, plan/apply, migrations, state hydration, schema system | meta-agent |
| 2026-02-21 | created | wp01–wp08 | Created 8 Workspace Platform feature specs: Workspace Contract, Workspace Instance, Validation Engine, Plan/Apply Engine, Scaffolding & Generators, Migrations, Workspace State & Hydration, Contract Schema System | workspace-contracts-agent |
| 2026-02-21 | created | wp-u01–wp-u07 | Created 7 Workspace Platform use cases: Init Workspace, Add Service, Validate Workspace, Plan/Apply Change, Migrate Contract, Custom Generator, Agent Hydrate State | workspace-contracts-agent |
| 2026-02-21 | created | wp-stories | Created 24 Workspace Platform user stories (WP-S01–WP-S24) for developers, AI agents, platform engineers, team leads | workspace-contracts-agent |
| 2026-02-21 | created | wp-product-index | Created Workspace Platform product index with feature map, use cases, and stories | workspace-contracts-agent |
| 2026-02-21 | created | arch-workspace-contracts | Created Workspace Contract System architecture doc — contract boundaries, source of truth strategy, validation architecture, four v0 contracts | workspace-contracts-agent |
| 2026-02-21 | created | arch-plan-apply-engine | Created Plan/Apply Engine architecture doc — transactional mutation system, PatchSet structure, atomicity guarantees | workspace-contracts-agent |
| 2026-02-21 | created | arch-north-star-layout | Created North Star Repository Layout architecture doc — canonical structure, five-category mental model, dependency direction | workspace-contracts-agent |
| 2026-02-21 | created | workspace-contracts-agent | Created workspace-contracts-agent manifest — DRI for workspace contracts, validation, scaffolding, migrations, plan/apply | meta-agent |
| 2026-02-21 | created | surf-workspace-platform | Created Workspace Platform surface definition — contract and tooling layer | workspace-contracts-agent |
| 2026-02-21 | created | wf-design-workspace-contract | Created workflow for designing and extending workspace contracts | workspace-contracts-agent |
| 2026-02-21 | updated | glossary | Added 8 terms: Workspace Contract, Workspace Instance, Workspace State, PatchSet, Plan/Apply, Blueprint, Validation Report, North Star Layout | meta-agent |
| 2026-02-21 | updated | meta-agent | Added workspace-contracts-agent to routing table, refs, and domain state | meta-agent |
| 2026-02-21 | updated | arch-index | Added Workspace Platform Architecture section with 3 docs | meta-agent |
| 2026-02-21 | updated | product-index | Added Workspace Platform section with 10 JTBD, 8 features, 7 use cases, 24 stories | meta-agent |
| 2026-02-21 | updated | surfaces-index | Added Workspace Platform to development surfaces | meta-agent |
| 2026-02-21 | updated | CLAUDE.md | Added workspace-contracts-agent to inheritance tree, workspace platform section, workflow, repo structure | meta-agent |
| 2026-02-21 | updated | registry | Added all Workspace Platform entries: vision, 8 features, 7 use cases, stories, 3 architecture docs, agent, surface, workflow, product index | meta-agent |
| 2026-02-21 | created | — | Implemented Workspace Platform bootstrap slice: Rust `syntropy-sdk` + `syntropy` CLI, `syntropy.toml`, Bazel (bzlmod) scaffolding, generated folder README contracts | workspace-contracts-agent |
| 2026-02-21 | created | wf-run-syntropy-cli | Created workflow for running bootstrap `syntropy` commands (cargo/bazel, `--json` contract mode) | workspace-contracts-agent |
| 2026-02-21 | created | wf-implement-syntropy-command | Created workflow for adding/changing `syntropy` CLI commands via the SDK-first pattern | workspace-contracts-agent |
| 2026-02-21 | updated | registry | Added new Workspace Platform workflows to registry | workspace-contracts-agent |
| 2026-02-21 | updated | CLAUDE.md | Added Workspace Platform Implementation (Bootstrap) section with run commands | workspace-contracts-agent |
| 2026-02-21 | updated | arch-workspace-contracts | Documented the bootstrap implementation: SDK/CLI locations, commands, blueprint, v0 JSON contract approach | workspace-contracts-agent |
| 2026-02-21 | updated | wf-design-workspace-contract | Clarified WP08 schema generation is deferred; added bootstrap guidance for v0 `schema_version` outputs | workspace-contracts-agent |
| 2026-02-21 | updated | workspace-contracts-agent | Added code context + new workflows; updated domain state to reflect bootstrap implementation | workspace-contracts-agent |
| 2026-02-21 | updated | wp01 | Updated to `building` and documented bootstrap `syntropy.toml` schema + overrides | workspace-contracts-agent |
| 2026-02-21 | updated | wp03 | Updated to `building` and documented bootstrap `syntropy validate` behavior and JSON contract | workspace-contracts-agent |
| 2026-02-21 | updated | wp05 | Updated to `building` and documented bootstrap `init` + `gen readmes` behavior | workspace-contracts-agent |
| 2026-02-21 | updated | wp-u01 | Added bootstrap note for non-interactive `syntropy init` | workspace-contracts-agent |
| 2026-02-21 | updated | wp-u03 | Added bootstrap note for warning-oriented `syntropy validate` | workspace-contracts-agent |
| 2026-02-21 | created | AGENTS.md | Added root entrypoint for humans + coding AIs; unified navigation and system-of-work routing | meta-agent |
| 2026-02-21 | updated | CLAUDE.md | Converted to a shim that points to `AGENTS.md` (canonical entrypoint) | meta-agent |
| 2026-02-21 | moved | agents | Migrated canonical agent specs into `.syntropy/system-of-work/domains/**`; established “.syntropy = truth, .claude/.codex = generated adapters” model | meta-agent |
| 2026-02-21 | created | — | Implemented drift-gated tool adapter generation: `syntropy agents sync` + `syntropy agents check` (generates `.claude/**` + `.codex/**`) | workspace-contracts-agent |
| 2026-02-21 | updated | arch-north-star-layout | Documented generated tool adapters (`.claude/**`, `.codex/**`) and sync/check workflow | workspace-contracts-agent |
| 2026-02-21 | updated | dp08, dp-u04, wf-* | Standardized entrypoint references to `AGENTS.md` (with `CLAUDE.md` as shim) | meta-agent |
| 2026-02-23 | created | dr-001 | Recorded repo structure contract + folder contracts decision; removed legacy `.work/` support | workspace-contracts-agent |
| 2026-02-23 | updated | arch-north-star-layout | Expanded into the comprehensive repo-structure contract (authority, current repo map, folder contracts, change process) | workspace-contracts-agent |
| 2026-02-23 | updated | arch-workspace-contracts | Removed legacy `.work/` mention; linked DR-001 | workspace-contracts-agent |
| 2026-02-23 | updated | wf-run-syntropy-cli | Added README drift gate command; removed legacy `.work/` mention | workspace-contracts-agent |
| 2026-02-23 | updated | wp01 | Removed legacy `.work/` mention; linked DR-001 | workspace-contracts-agent |
| 2026-02-23 | updated | wp03 | Linked DR-001 (repo structure + folder contracts invariants) | workspace-contracts-agent |
| 2026-02-23 | updated | wp05 | Linked DR-001 (repo structure + folder contracts invariants) | workspace-contracts-agent |
| 2026-02-23 | updated | adr-004 | Added back-references to DR-001 and the repo structure contract | workspace-contracts-agent |
| 2026-02-23 | updated | decisions-index | Added DR-001 to the decision log | workspace-contracts-agent |
| 2026-02-23 | updated | registry | Registered DR-001 | workspace-contracts-agent |
| 2026-02-23 | created | — | Implemented folder contract inheritance, removed `.work` discovery, added `gen readmes --check` drift gate, and generated README contracts for `apps/*` + `packages/*` | workspace-contracts-agent |
| 2026-02-23 | created | — | Added root README and removed duplicate prototype JSX files from repo root (canonicalized `prototypes/`) | workspace-contracts-agent |
| 2026-02-23 | updated | workspace-contracts-agent | Updated domain state to reflect repo-structure hardening (inheritance, README drift gate, `.work` removal) | workspace-contracts-agent |
| 2026-02-23 | created | dr-002 | Recorded verb-first CLI command grammar decision | workspace-contracts-agent |
| 2026-02-23 | updated | decisions-index | Added DR-002 to the decision log | workspace-contracts-agent |
| 2026-02-23 | updated | registry | Registered DR-002 | workspace-contracts-agent |
| 2026-02-23 | updated | arch-workspace-contracts | Updated bootstrap command surface to verb-first grammar (`gen …`, `check`) | workspace-contracts-agent |
| 2026-02-23 | updated | arch-north-star-layout | Updated drift gate and adapter commands to verb-first grammar (`gen agents`, `check`) | workspace-contracts-agent |
| 2026-02-23 | updated | wf-run-syntropy-cli | Updated workflow examples to verb-first grammar; added `gen cli-docs` and `check` | workspace-contracts-agent |
| 2026-02-23 | updated | wf-implement-syntropy-command | Added verb-first grammar and CLI reference drift-gate guidance | workspace-contracts-agent |
| 2026-02-23 | updated | wf-create-agent | Updated adapter regen commands to `gen agents` | workspace-contracts-agent |
| 2026-02-23 | updated | dp02 | Updated adapter regen commands to `gen agents` | workspace-contracts-agent |
| 2026-02-23 | updated | wp03 | Documented `syntropy check` as canonical CI/local gate | workspace-contracts-agent |
| 2026-02-23 | updated | wp05 | Added `gen cli-docs`, `gen all`, and `--check` drift-gate pattern | workspace-contracts-agent |
| 2026-02-23 | updated | dr-001 | Linked DR-002 and updated migration to use `syntropy check` | workspace-contracts-agent |
| 2026-02-23 | created | — | Implemented verb-first CLI grammar: `gen agents`, `gen cli-docs`, `gen all`, and `check`; updated CI entrypoint; fixed validation determinism | workspace-contracts-agent |
| 2026-02-23 | updated | wf-run-syntropy-cli | Added `gen all` to the bootstrap CLI workflow | workspace-contracts-agent |
| 2026-02-23 | created | dr-003 | Recorded generated registry + docs sync + Rust-first check gate decision | meta-agent |
| 2026-02-23 | created | — | Implemented Dev Platform integrity tooling: strict docs graph checks, deterministic backref sync, generated registry drift gate, and `syntropy check` single Rust CI gate | meta-agent |
| 2026-02-24 | created | adr-006 | Recorded Rust-first repository foundation; deferred app/backend stack; keep Bazel but pin toolchains | architecture-agent |
| 2026-02-24 | updated | adr-001, adr-002, adr-004, adr-005 | Marked as superseded by ADR-006; added bidirectional references | architecture-agent |
| 2026-02-24 | updated | arch-index, arch-stack, arch-event-sourcing, arch-data-model, arch-offline, arch-security, arch-integrations, arch-ai-pipeline, arch-north-star-layout | Rewrote architecture docs to be backend/storage-agnostic and aligned to ADR-006 | architecture-agent |
| 2026-02-24 | updated | jtbd-repo-platform, rp01–rp10, rp-u01–rp-u07, rp-stories | Rewrote Repo Platform docs for Rust+Bazel foundation; marked infra/app orchestration as deferred where needed | architecture-agent |
| 2026-02-24 | updated | dp-u07, dp-u13 | Updated Dev Platform use cases to reflect superseded decisions and backend deferral | meta-agent |
| 2026-02-24 | updated | registry | Updated registry entries for ADR-006, superseded ADR statuses, and updated architecture/repo-platform titles | meta-agent |
| 2026-02-24 | removed | — | Removed Node/Nx/TypeScript/Pulumi scaffolding (apps/, packages/, infra/ and root config) and deleted archived root monolith spec file | workspace-contracts-agent |
| 2026-02-24 | updated | AGENTS.md, EXECUTION_CONTRACT | Updated adapter regeneration instructions to use `syntropy gen agents` (+ `--check`) | meta-agent |
| 2026-02-24 | updated | glossary | Removed Firestore/Cloud Functions assumptions from core definitions (event log + projections are storage-agnostic) | meta-agent |
| 2026-02-24 | created | dp16, experience-layer, arch-experience-layer | Documented Experience Layer: vision, feature spec, architecture, 11 module deep-dives (el-core-loops, el-apprenticeship, el-progression, el-companion, el-social, el-world-map, el-narrative, el-expression-crafting, el-anti-patterns, el-phasing, el-feature-derivation) | pulse-companion-agent |
| 2026-02-24 | created | dp17, personality-layer, arch-personality-layer | Documented Personality Layer: vision, feature spec, architecture, 9 module deep-dives (pl-personality-stack, pl-design-pillars, pl-role-archetypes, pl-voice-sheets, pl-procedural-engine, pl-memory-moments, pl-governance, pl-implementation, pl-feature-derivation) | pulse-companion-agent |
| 2026-02-24 | updated | glossary | Added 21 new terms: Experience Layer, Pattern Journal, Emergent Archetype, Collaboration Manual, Learning Residue, Fog of War, Loot, Guild, Core Loop, Discovery Engine, Companion Evolution, Personality Layer, Personality Stack, Role Archetype, Voice Sheet, Flavor Pool, Design Pillar, Pattern Breakage Budget, Novelty System, Moment | meta-agent |
| 2026-02-24 | updated | jtbd-dev-platform | Added DJ14 (Make the Experience of Building Things Together Intrinsically Satisfying); updated job count to 14; added dp16, dp17 to enables | meta-agent |
| 2026-02-24 | updated | dp-product-index | Added DP16 and DP17 to feature map with module deep-dive links | meta-agent |
| 2026-02-24 | updated | manifesto, principles, dp02, dp12, dp16 | Added bidirectional cross-references for experience-layer and personality-layer | meta-agent |
| 2026-02-24 | created | wf-update-document | New workflow: generic document update process (frontmatter, cross-refs, changelog) | meta-agent |
| 2026-02-24 | created | wf-maintain-glossary | New workflow: add/revise canonical glossary terms | meta-agent |
| 2026-02-24 | created | wf-add-knowledge-document | New workflow: add vision, architecture, or module documents | meta-agent |
| 2026-02-24 | created | wf-validate-knowledge-graph | New workflow: run integrity checks (cross-refs, conventions, indexes) | meta-agent |
| 2026-02-24 | created | wf-sync-generated-artifacts | New workflow: sync tool adapters, registry, READMEs after canonical changes | meta-agent |
| 2026-02-24 | created | wf-evolve-conventions | New workflow: propose and apply convention changes with impact assessment | meta-agent |
| 2026-02-24 | updated | conventions | Added module document type, layer module prefixes (el-*, pl-*), platform-scoped ID prefixes, and templates for vision/architecture/module documents | meta-agent |
| 2026-02-24 | updated | base-traits | Expanded inherited workflows: added update-document, maintain-glossary, validate-knowledge-graph, sync-generated-artifacts; organized into semantic categories | meta-agent |
| 2026-02-24 | updated | AGENTS.md | Fixed DJ count (13→14), reorganized workflow section into semantic categories (Building, Maintaining, Decisions, Agents, Observations, Workspace), added 6 new workflows | meta-agent |
| 2026-02-24 | updated | system CONTEXT.md | Domain state sync: documented new workflows, convention updates, base-traits expansion | meta-agent |
| 2026-02-24 | updated | product CONTEXT.md | Domain state sync: documented DP16/DP17, module deep-dives, 3 platforms, 14 JTBD | meta-agent |
| 2026-02-24 | updated | pulse-companion CONTEXT.md | Domain state sync: added Experience/Personality Layer awareness, updated on-demand/reference files, new open threads | meta-agent |
| 2026-02-24 | updated | wf-feature-inception, wf-add-feature, wf-sync-domain-context | Added cross-references to new maintenance workflows | meta-agent |
| 2026-02-24 | updated | dp01, dp05 | Added cross-references to new knowledge graph and convention workflows | meta-agent |
| 2026-02-25 | updated | wf-update-document, wf-create-agent, conventions, dr-003, wf-record-decision | Fixed 5 missing bidirectional cross-references for new workflows | meta-agent |
| 2026-02-25 | updated | conventions | Added 5 missing document templates: user-story, ux-pattern, observation, surface, agent-manifest | meta-agent |
| 2026-02-25 | updated | docs sync, registry, conventions, dp05, manifesto, jtbd-dev-platform, dr-003 | Cleared drift and normalized metadata: synced bidirectional refs, bumped stale `updated` frontmatter, standardized layer deep-dives to `type: module`, and grouped modules in the registry | meta-agent |
| 2026-02-25 | created | coherence-engine | Created Coherence Engine vision document — the root anxiety, five problems (capture gap, semantic drift, session recovery, tribal knowledge, force multiplication), three-mode architecture (passive monitoring, active integration, session management), implementation phasing | meta-agent |
| 2026-02-25 | updated | jtbd-dev-platform | Added DJ15–DJ21 (Coherence Axis): integrate insights automatically, detect semantic drift, provide session context recovery, make decisions traceable from principle to implementation, enable correct judgment transfer, maintain bird's eye view, ensure self-evolving system; updated job count from 14 to 21 | meta-agent |
| 2026-02-25 | created | dp18 | Created DP18 Coherence Engine feature spec — three-mode system (passive monitoring, active integration, session management), coherence scoring, five-phase implementation, relationship to DP01/DP04/DP09/DP10/DP11/DP13/DP16 | meta-agent |
| 2026-02-25 | created | dr-004 | Recorded DR-004: Coherence Engine three-mode architecture with phased implementation — chose unified three-mode system over separate tools or validate-only approach | meta-agent |
| 2026-02-25 | updated | glossary | Added 10 terms: Calibration Loop, Capture Gap, Coherence Engine, Coherence Score, Decision Density Threshold, First Principles Propagation, Philosophy Sync, Semantic Drift, Session Protocol | meta-agent |
| 2026-02-25 | updated | dp-product-index | Added DP18 to feature map (P0), updated job count to 21 | meta-agent |
| 2026-02-25 | updated | decisions-index | Added DR-004 to the decision log | meta-agent |
| 2026-02-25 | updated | manifesto, principles, experience-layer | Added bidirectional cross-references for coherence-engine | meta-agent |
| 2026-02-25 | updated | dp01, dp02, dp03, dp04, dp05, dp08, dp09, dp10, dp11, dp12, dp13, dp14, dp15, dp16 | Added bidirectional cross-references for dp18 (Coherence Engine) | meta-agent |
| 2026-02-25 | updated | product-index, AGENTS.md | Updated dev platform JTBD count (14→21) and feature count (17→18) | meta-agent |
