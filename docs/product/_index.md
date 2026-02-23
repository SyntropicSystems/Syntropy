---
id: "product-index"
type: reference
title: "Product Domain"
status: active
owner: product-agent
created: 2025-02-07
updated: 2025-02-09
refs:
  related: [dp-product-index, rp-product-index, wp-product-index]
---

# Product Domain

Overview of the Syntropy OS product specification. This domain covers what we're building — features, use cases, user stories, and UX patterns.

## Feature Map

### P0 — Critical (MVP)
- **F01** — Task Card System: Card-by-card queue interface → `features/f01-task-card-system.md`
- **F02** — Recursive Task Hierarchy: Epics, projects, sub-tasks, dependencies → `features/f02-recursive-hierarchy.md`
- **F03** — Gmail / Google Workspace Integration: Email → cards → `features/f03-gmail-integration.md`
- **F04** — AI Action Engine: Confidence-based suggestions and auto-execution → `features/f04-ai-action-engine.md`
- **F06** — Event Sourcing & Audit Trail: Immutable event log → `features/f06-event-sourcing.md`
- **F08** — Cross-Platform: React Native + Web → `features/f08-cross-platform.md`
- **F10** — Confidence Thresholds & Trust Controls → `features/f10-confidence-thresholds.md`
- **F11** — Domains / Spaces: Persistent life contexts → `features/f11-domains-spaces.md`

### P1 — High Priority
- **F05** — Quick Capture: Voice, text, photo → structured tasks → `features/f05-quick-capture.md`
- **F07** — Self-Learning System: Learns from corrections → `features/f07-self-learning.md`
- **F09** — Follow-Up Tasks & Dependencies → `features/f09-follow-up-tasks.md`
- **F12** — Artifact Intelligence: Upload → extract → link → `features/f12-artifact-intelligence.md`

## Use Cases
10 concrete usage scenarios → `use-cases/`

## User Stories
16 user stories → `user-stories/stories.md`

## UX Patterns
6 design patterns → `ux/`

## Dev Platform (as Product)

The development platform itself is documented as a product → `dev-platform/_index.md`
- 13 JTBD (DJ1–DJ13) → `docs/vision/jtbd-dev-platform.md`
- 15 Feature Specs (DP01–DP15) → `dev-platform/features/`
- 17 Use Cases (DP-U01–DP-U17) → `dev-platform/use-cases/`
- 49 User Stories (DP-S01–DP-S49) → `dev-platform/user-stories/stories-dev-platform.md`

## Repo Platform (as Product)

The engineering infrastructure is documented as a product → `repo-platform/_index.md`
- 10 JTBD (RJ1–RJ10) → `docs/vision/jtbd-repo-platform.md`
- 10 Feature Specs (RP01–RP10) → `repo-platform/features/`
- 7 Use Cases (RP-U01–RP-U07) → `repo-platform/use-cases/`
- 19 User Stories (RP-S01–RP-S19) → `repo-platform/user-stories/stories-repo-platform.md`

## Workspace Platform (as Product)

The workspace contract and tooling layer is documented as a product → `workspace-platform/_index.md`
- 10 JTBD (WJ1–WJ10) → `docs/vision/jtbd-workspace-platform.md`
- 8 Feature Specs (WP01–WP08) → `workspace-platform/features/`
- 7 Use Cases (WP-U01–WP-U07) → `workspace-platform/use-cases/`
- 24 User Stories (WP-S01–WP-S24) → `workspace-platform/user-stories/stories-workspace-platform.md`
