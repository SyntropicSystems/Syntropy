---
id: "rp-u06"
type: use-case
title: "Opening the Project in GitHub Codespaces"
status: defining
owner: architecture-agent
created: 2025-02-09
updated: 2026-02-24
refs:
  depends-on: [rp05]
  related: [rp-u01]
tags: [repo-platform, use-case, codespaces]
---

# RP-U06 — Opening the Project in GitHub Codespaces

## Scenario

A contributor wants to work on the project from a machine without Docker or a local dev setup — perhaps a borrowed laptop, a tablet, or simply preferring cloud-based development. They use GitHub Codespaces to get a fully configured environment in the browser.

### Steps

1. Navigate to the repository on GitHub
2. Click "Code" → "Codespaces" → "Create codespace on main"
3. GitHub provisions a VM and builds the devcontainer image
4. The `postCreateCommand` runs `cargo run -p syntropy -- check`
5. VS Code opens in the browser (or connects from local VS Code)
6. All extensions and settings are pre-configured
7. Start developing — the experience is identical to local devcontainer

### Outcome

- Full development environment available from any browser
- Same devcontainer configuration as local development — zero drift
- No local Docker installation required

## Features Exercised

- RP05 — Development Container (devcontainer.json, Dockerfile)

## Acceptance Criteria

- [ ] Codespace builds successfully from the `.devcontainer/` configuration
- [ ] `cargo run -p syntropy -- check` completes inside the Codespace
- [ ] VS Code extensions are automatically installed
- [ ] Codespace startup time is under 3 minutes (with pre-built image)
