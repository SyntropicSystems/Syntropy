---
id: "rp-product-index"
type: reference
title: "Repo Platform Product Domain"
status: active
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [product-index, surf-repo-platform, jtbd-repo-platform]
tags: [repo-platform, product, index]
---

# Repo Platform Product Domain

The Repo Platform is the engineering infrastructure layer — everything about how Syntropy's code is organized, built, containerized, and shipped. It's documented as a product so that capabilities are specified tool-agnostically, tools are chosen deliberately, and the platform can evolve or be rebuilt on different technology without losing the specification.

## Jobs to Be Done

10 core jobs → `docs/vision/jtbd-repo-platform.md`

## Feature Map

### P0 — Critical (Foundation)
- **RP01** — Runtime Version Management: Node.js and pnpm version pinning across all environments → `features/rp01-runtime-version-management.md`
- **RP02** — Workspace & Package Management: Multi-package monorepo with workspace linking → `features/rp02-workspace-management.md`
- **RP03** — Build Orchestration & Caching: Parallel, dependency-aware builds with content-hash caching → `features/rp03-build-orchestration.md`
- **RP04** — TypeScript Project Configuration: Shared compiler options, path aliases, composite builds → `features/rp04-typescript-project-config.md`
- **RP05** — Development Container: Reproducible dev environment for VS Code, Cursor, Codespaces → `features/rp05-dev-container.md`
- **RP06** — Build Container: Lean CI/CD container, strict subset of devcontainer → `features/rp06-build-container.md`

### P1 — High Priority
- **RP07** — Infrastructure as Code: Declarative cloud resource management in TypeScript → `features/rp07-infrastructure-as-code.md`
- **RP08** — Version Control & Conventions: Git configuration, ignore patterns, branch conventions → `features/rp08-version-control.md`
- **RP09** — CI/CD Pipeline: Automated build, test, lint on pull requests → `features/rp09-ci-cd-pipeline.md`
- **RP10** — Code Quality Automation: Linting, formatting, type checking, boundary enforcement → `features/rp10-code-quality.md`

## Use Cases

7 concrete usage scenarios → `use-cases/`

## User Stories

Repo platform user stories → `user-stories/stories-repo-platform.md`
