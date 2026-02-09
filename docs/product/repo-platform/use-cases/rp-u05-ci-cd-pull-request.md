---
id: "rp-u05"
type: use-case
title: "Running CI/CD on a Pull Request"
status: exploring
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp03, rp06, rp09, rp10]
  related: [rp-u03]
tags: [repo-platform, use-case, ci-cd]
---

# RP-U05 — Running CI/CD on a Pull Request

## Scenario

A developer opens a pull request. The CI/CD pipeline automatically validates the changes by building, testing, and linting in a reproducible container.

### Steps

1. Developer pushes a branch and opens a pull request
2. GitHub Actions triggers the PR validation workflow
3. The workflow builds or pulls the `build` container image
4. Inside the container: `pnpm install --frozen-lockfile`
5. Run affected lint: `nx affected -t lint`
6. Run affected type check: `nx affected -t typecheck`
7. Run affected tests: `nx affected -t test`
8. Run affected build: `nx affected -t build`
9. Results are reported as PR status checks
10. The PR is mergeable only if all checks pass

### Outcome

- Every PR is validated against the same environment as local development
- Only affected packages are checked, keeping pipeline times proportional to the change
- Build cache reduces redundant work across CI runs
- Clear pass/fail status on the PR before review

## Features Exercised

- RP03 — Build Orchestration (affected detection, caching)
- RP06 — Build Container (reproducible CI environment)
- RP09 — CI/CD Pipeline (workflow definition, triggers)
- RP10 — Code Quality Automation (lint, type check)

## Acceptance Criteria

- [ ] CI runs automatically on every PR
- [ ] CI environment uses the same Node.js and pnpm versions as local dev
- [ ] Only affected packages are built and tested
- [ ] Pipeline completes in under 5 minutes for typical changes
- [ ] Failed checks block PR merge
