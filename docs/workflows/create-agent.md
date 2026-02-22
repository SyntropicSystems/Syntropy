---
id: "wf-create-agent"
type: workflow
title: "Create a New Agent"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [wf-add-feature, arch-agent-architecture, dp02]
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

- **Domain agent** (`agents/*.md`): owns a broad domain (product, architecture, UX, integrations)
- **Feature agent** (`agents/feature-agents/fNN-*.md`): owns a specific feature's deep specification

### Step 2: Determine Inheritance

- All agents inherit from `agents/_base-traits.md`
- Feature agents typically also inherit from their domain agent (e.g., `product-agent`)
- Document the inheritance chain explicitly: `inherits: [_base-traits, parent-agent]`

### Step 3: Create the Manifest File

Create the agent manifest using this structure. Each section maps to a term from the [22-Term Agent Ontology](../architecture/agent-architecture.md#the-22-term-agent-ontology) — the manifest is an Artifact that defines how the ontology fills in for this specific dev platform agent:

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
### Always — documents always loaded          ← populates Memory (#14)
### On Demand — documents loaded for specific tasks  ← extends Memory per-task
### Reference — documents consulted occasionally     ← Artifacts available as Memory

## Own Rules                                        ← defines Policies (#5) + Rules (#8)
Numbered list of domain-specific rules.

## Own Workflows                                    ← defines Workflows (#17) + Skills (#18)
Processes this agent can execute.

## Decision Authority                               ← defines Permissions (#9)
### Autonomous — what this agent has Permission for
### Escalate — what requires escalation (Protocol)

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

- Add the new agent to the routing table in `agents/meta-agent.md`
- Update the parent agent's "Delegates To" section

### Step 7: Update Registry

- Add the agent to the Agents table in `docs/_registry.md`

### Step 8: Log the Change

- Add an entry to `docs/_changelog.md`

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
