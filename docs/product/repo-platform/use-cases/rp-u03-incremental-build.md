---
id: "rp-u03"
type: use-case
title: "Running an Incremental Build After Code Changes"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp03, rp04]
  related: [rp-u05]
tags: [repo-platform, use-case, build]
---

# RP-U03 — Running an Incremental Build After Code Changes

## Scenario

A developer modifies code in `packages/domain-core/` and wants to verify the build. They run `pnpm build` (or `nx affected -t build`) and expect only the affected packages to rebuild — not the entire monorepo.

### Steps

1. Developer edits a file in `packages/domain-core/src/`
2. Runs `pnpm build` (or `nx affected -t build` for branch-aware builds)
3. The build orchestrator computes content hashes for all packages
4. Packages with unchanged hashes are restored from cache (instant)
5. `domain-core` and its downstream consumers rebuild
6. Developer sees build output in seconds, not minutes

### Outcome

- Only changed packages and their dependents rebuild
- Cached packages show `[local cache]` in the build output
- Total build time scales with the change, not the repo size
- TypeScript incremental compilation (`tsbuildinfo`) further speeds up individual package builds

## Features Exercised

- RP03 — Build Orchestration (content-hash caching, dependency-aware ordering)
- RP04 — TypeScript Project Configuration (incremental compilation, project references)

## Acceptance Criteria

- [ ] Changing one file in `domain-core` does not rebuild `shared-types` or `design-tokens`
- [ ] Second consecutive `pnpm build` with no changes completes in under 2 seconds
- [ ] Build output clearly shows which packages were cached vs. rebuilt
