---
id: "jtbd-repo-platform"
type: vision
title: "Repo Platform — Jobs to Be Done"
status: active
owner: architecture-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [manifesto]
  enables: [rp-stories, rp01, rp02, rp03, rp04, rp05, rp06, rp07, rp08, rp09, rp10]
  related: [jtbd, jtbd-dev-platform, jtbd-workspace-platform, principles, rp-product-index, surf-repo-platform]
tags: [vision, motivation, jtbd, repo-platform, meta]
---

# Repo Platform — Jobs to Be Done

The Repo Platform is the engineering infrastructure that makes Syntropy buildable, testable, and deployable. These are the jobs it must fulfill — expressed tool-agnostically so the underlying technology can change while the jobs remain stable.

## RJ1 — Reproducible Development Environments

**When** I start working on the project on any machine, **I want** the development environment to be fully configured and reproducible from checked-in files **so that** I never spend time debugging environment-specific issues or wondering which versions to install.

## RJ2 — Fast Incremental Builds

**When** I change code in one package, **I want** only the affected packages to rebuild **so that** my feedback loop stays under seconds as the monorepo grows.

## RJ3 — Consistent Runtime Versions Everywhere

**When** a new contributor joins, a CI runner starts, or a Codespace opens, **I want** the exact same Rust toolchain and build tooling versions to be used **so that** "works on my machine" never happens.

## RJ4 — Declarative Infrastructure Management

**When** I need to provision or modify cloud resources, **I want** to express infrastructure as type-safe code that's reviewable, testable, and reversible **so that** infrastructure changes follow the same rigor as application code.

## RJ5 — Domain-Isolated Package Boundaries

**When** the codebase grows, **I want** business logic organized into isolated domain packages with enforced dependency rules **so that** changes in one domain don't cascade unpredictably into others.

## RJ6 — Lean, Trustworthy CI/CD

**When** a pull request is opened, **I want** automated builds, tests, and linting to run in minimal containers with maximum caching **so that** pipeline results are fast and trustworthy.

## RJ7 — Automated Code Quality

**When** code is written or changed, **I want** automated linting, formatting, and type checking across all packages **so that** quality is consistent without manual enforcement.

## RJ8 — Type-Safe Cross-Package Contracts

**When** packages depend on each other, **I want** shared types and interfaces to catch breaking changes at compile time **so that** integration bugs surface before runtime.

## RJ9 — Zero-Friction Contributor Onboarding

**When** someone new needs to contribute, **I want** them to be productive in minutes with a single command or container open **so that** onboarding requires no tribal knowledge.

## RJ10 — Scalable Monorepo Growth

**When** new apps, packages, or infrastructure are added, **I want** standardized scaffolding and conventions **so that** the repo stays organized and maintains its structural integrity at any scale.
