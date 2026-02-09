---
id: "surf-repo-platform"
type: surface
title: "Repo Platform"
status: active
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  related: [architecture-agent, jtbd-repo-platform, rp-product-index, rp01, rp02, rp03, rp04, rp05, rp06, rp07, rp08, rp09, rp10, adr-004, adr-005, arch-stack]
tags: [surface, repository, infrastructure, build, toolchain]
---

# Repo Platform Surface

The Repo Platform is the engineering infrastructure layer that makes Syntropy buildable, testable, and deployable. It encompasses everything about how code is organized, built, containerized, and shipped — from runtime version management to CI/CD pipelines to infrastructure as code.

Where the **Dev Platform** is the _intellectual_ layer (knowledge graph, agents, workflows — how we think and organize), the **Repo Platform** is the _physical_ layer (monorepo, containers, builds, infrastructure — how we build and ship).

## What This Surface Is

- The monorepo structure and workspace management
- Build orchestration, caching, and task dependency graphs
- Runtime and toolchain version pinning (Node.js, pnpm, TypeScript)
- Development and build containers for reproducible environments
- Infrastructure as Code for cloud resource management
- CI/CD pipelines for automated quality gates
- Code quality automation (linting, formatting, type checking)
- Package scaffolding and conventions

## What This Surface Is Not

- Application-level architecture (that's `arch-*` docs)
- Product feature specs (that's `docs/product/`)
- Development methodology or knowledge management (that's the Dev Platform)

## Core Pattern: Tool-Agnostic Specs, Tool-Specific Implementations

Each capability is documented as a **what** (the job to be done, the spec) and a **how** (the current tool that implements it). The spec is durable; the tool is replaceable. Nx is a monorepo orchestrator — it could be Bazel or Turborepo. Pulumi is an IaC tool — it could be Terraform or CDK. The spec captures what we need; the implementation section captures what we chose and why.

## How This Surface Grows

1. **Identify a job** — a friction, a missing capability, or a scaling need
2. **Spec the feature** — document what the capability should do, tool-agnostically
3. **Pick or confirm the tool** — evaluate options, document the choice (often as an ADR)
4. **Implement** — configure the tool, update the feature spec's "Currently" section
5. **Expand** — as the project grows, features are refined and new ones are added

## Consumers of This Surface

| Consumer | How They Use It |
|----------|----------------|
| Developers | Set up environments, add packages, run builds, deploy infrastructure |
| CI/CD pipelines | Execute builds, tests, and deployments in containers |
| AI agents | Understand the repo structure for code generation and review |
| Platform engineers | Maintain and evolve the toolchain, enforce conventions |
| New contributors | Onboard quickly via devcontainers and standardized tooling |

## Principles

1. **Reproducibility over convenience** — every environment must be reproducible from configuration files, not tribal knowledge
2. **Single source of version truth** — each tool version is pinned in exactly one place and flows to all consumers
3. **Strict superset layering** — the devcontainer is a strict superset of the build container, which is a strict superset of the base image; no drift by construction
4. **Tool-agnostic specs** — document capabilities as specifications, not as tool manuals; tools can be swapped if the spec is clear
5. **Incremental adoption** — start with what's needed now, add capabilities as the project demands them; no over-engineering

## Product Documentation

The repo platform is documented as a product with the same structure as the application itself:

- **Jobs to Be Done**: `docs/vision/jtbd-repo-platform.md` — 10 core jobs (RJ1–RJ10)
- **Product Index**: `docs/product/repo-platform/_index.md` — feature map, use cases, stories
- **Feature Specs**: `docs/product/repo-platform/features/` — 10 feature specs (RP01–RP10)
- **Use Cases**: `docs/product/repo-platform/use-cases/` — 7 use cases (RP-U01–RP-U07)
- **User Stories**: `docs/product/repo-platform/user-stories/stories-repo-platform.md` — 19 stories (RP-S01–RP-S19)
