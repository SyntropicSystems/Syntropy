---
id: "surf-dev-platform"
type: surface
title: "Development Platform"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [meta-agent, base-traits]
tags: [surface, development, methodology, meta]
---

# Development Platform Surface

This knowledge graph system itself is a surface of Syntropy OS — it's the methodology and tooling used to build the product. The development platform is where specs, decisions, workflows, and agent configurations live.

## What This Surface Is

- A git repository containing markdown files organized as a knowledge graph
- An agent system based on trait composition for domain-specific expertise
- Executable workflows that serve as single source of truth for processes
- A registry and changelog for graph integrity and traceability

## Core Pattern: Entry Point → Router → Graph

Every scope follows the same pattern:
1. **Entry point** reads an entry file (CLAUDE.md, agent manifest)
2. **Router** sections point to relevant context, rules, and workflows
3. **Graph** nodes are individual source-of-truth files connected by cross-references

## How This Surface Grows

The development platform scales by emergence:
- **New feature** → add a feature spec file + update registry + wire refs
- **New decision** → add an ADR + update affected docs
- **New domain depth** → create a feature agent with its own context/rules
- **New process** → add a workflow document

The structure never needs reorganization. Growth means adding nodes and edges, not restructuring.

## Consumers of This Surface

| Consumer | How They Use It |
|----------|----------------|
| Humans | Read markdown files, follow workflows, navigate via registry |
| AI agents (Claude) | Load CLAUDE.md, follow agent manifests, execute workflows |
| Future tooling | Parse frontmatter YAML for graph visualization, validation, automation |

## Principles

1. **Low entropy** — clear place for everything, minimal ambiguity
2. **Explicit over implicit** — if it's not written down, it doesn't exist
3. **Single source of truth** — one file per concept, cross-reference everything else
4. **Equally executable** — same docs work for humans reading and AI agents following
5. **Trait composition** — agents inherit shared foundations, compose domain-specific capabilities
