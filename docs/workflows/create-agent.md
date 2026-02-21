---
id: "wf-create-agent"
type: workflow
title: "Create a New Agent"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2026-02-21
refs:
  related: [wf-add-feature]
---

# Workflow: Create a New Agent

## When to Use

A new sub-agent is needed because:
- A domain has grown deep enough to warrant a dedicated DRI
- A feature has significant cross-cutting complexity
- Work is being repeatedly routed to a general agent for a specific sub-scope

## Prerequisites

- The scope is clear — what the agent owns and what it doesn't
- The scope doesn't overlap significantly with an existing agent
- Only `meta-agent` can create new agents

## Steps

### Step 1: Determine Agent Type

- **Domain agent** (`.syntropy/system-of-work/domains/<domain>/AGENT.md`): owns a broad domain (product, architecture, UX, integrations)
- **Feature agent** (`.syntropy/system-of-work/domains/product/features/<feature>/AGENT.md`): owns a specific feature's deep specification

### Step 2: Determine Inheritance

- All agents inherit from `.syntropy/system-of-work/domains/system/_base-traits.md`
- Feature agents typically also inherit from their domain agent (e.g., `product-agent`)
- Document the inheritance chain explicitly: `inherits: [_base-traits, parent-agent]`

### Step 3: Create the Manifest File

Create a domain folder under `.syntropy/system-of-work/domains/` and add:

- `AGENT.md` (canonical agent spec; keep thin)
- `CONTEXT.md` (living domain state + load list)
- `POLICY.md` (rules + decision authority)
- `OWNER.md` (DRI + escalation)
- `workflows/` (domain-specific playbooks, as needed)

Create the agent manifest using this structure:

```markdown
---
id: "agent-slug"
type: agent-manifest
title: "Agent Name"
status: active
inherits: [_base-traits, parent-agent]
scope: "Clear, one-line scope description"
authority: domain-dri | feature-dri | advisor
created: YYYY-MM-DD
updated: YYYY-MM-DD
refs:
  related: [related document IDs]
---

# Agent Name

## Identity
Who is this agent? What does it own? One paragraph.

## Inherits
→ list of inherited manifests with what they provide

## Own Context (load in addition to inherited)
### Always — documents always loaded
### On Demand — documents loaded for specific tasks
### Reference — documents consulted occasionally

## Own Rules
Numbered list of domain-specific rules.

## Decision Authority
### Autonomous — what this agent can decide on its own
### Escalate — what requires escalation and to whom

## Delegates To
Other agents this one can delegate work to.

## Delegated From
Which agents route work to this one.
```

### Step 4: Define Context Cache

List every document the agent needs in three tiers:
- **Always**: core documents loaded at the start of any session
- **On Demand**: documents loaded based on the specific task
- **Reference**: documents consulted occasionally for cross-domain checks

### Step 5: Define Decision Boundaries

Be explicit about:
- What the agent can decide autonomously
- What requires escalation and to whom
- The boundary should follow the principle: escalate scope changes up, handle detail changes locally

### Step 6: Update Routing

- Add the new agent to the routing table in `.syntropy/system-of-work/ROUTER.md`
- Update the parent agent's "Delegates To" section

### Step 7: Update Registry

- Add the agent to the Agents table in `docs/_registry.md`

### Step 8: Log the Change

- Add an entry to `docs/_changelog.md`

### Step 9: Regenerate Tool Adapters

If you changed canonical agents under `.syntropy/system-of-work/domains/**`, regenerate and drift-check:

- `cargo run -p syntropy -- agents sync`
- `cargo run -p syntropy -- agents check`

## Validation Checklist

- [ ] Agent manifest exists with complete structure
- [ ] Inheritance chain is explicit and valid
- [ ] Context cache references existing documents
- [ ] Decision authority boundaries are clear
- [ ] Scope doesn't overlap with existing agents
- [ ] Meta-agent routing table is updated
- [ ] Parent agent's "Delegates To" is updated
- [ ] Registry is updated
- [ ] Changelog entry exists

## Executor Notes

Only `meta-agent` can execute this workflow. Humans can request agent creation through `meta-agent`.
