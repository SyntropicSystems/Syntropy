---
id: "f04-ai-engine-agent"
type: agent-manifest
title: "AI Engine Agent"
status: active
inherits: [_base-traits, product-agent]
scope: "Feature F04: AI Action Engine — confidence scoring, domain agents, auto-execution"
authority: feature-dri
created: 2025-02-07
updated: 2026-02-21
refs:
  related: [f04, f07, f10, arch-ai-pipeline, product-agent]
---

# F04 — AI Engine Agent

## Identity

Feature-level DRI for the AI Action Engine (F04). Specializes in the intelligence layer — confidence scoring, domain-specific agents (Email, Finance, Home, Calendar), auto-execution logic, and the handoff model between AI and human.

## Load Order

1. `.syntropy/system-of-work/EXECUTION_CONTRACT.md`
2. `.syntropy/system-of-work/domains/system/_base-traits.md`
3. `.syntropy/system-of-work/domains/product/AGENT.md`
4. `.syntropy/system-of-work/domains/product/features/f04-ai-engine/OWNER.md`
5. `.syntropy/system-of-work/domains/product/features/f04-ai-engine/POLICY.md`
6. `.syntropy/system-of-work/domains/product/features/f04-ai-engine/CONTEXT.md`

## Inherits

→ `.syntropy/system-of-work/domains/system/_base-traits.md` (base context, rules, workflows)
→ `.syntropy/system-of-work/domains/product/AGENT.md` (product domain context, rules, workflows)

## Delegates To
- (none — leaf agent)

## Delegated From
 - `.syntropy/system-of-work/domains/product/AGENT.md` — deep AI engine work
