---
id: "wp-u07"
type: use-case
title: "Agent Hydrating Workspace Context"
status: defining
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  depends-on: [wp01, wp07]
  related: [wp-u03, dp-u02]
tags: [workspace-platform, use-case, agents, hydration]
---

# WP-U07 — Agent Hydrating Workspace Context

## Scenario

An AI agent (or MCP tool) needs to understand the workspace before it can help with a task — what services exist, how they're organized, whether the workspace is currently valid. Instead of scanning directories or parsing config files, it calls `syntropy state --json` and gets a structured workspace state.

### Steps

1. Agent receives a task that requires workspace understanding (e.g., "add error handling to the payments service")
2. Agent calls `syntropy state --json` via CLI or MCP tool
3. The workspace state is returned as a structured `WorkspaceState` JSON object
4. Agent reads the state to understand:
   - What products exist and their components
   - Where the payments service lives
   - What platform crates are available
   - Whether the workspace is currently valid
5. Agent uses this context to make informed decisions about where to make changes
6. If the agent needs to make structural changes, it uses `syntropy plan` to preview them
7. Agent's proposed changes go through the same plan/apply review cycle

### Outcome

- Agent understands the workspace structure without parsing files
- Agent's mental model matches the actual workspace state
- Agent proposes changes that are structurally correct
- No "hallucinated" file paths or conventions — the state is the source of truth
- Agent's structural changes are reviewable through plan/apply

## Features Exercised

- WP01 — Workspace Contract (agent reads the contract through state)
- WP07 — Workspace State & Hydration (agent consumes structured state)

## Acceptance Criteria

- [ ] `syntropy state --json` returns valid JSON matching the `WorkspaceState` schema
- [ ] State includes all declared products, services, crates, and adapters
- [ ] State includes current validation status
- [ ] Agent can determine file paths for any component from the state alone
- [ ] State is fast enough to call at the start of every agent task
- [ ] MCP tool wrapper provides the same state to MCP-connected agents
