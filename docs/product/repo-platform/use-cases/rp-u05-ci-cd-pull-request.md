---
id: "rp-u05"
type: use-case
title: "Running CI/CD on a Pull Request"
status: exploring
owner: architecture-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp03, rp06, rp09, rp10]
  related: [rp-u03, rp-u04, wp-u03]
tags: [repo-platform, use-case, ci-cd]
---

# RP-U05 — Running CI/CD on a Pull Request

## Scenario

A developer opens a pull request. The CI/CD pipeline automatically validates the changes by running drift gates, workspace validation, and keeping both Cargo and Bazel builds green.

### Steps

1. Developer pushes a branch and opens a pull request
2. GitHub Actions triggers the PR validation workflow
3. Run `cargo run -p syntropy -- check`
4. Run `bazel build //products/command-center/apps/cli:syntropy`
5. Results are reported as PR status checks
6. The PR is mergeable only if all checks pass

### Outcome

- Every PR is validated against pinned toolchains
- Drift gates prevent “forgot to generate” merges
- Cargo and Bazel remain aligned (no silent drift)
- Clear pass/fail status on the PR before review

## Features Exercised

- RP03 — Build Orchestration (Cargo/Bazel builds and caching)
- RP06 — Build Container (reproducible CI environment)
- RP09 — CI/CD Pipeline (workflow definition, triggers)
- RP10 — Code Quality Automation (lint/format/type safety)

## Acceptance Criteria

- [ ] CI runs automatically on every PR
- [ ] CI uses pinned Rust and Bazel versions (RP01)
- [ ] Pipeline completes in under 5 minutes for typical changes
- [ ] Failed checks block PR merge
