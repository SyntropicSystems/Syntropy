---
id: "dp03"
type: feature-spec
title: "Workflow Engine"
status: defining
owner: meta-agent
priority: P0
created: 2025-02-09
updated: 2025-02-09
refs:
  depends-on: [dp01, dp02]
  enables: [dp-u01, dp-u03, dp-u05, dp-u07, dp-u08, dp-u10, dp-u16, dp09, dp10, dp11, dp12, dp15]
  informed-by: [jtbd-dev-platform]
  related: [dp-stories, dp-u17, dp04, dp05, dp13, dp14, operational-engineering-agent, surf-dev-platform]
tags: [dev-platform, core, workflows, p0]
---

# DP03 — Workflow Engine

## Summary

Executable process documents that serve as the single source of truth for how work gets done. Each workflow is a markdown file with trigger conditions, prerequisites, step-by-step instructions, and a validation checklist. The same document works whether a human reads it or an AI agent follows it.

## Jobs Addressed

- DJ2 — Enable Humans and AI Agents to Execute the Same Processes (primary)
- DJ5 — Reduce Friction When Adding, Finding, or Changing Product Specs (secondary)

## How It Works

### Workflow Structure

Every workflow document follows a consistent template:
1. **When to Use** — trigger conditions that tell you this is the right workflow
2. **Prerequisites** — what must be true before starting
3. **Steps** — numbered, sequential instructions with clear inputs and outputs
4. **Validation Checklist** — items to verify after completion
5. **Executor Notes** — who or what can run this workflow

### Current Workflows

| ID | Workflow | Trigger |
|----|----------|---------|
| wf-add-feature | Add a New Feature Spec | New feature needs formal specification |
| wf-make-decision | Make an Architecture Decision | Design choice needs to be recorded |
| wf-refine-story | Refine a User Story | Story needs to go from draft to specified |
| wf-create-agent | Create a New Agent | Domain needs dedicated agent ownership |
| wf-resolve-question | Resolve an Open Question | Open question has enough exploration to decide |
| wf-decompose-spec | Decompose a Spec Document | Monolith document needs to become graph nodes |

### Execution Model

- Workflows are deterministic — following the same steps produces the same structural outcome
- Each step modifies the knowledge graph (creates files, updates refs, logs changes)
- The validation checklist acts as a "test suite" for the workflow's output
- Workflows can be composed — e.g., add-feature may trigger create-agent

## Dependencies

- Requires: DP01 (Knowledge Graph) — workflows create and modify graph nodes; DP02 (Agent System) — agents execute workflows
- Enables: All use cases that involve structured process execution

## Open Questions

- [ ] Should workflows support branching/conditional paths, or stay strictly linear?
- [ ] Should we add a "rollback" mechanism for partially completed workflows?
- [ ] How do we version workflows when the process changes?
