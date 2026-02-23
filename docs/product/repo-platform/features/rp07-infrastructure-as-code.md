---
id: "rp07"
type: feature-spec
title: "Infrastructure as Code"
status: defining
owner: architecture-agent
priority: P1
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp01, rp02]
  enables: [rp-u04]
  informed-by: [jtbd-repo-platform]
  related: [adr-001, adr-004, arch-stack, rp-stories, surf-repo-platform]
tags: [repo-platform, iac, pulumi, gcp, firebase, p1]
---

# RP07 — Infrastructure as Code

## Summary

Manages cloud infrastructure (Firebase, GCP) as type-safe code in the same language and repo as the application. Infrastructure changes are reviewable in pull requests, testable in preview mode, and reversible via stack state management.

## Jobs Addressed

- RJ4 — Declarative Infrastructure Management (primary)

## How It Works

### Type-Safe Infrastructure Definitions

Infrastructure is defined in TypeScript, sharing the same language and type system as the application. This means infrastructure can import application types, use the same IDE, and benefit from the same compiler checks.

**Currently:** Pulumi 3.x (TypeScript) in `infra/` directory. Dependencies:
- `@pulumi/pulumi` — core SDK
- `@pulumi/gcp` — Google Cloud Platform provider

### Workspace Integration

The infrastructure directory is a pnpm workspace member, meaning it can depend on shared packages and its dependencies are managed alongside the rest of the monorepo.

**Currently:** `pnpm-workspace.yaml` includes `infra`. The `infra/package.json` defines `up`, `preview`, and `destroy` scripts.

### Stack-Based Environment Management

Different environments (dev, staging, production) are managed as separate stacks, each with its own configuration file. Secrets are stored in stack state, not in code.

**Currently:** `infra/Pulumi.yaml` defines the project. Stack files (`Pulumi.<stack>.yaml`) will be created per environment.

### Preview Before Apply

Changes can be previewed before applying, showing a diff of what will be created, updated, or destroyed.

**Currently:** `pnpm --filter infra preview` shows infrastructure changes without applying them.

### Resource Coverage (Planned)

Firebase and GCP resources to be managed:
- Firebase project and apps
- Firestore database and security rules
- Cloud Functions configuration
- Cloud Storage buckets
- Firebase Auth settings
- Pub/Sub topics (for async AI processing)
- BigQuery datasets (for analytics export)

## Dependencies

- Requires: RP01 (Runtime Version Management) — Pulumi runs on Node.js
- Requires: RP02 (Workspace Management) — infra is a workspace member

## Open Questions

- [ ] Choose remote state backend: Pulumi Cloud (managed) vs. GCS bucket (self-hosted)?
- [ ] Should Pulumi stack config be committed (with encrypted secrets) or managed externally?
- [ ] Evaluate Pulumi ESC (Environments, Secrets, and Configuration) for secrets management
