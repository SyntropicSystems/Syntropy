---
id: "rp01"
type: feature-spec
title: "Runtime Version Management"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: []
  enables: [rp-u01, rp-u07, rp02, rp03, rp05, rp06, rp07]
  informed-by: [jtbd-repo-platform]
  related: [adr-004, arch-stack, rp-stories, rp03, rp05, surf-repo-platform]
tags: [repo-platform, runtime, node, pnpm, p0]
---

# RP01 — Runtime Version Management

## Summary

Pins the exact Node.js and pnpm versions used across all environments — local development, containers, and CI — so that runtime behavior is identical everywhere. A single version change propagates automatically to all consumers.

## Jobs Addressed

- RJ3 — Consistent Runtime Versions Everywhere (primary)
- RJ9 — Zero-Friction Contributor Onboarding (secondary)

## How It Works

### Node.js Version Pinning

A `.nvmrc` file at the repo root specifies the Node.js major version. Any tool that reads `.nvmrc` (nvm, fnm, devcontainers) automatically uses the correct version.

**Currently:** `.nvmrc` → `24` (Node.js 24.x LTS "Krypton")

### Package Manager Version Pinning

The `packageManager` field in the root `package.json` specifies the exact pnpm version. Node.js corepack reads this field and auto-activates the correct pnpm binary — no global install required.

**Currently:** `package.json` → `"packageManager": "pnpm@9.15.4"`

### Engine Constraints

The `engines` field in the root `package.json` sets minimum version requirements. pnpm validates these on install and fails fast if the runtime doesn't match.

**Currently:** `package.json` → `"engines": { "node": ">=24.0.0" }`

### Container Propagation

The Dockerfile reads the same version pins: `FROM node:24-slim` mirrors `.nvmrc`, and `corepack prepare pnpm@9.15.4` mirrors `packageManager`. A version bump in one place should be reflected in the other.

## Dependencies

- Requires: nothing (foundational capability)
- Enables: RP02 (Workspace Management), RP03 (Build Orchestration), RP05 (Dev Container), RP06 (Build Container)

## Open Questions

- [ ] Should we automate Dockerfile version sync from .nvmrc and package.json (e.g., via build args)?
- [ ] Evaluate fnm as an nvm alternative for faster shell startup
