---
id: "rp-u04"
type: use-case
title: "Deploying Infrastructure Changes"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [rp07]
  related: [rp-u05, adr-001]
tags: [repo-platform, use-case, infrastructure]
---

# RP-U04 — Deploying Infrastructure Changes

## Scenario

A developer needs to add a new Firestore collection, update security rules, or provision a new GCP resource. They modify the Pulumi code, preview the changes, and deploy to a stack.

### Steps

1. Edit `infra/index.ts` to define or modify resources
2. Run `pnpm --filter infra preview` to see a diff of planned changes
3. Review the diff — which resources will be created, updated, or destroyed
4. Run `pnpm --filter infra up` to apply changes to the target stack
5. Verify the resources are correctly provisioned in the GCP console or via Pulumi output

### Outcome

- Infrastructure changes are expressed as TypeScript code, reviewable in PRs
- Preview mode shows exact changes before applying
- Stack state tracks all provisioned resources
- Changes are reversible via `pulumi destroy` or by reverting the code

## Features Exercised

- RP07 — Infrastructure as Code (Pulumi TypeScript, stack management, preview/apply)

## Acceptance Criteria

- [ ] `pnpm --filter infra preview` shows accurate diff of changes
- [ ] `pnpm --filter infra up` successfully provisions/modifies resources
- [ ] Infrastructure code passes TypeScript type checking
- [ ] Changes to `infra/` are reviewable in pull requests like any other code
