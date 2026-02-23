---
id: "registry"
type: reference
title: "Document Registry"
status: active
mode: generated
owner: meta-agent
created: 2025-02-07
updated: 2026-02-23
refs:
  decided-by: [dr-003]
  related: [dp04]
---

<!-- syntropy:generated -->
<!-- GENERATED — DO NOT EDIT. -->
<!-- Run: cargo run -p syntropy -- gen registry -->
# Document Registry

Master index of all documents in the Syntropy OS knowledge graph. Every document's stable ID maps to its file path, current status, and owning agent.

## Vision

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| glossary | Glossary | active | meta-agent | `docs/vision/glossary.md` |
| jtbd | Jobs to Be Done | active | product-agent | `docs/vision/jtbd.md` |
| manifesto | Core Philosophy | active | meta-agent | `docs/vision/manifesto.md` |
| principles | Design Principles | active | meta-agent | `docs/vision/principles.md` |

## Features

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| f01 | Task Card System | defining | product-agent | `docs/product/features/f01-task-card-system.md` |
| f02 | Recursive Task Hierarchy | defining | product-agent | `docs/product/features/f02-recursive-hierarchy.md` |
| f03 | Gmail / Google Workspace Integration | defining | integration-agent | `docs/product/features/f03-gmail-integration.md` |
| f04 | AI Action Engine | exploring | product-agent | `docs/product/features/f04-ai-action-engine.md` |
| f05 | Quick Capture | defining | product-agent | `docs/product/features/f05-quick-capture.md` |
| f06 | Event Sourcing & Audit Trail | defining | architecture-agent | `docs/product/features/f06-event-sourcing.md` |
| f07 | Self-Learning System | exploring | product-agent | `docs/product/features/f07-self-learning.md` |
| f08 | Cross-Platform (React Native + Web) | defining | architecture-agent | `docs/product/features/f08-cross-platform.md` |
| f09 | Follow-Up Task Creation & Dependency Resolution | defining | product-agent | `docs/product/features/f09-follow-up-tasks.md` |
| f10 | Confidence Thresholds & Trust Controls | defining | product-agent | `docs/product/features/f10-confidence-thresholds.md` |
| f11 | Domains / Spaces (Persistent Living Contexts) | defining | product-agent | `docs/product/features/f11-domains-spaces.md` |
| f12 | Artifact Intelligence (Upload -> Extract -> Link) | defining | product-agent | `docs/product/features/f12-artifact-intelligence.md` |

## Use Cases

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| u01 | Email Triage (Daily Driver) | defining | product-agent | `docs/product/use-cases/u01-email-triage.md` |
| u02 | Voice Capture on the Go | defining | product-agent | `docs/product/use-cases/u02-voice-capture.md` |
| u03 | AI Auto-Managing Inbox | defining | product-agent | `docs/product/use-cases/u03-ai-auto-inbox.md` |
| u04 | Project Overview & Epic Drill-Down | defining | product-agent | `docs/product/use-cases/u04-project-overview.md` |
| u05 | End-of-Day Review | defining | product-agent | `docs/product/use-cases/u05-end-of-day-review.md` |
| u06 | Space as Living Reference | defining | product-agent | `docs/product/use-cases/u06-space-living-reference.md` |
| u07 | AI Auto-Filing into Spaces | defining | product-agent | `docs/product/use-cases/u07-ai-auto-filing.md` |
| u08 | Onboarding & Trust Building | defining | product-agent | `docs/product/use-cases/u08-onboarding-trust.md` |
| u09 | Photo to Structured Knowledge | defining | product-agent | `docs/product/use-cases/u09-photo-to-knowledge.md` |
| u10 | Voice Memo to Multi-Action | defining | product-agent | `docs/product/use-cases/u10-voice-memo-multi-action.md` |

## User Stories

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| stories | User Stories | defining | product-agent | `docs/product/user-stories/stories.md` |

## UX Patterns

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| ux-ai-suggestion | AI Suggestion Display | defining | ux-agent | `docs/product/ux/ai-suggestion-display.md` |
| ux-artifact-flow | Artifact Intelligence Flow | defining | ux-agent | `docs/product/ux/artifact-intelligence-flow.md` |
| ux-card-queue | Card Queue Layout | defining | ux-agent | `docs/product/ux/card-queue-layout.md` |
| ux-dependency-viz | Dependency Visualization | defining | ux-agent | `docs/product/ux/dependency-visualization.md` |
| ux-epic-drill-down | Epic Drill-Down Flow | defining | ux-agent | `docs/product/ux/epic-drill-down.md` |
| ux-follow-up | Follow-Up Task Flow | defining | ux-agent | `docs/product/ux/follow-up-task-flow.md` |
| ux-spaces-nav | Spaces Navigation | defining | ux-agent | `docs/product/ux/spaces-navigation.md` |

## Architecture

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| arch-ai-pipeline | AI Pipeline | exploring | architecture-agent | `docs/architecture/ai-pipeline.md` |
| arch-data-model | Data Model | defining | architecture-agent | `docs/architecture/data-model.md` |
| arch-event-sourcing | Event Sourcing on Firestore | defining | architecture-agent | `docs/architecture/event-sourcing.md` |
| arch-integrations | Integration Roadmap | defining | integration-agent | `docs/architecture/integrations.md` |
| arch-north-star-layout | North Star Repository Layout | defining | workspace-contracts-agent | `docs/architecture/north-star-layout.md` |
| arch-offline | Offline Strategy | defining | architecture-agent | `docs/architecture/offline-strategy.md` |
| arch-plan-apply-engine | Plan/Apply Engine | defining | workspace-contracts-agent | `docs/architecture/plan-apply-engine.md` |
| arch-security | Security & Auth | defining | architecture-agent | `docs/architecture/security.md` |
| arch-stack | Technology Stack | defining | architecture-agent | `docs/architecture/stack.md` |
| arch-workspace-contracts | Workspace Contract System | defining | workspace-contracts-agent | `docs/architecture/workspace-contracts.md` |

## Decisions

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| adr-001 | Firebase as Backend Platform | accepted | architecture-agent | `docs/decisions/adr-001-firebase-backend.md` |
| adr-002 | Event Sourcing on Firestore | accepted | architecture-agent | `docs/decisions/adr-002-event-sourcing-firestore.md` |
| adr-003 | Claude as Primary LLM | accepted | architecture-agent | `docs/decisions/adr-003-claude-primary-llm.md` |
| adr-004 | Hybrid Domain-Package Monorepo Architecture | accepted | architecture-agent | `docs/decisions/adr-004-hybrid-monorepo.md` |
| adr-005 | Dev Container and Build Container Strategy | accepted | architecture-agent | `docs/decisions/adr-005-dev-build-containers.md` |
| dr-001 | Repo Structure Contract + Folder Contracts | accepted | workspace-contracts-agent | `docs/decisions/dr-001-repo-structure-contract.md` |
| dr-002 | Verb-First CLI Command Grammar | accepted | workspace-contracts-agent | `docs/decisions/dr-002-cli-command-grammar.md` |
| dr-003 | Generated Registry + Docs Sync + Rust-First Gate | accepted | meta-agent | `docs/decisions/dr-003-generated-registry-and-doc-sync.md` |

## Open Questions

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| oq-conflict-resolution | AI Conflict Resolution & Undo Mechanisms | draft | product-agent | `docs/open-questions/oq-conflict-resolution.md` |
| oq-monetization | Monetization Strategy | draft | product-agent | `docs/open-questions/oq-monetization.md` |
| oq-monorepo-architecture | Monorepo Architecture — Code Organization Strategy | resolved | architecture-agent | `docs/open-questions/oq-monorepo-architecture.md` |
| oq-multi-user | Multi-User & Team Sharing | draft | product-agent | `docs/open-questions/oq-multi-user.md` |
| oq-notification-strategy | Notification Strategy | draft | product-agent | `docs/open-questions/oq-notification-strategy.md` |
| oq-privacy-model | AI Privacy Model & Data Ownership | draft | architecture-agent | `docs/open-questions/oq-privacy-model.md` |

## Workflows

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| wf-add-feature | Add a New Feature Spec | active | meta-agent | `docs/workflows/add-feature-spec.md` |
| wf-audit-observations | Audit Observations | active | observations-agent | `docs/workflows/audit-observations.md` |
| wf-capture-observation | Capture an Observation | active | observations-agent | `docs/workflows/capture-observation.md` |
| wf-create-agent | Create a New Agent | active | meta-agent | `docs/workflows/create-agent.md` |
| wf-decompose-spec | Decompose a Spec Document | active | meta-agent | `docs/workflows/decompose-spec.md` |
| wf-design-workspace-contract | Design a Workspace Contract | active | workspace-contracts-agent | `docs/workflows/design-workspace-contract.md` |
| wf-domain-review | Domain DRI Review | active | meta-agent | `docs/workflows/domain-review.md` |
| wf-feature-inception | Feature Inception | active | meta-agent | `docs/workflows/feature-inception.md` |
| wf-implement-syntropy-command | Implement a Syntropy CLI Command | active | workspace-contracts-agent | `docs/workflows/implement-syntropy-command.md` |
| wf-make-decision | Make an Architecture Decision | active | meta-agent | `docs/workflows/make-architecture-decision.md` |
| wf-record-decision | Record a Decision | active | decisions-agent | `docs/workflows/record-decision.md` |
| wf-refine-story | Refine a User Story | active | product-agent | `docs/workflows/refine-user-story.md` |
| wf-reflect | Reflect After Work | active | observations-agent | `docs/workflows/reflect.md` |
| wf-resolve-question | Resolve an Open Question | active | meta-agent | `docs/workflows/resolve-open-question.md` |
| wf-run-syntropy-cli | Run the Syntropy CLI (Bootstrap Slice) | active | workspace-contracts-agent | `docs/workflows/run-syntropy-cli.md` |
| wf-sync-domain-context | Sync Domain Context | active | meta-agent | `docs/workflows/sync-domain-context.md` |

## Agents

| ID | Title | Status | Scope | File |
|----|-------|--------|-------|------|
| architecture-agent | Architecture Agent | active | Technical architecture, data model, tech stack, infrastructure, event sourcing | `.syntropy/system-of-work/domains/architecture/AGENT.md` |
| base-traits | Base Agent Traits | active | All agents | `.syntropy/system-of-work/domains/system/_base-traits.md` |
| bazel-agent | Bazel Agent | active | Bazel module/build graph, build tooling, visibility, deps hygiene | `.syntropy/system-of-work/domains/bazel/AGENT.md` |
| cognitive-engineering-agent | Cognitive Engineering Agent | active | Information architecture for human comprehension — review structures, learning methodologies, knowledge compression, cognitive adaptation | `.syntropy/system-of-work/domains/cognitive-engineering/AGENT.md` |
| decisions-agent | Decisions Agent | active | Decision records, reasoning graph integrity, decision coherence, conflict detection | `.syntropy/system-of-work/domains/decisions/AGENT.md` |
| devex-agent | DevEx Agent | active | Bootstrap, local setup, tooling ergonomics, paved roads | `.syntropy/system-of-work/domains/devex/AGENT.md` |
| f04-ai-engine-agent | AI Engine Agent | active | Feature F04: AI Action Engine — confidence scoring, domain agents, auto-execution | `.syntropy/system-of-work/domains/product/features/f04-ai-engine/AGENT.md` |
| f11-domains-agent | Domains / Spaces Agent | active | Feature F11: Domains/Spaces — persistent life contexts, knowledge base, info management | `.syntropy/system-of-work/domains/product/features/f11-domains/AGENT.md` |
| f12-artifact-agent | Artifact Intelligence Agent | active | Feature F12: Artifact Intelligence — upload, extraction, linking, knowledge capture | `.syntropy/system-of-work/domains/product/features/f12-artifact/AGENT.md` |
| integration-agent | Integration Agent | active | External integrations — Gmail, Calendar, Slack, GitHub, financial, IoT | `.syntropy/system-of-work/domains/integration/AGENT.md` |
| meta-agent | Meta Agent | active | Orchestration, routing, knowledge graph integrity, agent lifecycle | `.syntropy/system-of-work/domains/system/AGENT.md` |
| observations-agent | Observations Agent | active | Observation capture, structuring, pattern detection, contributor upleveling | `.syntropy/system-of-work/domains/observations/AGENT.md` |
| operational-engineering-agent | Operational Engineering Agent | active | Methodology for designing effective workflows, rules, skills, context, and agent configurations — the craft of making actors effective at executing work | `.syntropy/system-of-work/domains/operational-engineering/AGENT.md` |
| product-agent | Product Agent | active | Product specifications, features, use cases, user stories, JTBD | `.syntropy/system-of-work/domains/product/AGENT.md` |
| pulse-companion-agent | Pulse Companion Agent | active | Assisted reflection, continuous pulse sensing, personalized work companionship | `.syntropy/system-of-work/domains/pulse-companion/AGENT.md` |
| tasks-agent | Tasks Agent | active | Planning, verification discipline, task decomposition and checklists | `.syntropy/system-of-work/domains/tasks/AGENT.md` |
| ux-agent | UX Agent | active | UX patterns, design decisions, interaction flows, prototypes | `.syntropy/system-of-work/domains/ux/AGENT.md` |
| workspace-contracts-agent | Workspace Contracts Agent | active | Workspace contracts, validation, scaffolding, migrations, plan/apply, repo structure | `.syntropy/system-of-work/domains/workspace-contracts/AGENT.md` |

## Dev Platform — Vision

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| jtbd-dev-platform | Dev Platform — Jobs to Be Done | active | meta-agent | `docs/vision/jtbd-dev-platform.md` |

## Dev Platform — Features

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| dp01 | Knowledge Graph | defining | meta-agent | `docs/product/dev-platform/features/dp01-knowledge-graph.md` |
| dp02 | Agent System | defining | meta-agent | `docs/product/dev-platform/features/dp02-agent-system.md` |
| dp03 | Workflow Engine | defining | meta-agent | `docs/product/dev-platform/features/dp03-workflow-engine.md` |
| dp04 | Registry & Changelog | defining | meta-agent | `docs/product/dev-platform/features/dp04-registry-changelog.md` |
| dp05 | Convention System | defining | meta-agent | `docs/product/dev-platform/features/dp05-convention-system.md` |
| dp06 | Surface Definitions | defining | meta-agent | `docs/product/dev-platform/features/dp06-surface-definitions.md` |
| dp07 | Prototype System | defining | ux-agent | `docs/product/dev-platform/features/dp07-prototype-system.md` |
| dp08 | Entry Point Routing | defining | meta-agent | `docs/product/dev-platform/features/dp08-entry-point-routing.md` |
| dp09 | Domain Context Sync | defining | meta-agent | `docs/product/dev-platform/features/dp09-domain-context-sync.md` |
| dp10 | Observation System | defining | observations-agent | `docs/product/dev-platform/features/dp10-observation-system.md` |
| dp11 | Reflection Loop | defining | observations-agent | `docs/product/dev-platform/features/dp11-reflection-loop.md` |
| dp12 | Pulse Companion | defining | pulse-companion-agent | `docs/product/dev-platform/features/dp12-pulse-companion.md` |
| dp13 | Decision Records | defining | decisions-agent | `docs/product/dev-platform/features/dp13-decision-records.md` |
| dp14 | Cognitive Engineering | defining | cognitive-engineering-agent | `docs/product/dev-platform/features/dp14-cognitive-engineering.md` |
| dp15 | Operational Engineering | defining | operational-engineering-agent | `docs/product/dev-platform/features/dp15-operational-engineering.md` |

## Dev Platform — Use Cases

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| dp-u01 | Adding a New Feature to the Product | defining | meta-agent | `docs/product/dev-platform/use-cases/dp-u01-add-feature.md` |
| dp-u02 | New Contributor Onboarding | defining | meta-agent | `docs/product/dev-platform/use-cases/dp-u02-contributor-onboarding.md` |
| dp-u03 | Making and Recording an Architecture Decision | defining | meta-agent | `docs/product/dev-platform/use-cases/dp-u03-architecture-decision.md` |
| dp-u04 | Exploring the Knowledge Graph | defining | meta-agent | `docs/product/dev-platform/use-cases/dp-u04-exploring-knowledge-graph.md` |
| dp-u05 | Resolving an Open Question | defining | meta-agent | `docs/product/dev-platform/use-cases/dp-u05-resolving-open-question.md` |
| dp-u06 | Syncing Domain Context After Changes | defining | meta-agent | `docs/product/dev-platform/use-cases/dp-u06-domain-context-sync.md` |
| dp-u07 | Domain DRI Review Before Merge | defining | meta-agent | `docs/product/dev-platform/use-cases/dp-u07-domain-review-before-merge.md` |
| dp-u08 | Capturing an Observation in the Moment | defining | observations-agent | `docs/product/dev-platform/use-cases/dp-u08-capturing-observation.md` |
| dp-u09 | Auditing Observations for Patterns and Priorities | defining | observations-agent | `docs/product/dev-platform/use-cases/dp-u09-auditing-observations.md` |
| dp-u10 | Reflecting After Completing Work | defining | observations-agent | `docs/product/dev-platform/use-cases/dp-u10-reflecting-after-work.md` |
| dp-u11 | Assisted Reflection with Pulse Companion | defining | pulse-companion-agent | `docs/product/dev-platform/use-cases/dp-u11-assisted-reflection.md` |
| dp-u12 | Recording a Decision During Work | defining | decisions-agent | `docs/product/dev-platform/use-cases/dp-u12-recording-decision.md` |
| dp-u13 | Navigating the Decision Graph to Understand Why | defining | decisions-agent | `docs/product/dev-platform/use-cases/dp-u13-navigating-decision-graph.md` |
| dp-u14 | Structuring a Code Review for Comprehension | defining | cognitive-engineering-agent | `docs/product/dev-platform/use-cases/dp-u14-structured-code-review.md` |
| dp-u15 | Creating a Learning Brief for Architecture Comprehension | defining | cognitive-engineering-agent | `docs/product/dev-platform/use-cases/dp-u15-architecture-learning-brief.md` |
| dp-u16 | Designing an Actor-Effective Workflow | defining | operational-engineering-agent | `docs/product/dev-platform/use-cases/dp-u16-designing-actor-effective-workflow.md` |
| dp-u17 | Auditing Process Effectiveness Across Actor Types | defining | operational-engineering-agent | `docs/product/dev-platform/use-cases/dp-u17-auditing-process-effectiveness.md` |

## Dev Platform — User Stories

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| dp-stories | Dev Platform User Stories | defining | meta-agent | `docs/product/dev-platform/user-stories/stories-dev-platform.md` |

## Repo Platform — Vision

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| jtbd-repo-platform | Repo Platform — Jobs to Be Done | active | architecture-agent | `docs/vision/jtbd-repo-platform.md` |

## Repo Platform — Features

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| rp01 | Runtime Version Management | defining | architecture-agent | `docs/product/repo-platform/features/rp01-runtime-version-management.md` |
| rp02 | Workspace & Package Management | defining | architecture-agent | `docs/product/repo-platform/features/rp02-workspace-management.md` |
| rp03 | Build Orchestration & Caching | defining | architecture-agent | `docs/product/repo-platform/features/rp03-build-orchestration.md` |
| rp04 | TypeScript Project Configuration | defining | architecture-agent | `docs/product/repo-platform/features/rp04-typescript-project-config.md` |
| rp05 | Development Container | defining | architecture-agent | `docs/product/repo-platform/features/rp05-dev-container.md` |
| rp06 | Build Container | defining | architecture-agent | `docs/product/repo-platform/features/rp06-build-container.md` |
| rp07 | Infrastructure as Code | defining | architecture-agent | `docs/product/repo-platform/features/rp07-infrastructure-as-code.md` |
| rp08 | Version Control & Conventions | defining | architecture-agent | `docs/product/repo-platform/features/rp08-version-control.md` |
| rp09 | CI/CD Pipeline | exploring | architecture-agent | `docs/product/repo-platform/features/rp09-ci-cd-pipeline.md` |
| rp10 | Code Quality Automation | exploring | architecture-agent | `docs/product/repo-platform/features/rp10-code-quality.md` |

## Repo Platform — Use Cases

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| rp-u01 | Setting Up Local Development | defining | architecture-agent | `docs/product/repo-platform/use-cases/rp-u01-setup-local-dev.md` |
| rp-u02 | Adding a New Package to the Monorepo | defining | architecture-agent | `docs/product/repo-platform/use-cases/rp-u02-add-package.md` |
| rp-u03 | Running an Incremental Build After Code Changes | defining | architecture-agent | `docs/product/repo-platform/use-cases/rp-u03-incremental-build.md` |
| rp-u04 | Deploying Infrastructure Changes | defining | architecture-agent | `docs/product/repo-platform/use-cases/rp-u04-deploy-infrastructure.md` |
| rp-u05 | Running CI/CD on a Pull Request | exploring | architecture-agent | `docs/product/repo-platform/use-cases/rp-u05-ci-cd-pull-request.md` |
| rp-u06 | Opening the Project in GitHub Codespaces | defining | architecture-agent | `docs/product/repo-platform/use-cases/rp-u06-github-codespaces.md` |
| rp-u07 | Upgrading a Shared Runtime Dependency | defining | architecture-agent | `docs/product/repo-platform/use-cases/rp-u07-upgrade-dependency.md` |

## Repo Platform — User Stories

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| rp-stories | Repo Platform User Stories | defining | architecture-agent | `docs/product/repo-platform/user-stories/stories-repo-platform.md` |

## Workspace Platform — Vision

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| jtbd-workspace-platform | Workspace Platform — Jobs to Be Done | active | workspace-contracts-agent | `docs/vision/jtbd-workspace-platform.md` |

## Workspace Platform — Features

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| wp01 | Workspace Contract | building | workspace-contracts-agent | `docs/product/workspace-platform/features/wp01-workspace-contract.md` |
| wp02 | Workspace Instance | exploring | workspace-contracts-agent | `docs/product/workspace-platform/features/wp02-workspace-instance.md` |
| wp03 | Validation Engine | building | workspace-contracts-agent | `docs/product/workspace-platform/features/wp03-validation-engine.md` |
| wp04 | Plan/Apply Engine | exploring | workspace-contracts-agent | `docs/product/workspace-platform/features/wp04-plan-apply-engine.md` |
| wp05 | Scaffolding & Generators | building | workspace-contracts-agent | `docs/product/workspace-platform/features/wp05-scaffolding-generators.md` |
| wp06 | Migrations | exploring | workspace-contracts-agent | `docs/product/workspace-platform/features/wp06-migrations.md` |
| wp07 | Workspace State & Hydration | exploring | workspace-contracts-agent | `docs/product/workspace-platform/features/wp07-workspace-state.md` |
| wp08 | Contract Schema System | exploring | workspace-contracts-agent | `docs/product/workspace-platform/features/wp08-contract-schema-system.md` |

## Workspace Platform — Use Cases

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| wp-u01 | Initializing a New Workspace | defining | workspace-contracts-agent | `docs/product/workspace-platform/use-cases/wp-u01-init-workspace.md` |
| wp-u02 | Adding a Service to an Existing Workspace | defining | workspace-contracts-agent | `docs/product/workspace-platform/use-cases/wp-u02-add-service.md` |
| wp-u03 | Validating Workspace Coherence | defining | workspace-contracts-agent | `docs/product/workspace-platform/use-cases/wp-u03-validate-workspace.md` |
| wp-u04 | Planning and Applying a Structural Change | defining | workspace-contracts-agent | `docs/product/workspace-platform/use-cases/wp-u04-plan-apply-change.md` |
| wp-u05 | Migrating to a New Contract Version | defining | workspace-contracts-agent | `docs/product/workspace-platform/use-cases/wp-u05-migrate-contract.md` |
| wp-u06 | Creating a Custom Generator | defining | workspace-contracts-agent | `docs/product/workspace-platform/use-cases/wp-u06-custom-generator.md` |
| wp-u07 | Agent Hydrating Workspace Context | defining | workspace-contracts-agent | `docs/product/workspace-platform/use-cases/wp-u07-agent-hydrate-state.md` |

## Workspace Platform — User Stories

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| wp-stories | Workspace Platform User Stories | defining | workspace-contracts-agent | `docs/product/workspace-platform/user-stories/stories-workspace-platform.md` |

## Surfaces

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| surf-dev-platform | Development Platform | active | meta-agent | `surfaces/dev-platform.md` |
| surf-mobile | Mobile Surface (iOS/Android) | defining | ux-agent | `surfaces/mobile.md` |
| surf-repo-platform | Repo Platform | active | architecture-agent | `surfaces/repo-platform.md` |
| surf-web | Web Surface (Desktop) | defining | ux-agent | `surfaces/web.md` |
| surf-workspace-platform | Workspace Platform | active | workspace-contracts-agent | `surfaces/workspace-platform.md` |

## Index & Meta Files

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| arch-index | Architecture Domain | active | architecture-agent | `docs/architecture/_index.md` |
| changelog | Changelog | active | meta-agent | `docs/_changelog.md` |
| conventions | Document Conventions | active | meta-agent | `docs/_conventions.md` |
| decisions-index | Decision Log | active | decisions-agent | `docs/decisions/_index.md` |
| dp-product-index | Dev Platform Product Domain | active | meta-agent | `docs/product/dev-platform/_index.md` |
| observations-index | Observations Index | active | observations-agent | `observations/_index.md` |
| product-index | Product Domain | active | product-agent | `docs/product/_index.md` |
| registry | Document Registry | active | meta-agent | `docs/_registry.md` |
| rp-product-index | Repo Platform Product Domain | active | architecture-agent | `docs/product/repo-platform/_index.md` |
| surfaces-index | Surfaces | active | meta-agent | `surfaces/_index.md` |
| wp-product-index | Workspace Platform Product Domain | active | workspace-contracts-agent | `docs/product/workspace-platform/_index.md` |

## Prototypes

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| proto-architecture-explorer | Architecture Explorer | active | ux-agent | `prototypes/architecture-explorer.jsx` |
| proto-artifact-intelligence | Artifact Intelligence | active | ux-agent | `prototypes/artifact-intelligence.jsx` |
| proto-domain-explorer | Domain Explorer | active | ux-agent | `prototypes/domain-explorer.jsx` |
| proto-product-canvas | Product Canvas | active | ux-agent | `prototypes/product-canvas.jsx` |
| proto-task-card-queue | Task Card Queue | active | ux-agent | `prototypes/task-card-queue.jsx` |
