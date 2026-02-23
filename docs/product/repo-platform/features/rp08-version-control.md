---
id: "rp08"
type: feature-spec
title: "Version Control & Conventions"
status: defining
owner: architecture-agent
priority: P1
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: []
  enables: [rp09]
  informed-by: [jtbd-repo-platform]
  related: [rp-stories, rp02, rp04, rp10, surf-repo-platform, wp08]
tags: [repo-platform, git, conventions, p1]
---

# RP08 — Version Control & Conventions

## Summary

Git configuration and conventions that keep the repository clean, protect against accidental commits of sensitive or generated files, and establish consistent patterns for branch naming and commit messages.

## Jobs Addressed

- RJ10 — Scalable Monorepo Growth (primary)

## How It Works

### Git Ignore Patterns

A comprehensive `.gitignore` excludes generated files, build output, secrets, caches, and editor state from version control.

**Currently:** `.gitignore` covers:
- **Dependencies:** `node_modules/`
- **Build output:** `dist/`, `build/`, `.next/`, `out/`
- **Caches:** `.nx/`, `*.tsbuildinfo`
- **IDE state:** `.idea/`, `.vscode/`, `*.swp`
- **OS files:** `.DS_Store`, `Thumbs.db`
- **Secrets:** `.env`, `.env.local`, `.env.*.local`
- **Firebase:** `.firebase/`
- **Pulumi:** `infra/.pulumi/`
- **Expo:** `.expo/`, signing keys, provisioning profiles
- **Test output:** `coverage/`
- **Logs:** `*.log`, `npm-debug.log*`

### Branch Conventions (Planned)

Standard branch naming patterns for features, fixes, and releases. Protected branch rules for `main`.

### Commit Message Conventions (Planned)

Structured commit messages (e.g., Conventional Commits) for automated changelog generation and semantic versioning.

### PR Templates (Planned)

Pull request templates that prompt for description, testing notes, and related issues.

## Dependencies

- Requires: nothing (foundational)
- Enables: RP09 (CI/CD Pipeline) — branch conventions inform CI triggers

## Open Questions

- [ ] Adopt Conventional Commits formally? Enforce via commit-lint?
- [ ] Add PR template (`.github/pull_request_template.md`)?
- [ ] Branch protection rules for `main` — require CI pass, review, etc.?
