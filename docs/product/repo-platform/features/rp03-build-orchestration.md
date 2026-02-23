---
id: "rp03"
type: feature-spec
title: "Build Orchestration & Caching"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp01, rp02]
  enables: [rp-u02, rp-u03, rp-u05, rp09, rp10]
  informed-by: [jtbd-repo-platform]
  related: [adr-004, arch-stack, rp-stories, rp04, rp06, surf-repo-platform]
tags: [repo-platform, build, caching, nx, monorepo, p0]
---

# RP03 — Build Orchestration & Caching

## Summary

Orchestrates build, test, and lint tasks across all packages in the monorepo. Understands the dependency graph between packages, runs tasks in the correct order, parallelizes where possible, and caches results based on content hashes to skip unchanged work.

## Jobs Addressed

- RJ2 — Fast Incremental Builds (primary)
- RJ6 — Lean, Trustworthy CI/CD (secondary)

## How It Works

### Dependency-Aware Task Execution

The orchestrator builds a project graph from workspace configuration and package dependencies. When a task is requested (e.g., `build`), it topologically sorts the dependency chain and executes tasks in the correct order, parallelizing independent branches.

**Currently:** Nx 20.x — `nx run-many -t build` builds all packages; `targetDefaults.build.dependsOn: ["^build"]` ensures upstream deps build first.

### Content-Hash Caching

Each task's inputs (source files, config files, upstream outputs) are hashed. If the hash matches a previous run, the cached output is restored instead of re-executing the task. This turns O(all packages) builds into O(changed packages) builds.

**Currently:** Nx computation caching — `cache: true` on build, lint, and test targets. Named inputs define what triggers invalidation:
- `default` — all project files + shared globals
- `production` — default minus test/spec files
- `sharedGlobals` — workspace-level configs (tsconfig.base.json)

### Affected Detection

When running on a branch, the orchestrator can determine which packages are affected by changes since the base branch and run tasks only for those packages.

**Currently:** Nx affected commands — `nx affected -t test` runs tests only for packages changed since `main` (configured via `defaultBase`).

### Root-Level Task Scripts

Convenience scripts at the repo root delegate to the orchestrator for common operations.

**Currently:** `package.json` scripts:
- `build` → `nx run-many -t build`
- `test` → `nx run-many -t test`
- `lint` → `nx run-many -t lint`
- `dev:web`, `dev:mobile`, `dev:dev-web` → `nx run <app>:dev`
- `deploy:functions` → `nx run functions:deploy`

### Remote Caching (Planned)

Task caches can be shared across machines via a remote cache backend. A cache hit from CI can be reused locally and vice versa, dramatically reducing redundant work.

**Currently:** Not yet configured. Planned: Nx Replay (Nx Cloud) or self-hosted cache server.

## Dependencies

- Requires: RP01 (Runtime Version Management), RP02 (Workspace Management) — the orchestrator reads workspace structure and runs tasks with the correct runtime
- Enables: RP09 (CI/CD Pipeline), RP10 (Code Quality Automation)

## Open Questions

- [ ] Evaluate Nx Cloud vs. self-hosted remote cache for cost and privacy
- [ ] Should we configure the Nx daemon for persistent process in containers?
- [ ] Evaluate `@nx/enforce-module-boundaries` for compile-time dependency rule enforcement
