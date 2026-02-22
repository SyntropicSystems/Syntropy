---
id: "manifesto"
type: vision
title: "Core Philosophy"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2026-02-22
refs:
  enables: [jtbd, principles]
  related: [glossary, arch-agent-architecture]
tags: [vision, foundation]
---

# Core Philosophy

> **Vision:** A self-learning, human-AI collaborative system that removes mental overhead from life by automating personal and professional task management through intelligent agents, event sourcing, and continuous personalization.

> **Platforms:** React Native (iOS/Android) + Web (React)

Syntropy OS (working name: TaskCard) is built on four pillars:

## Heterogeneous Agent Architecture

All participants in the system — humans, AI models, and hardcoded programs — are Agents: first-class citizens sharing equal systemic privileges. Everything in the system exists within an **Entity Hierarchy** (Entity → Material → Artifact → Instrument → Actor), and every agent is described by a **22-Term Agent Ontology** organized in five systems — Philosophy & Drive, Constraints, Anatomy, Mind, and Execution Loop. Every term describes **function and purpose**, never implementation. A junior designer and a senior engineer use the same words to describe why any actor behaved the way it did.

Agents are classified not by what they are, but by their Decision Profile: **Organic Agents** (humans) provide authority and judgment, **Probabilistic Agents** (AI) provide adaptability and interpretation, **Deterministic Agents** (code) provide reliability and speed. Agents use Instruments (activated Artifacts) to change the State of the world and achieve their Mission. This taxonomy provides the shared vocabulary for every product, architecture, and process decision. See the [Heterogeneous Agent Architecture](../architecture/agent-architecture.md) specification.

## Human-AI Collaboration

AI acts as a personal assistant, project manager, and domain-specific agent. Where confidence is high, it acts autonomously. Where confidence is low, it hands off to the human for confirmation or input. The human can always override, correct, and train the system. The Boundary of Trust formalizes this: Probabilistic Agents are trusted with interpretation but never absolute state changes without Deterministic validation; Organic Agents hold ultimate authority.

## Event Sourcing & Transparency

Every action (human or AI) is event-sourced with a full audit trail. This creates a complete ledger that enables learning, accountability, and trust. Nothing is a black box.

## Continuous Evolution

The system learns from every interaction, refines its models, adapts to user patterns, and evolves over time. It is trainable, correctable, and personalizable.
