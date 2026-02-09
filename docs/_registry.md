---
id: "registry"
type: reference
title: "Document Registry"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-09
---

# Document Registry

Master index of all documents in the Syntropy OS knowledge graph. Every document's stable ID maps to its file path, current status, and owning agent.

## Vision

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| manifesto | Core Philosophy | active | meta-agent | `docs/vision/manifesto.md` |
| jtbd | Jobs to Be Done | active | product-agent | `docs/vision/jtbd.md` |
| principles | Design Principles | active | meta-agent | `docs/vision/principles.md` |
| glossary | Glossary | active | meta-agent | `docs/vision/glossary.md` |

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
| f08 | Cross-Platform | defining | architecture-agent | `docs/product/features/f08-cross-platform.md` |
| f09 | Follow-Up Tasks & Dependencies | defining | product-agent | `docs/product/features/f09-follow-up-tasks.md` |
| f10 | Confidence Thresholds & Trust | defining | product-agent | `docs/product/features/f10-confidence-thresholds.md` |
| f11 | Domains / Spaces | defining | product-agent | `docs/product/features/f11-domains-spaces.md` |
| f12 | Artifact Intelligence | defining | product-agent | `docs/product/features/f12-artifact-intelligence.md` |

## Use Cases

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| u01 | Email Triage | defining | product-agent | `docs/product/use-cases/u01-email-triage.md` |
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
| s01–s16 | All User Stories | defining | product-agent | `docs/product/user-stories/stories.md` |

## UX Patterns

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| ux-card-queue | Card Queue Layout | defining | ux-agent | `docs/product/ux/card-queue-layout.md` |
| ux-epic-drill-down | Epic Drill-Down Flow | defining | ux-agent | `docs/product/ux/epic-drill-down.md` |
| ux-ai-suggestion | AI Suggestion Display | defining | ux-agent | `docs/product/ux/ai-suggestion-display.md` |
| ux-spaces-nav | Spaces Navigation | defining | ux-agent | `docs/product/ux/spaces-navigation.md` |
| ux-artifact-flow | Artifact Intelligence Flow | defining | ux-agent | `docs/product/ux/artifact-intelligence-flow.md` |
| ux-follow-up | Follow-Up Task Flow | defining | ux-agent | `docs/product/ux/follow-up-task-flow.md` |
| ux-dependency-viz | Dependency Visualization | defining | ux-agent | `docs/product/ux/dependency-visualization.md` |

## Architecture

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| arch-stack | Technology Stack | defining | architecture-agent | `docs/architecture/stack.md` |
| arch-data-model | Data Model | defining | architecture-agent | `docs/architecture/data-model.md` |
| arch-event-sourcing | Event Sourcing on Firestore | defining | architecture-agent | `docs/architecture/event-sourcing.md` |
| arch-ai-pipeline | AI Pipeline | exploring | architecture-agent | `docs/architecture/ai-pipeline.md` |
| arch-offline | Offline Strategy | defining | architecture-agent | `docs/architecture/offline-strategy.md` |
| arch-security | Security | defining | architecture-agent | `docs/architecture/security.md` |
| arch-integrations | Integration Roadmap | defining | integration-agent | `docs/architecture/integrations.md` |

## Decisions

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| adr-001 | Firebase as Backend Platform | accepted | architecture-agent | `docs/decisions/adr-001-firebase-backend.md` |
| adr-002 | Event Sourcing on Firestore | accepted | architecture-agent | `docs/decisions/adr-002-event-sourcing-firestore.md` |
| adr-003 | Claude as Primary LLM | accepted | architecture-agent | `docs/decisions/adr-003-claude-primary-llm.md` |

## Open Questions

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| oq-privacy-model | Privacy Model for AI Email Reading | draft | architecture-agent | `docs/open-questions/oq-privacy-model.md` |
| oq-conflict-resolution | AI Conflict Resolution & Undo | draft | product-agent | `docs/open-questions/oq-conflict-resolution.md` |
| oq-multi-user | Multi-User / Team Support | draft | product-agent | `docs/open-questions/oq-multi-user.md` |
| oq-monetization | Monetization Strategy | draft | product-agent | `docs/open-questions/oq-monetization.md` |
| oq-notification-strategy | Notification Strategy | draft | product-agent | `docs/open-questions/oq-notification-strategy.md` |

## Workflows

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| wf-add-feature | Add a New Feature Spec | active | meta-agent | `docs/workflows/add-feature-spec.md` |
| wf-make-decision | Make an Architecture Decision | active | meta-agent | `docs/workflows/make-architecture-decision.md` |
| wf-refine-story | Refine a User Story | active | product-agent | `docs/workflows/refine-user-story.md` |
| wf-create-agent | Create a New Agent | active | meta-agent | `docs/workflows/create-agent.md` |
| wf-resolve-question | Resolve an Open Question | active | meta-agent | `docs/workflows/resolve-open-question.md` |
| wf-decompose-spec | Decompose a Spec Document | active | meta-agent | `docs/workflows/decompose-spec.md` |
| wf-sync-domain-context | Sync Domain Context | active | meta-agent | `docs/workflows/sync-domain-context.md` |
| wf-domain-review | Domain DRI Review | active | meta-agent | `docs/workflows/domain-review.md` |
| wf-capture-observation | Capture an Observation | active | observations-agent | `docs/workflows/capture-observation.md` |
| wf-audit-observations | Audit Observations | active | observations-agent | `docs/workflows/audit-observations.md` |

## Agents

| ID | Title | Status | Scope | File |
|----|-------|--------|-------|------|
| base-traits | Base Agent Traits | active | All agents | `agents/_base-traits.md` |
| meta-agent | Meta Agent | active | Orchestration, routing | `agents/meta-agent.md` |
| product-agent | Product Agent | active | Product specs, features, stories | `agents/product-agent.md` |
| architecture-agent | Architecture Agent | active | Technical architecture | `agents/architecture-agent.md` |
| ux-agent | UX Agent | active | UX patterns, design | `agents/ux-agent.md` |
| integration-agent | Integration Agent | active | External integrations | `agents/integration-agent.md` |
| f04-ai-engine-agent | AI Engine Agent | active | Feature F04 | `agents/feature-agents/f04-ai-engine-agent.md` |
| f11-domains-agent | Domains Agent | active | Feature F11 | `agents/feature-agents/f11-domains-agent.md` |
| f12-artifact-agent | Artifact Agent | active | Feature F12 | `agents/feature-agents/f12-artifact-agent.md` |
| observations-agent | Observations Agent | active | Observation capture, structuring, patterns | `agents/observations-agent.md` |

## Dev Platform — Vision

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| jtbd-dev-platform | Dev Platform JTBD | active | meta-agent | `docs/vision/jtbd-dev-platform.md` |

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
| dp-u09 | Auditing Observations for Patterns | defining | observations-agent | `docs/product/dev-platform/use-cases/dp-u09-auditing-observations.md` |

## Dev Platform — User Stories

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| dp-stories | Dev Platform User Stories (DP-S01–DP-S27) | defining | meta-agent | `docs/product/dev-platform/user-stories/stories-dev-platform.md` |

## Surfaces

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| surf-mobile | Mobile Surface | defining | ux-agent | `surfaces/mobile.md` |
| surf-web | Web Surface | defining | ux-agent | `surfaces/web.md` |
| surf-dev-platform | Development Platform | active | meta-agent | `surfaces/dev-platform.md` |

## Index & Meta Files

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| conventions | Document Conventions | active | meta-agent | `docs/_conventions.md` |
| changelog | Changelog | active | meta-agent | `docs/_changelog.md` |
| registry | Document Registry | active | meta-agent | `docs/_registry.md` |
| product-index | Product Domain Index | active | product-agent | `docs/product/_index.md` |
| dp-product-index | Dev Platform Product Index | active | meta-agent | `docs/product/dev-platform/_index.md` |
| arch-index | Architecture Domain Index | active | architecture-agent | `docs/architecture/_index.md` |
| decisions-index | Decisions Index | active | architecture-agent | `docs/decisions/_index.md` |
| surfaces-index | Surfaces Index | active | ux-agent | `surfaces/_index.md` |
| observations-index | Observations Index | active | observations-agent | `observations/_index.md` |

## Prototypes

| ID | Title | Status | Owner | File |
|----|-------|--------|-------|------|
| proto-arch-explorer | Architecture Explorer | active | ux-agent | `prototypes/architecture-explorer.jsx` |
| proto-artifact-intel | Artifact Intelligence | active | ux-agent | `prototypes/artifact-intelligence.jsx` |
| proto-domain-explorer | Domain Explorer | active | ux-agent | `prototypes/domain-explorer.jsx` |
| proto-product-canvas | Product Canvas | active | ux-agent | `prototypes/product-canvas.jsx` |
| proto-task-card-queue | Task Card Queue | active | ux-agent | `prototypes/task-card-queue.jsx` |
