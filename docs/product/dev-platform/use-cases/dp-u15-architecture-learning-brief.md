---
id: "dp-u15"
type: use-case
title: "Creating a Learning Brief for Architecture Comprehension"
status: defining
owner: cognitive-engineering-agent
created: 2025-02-13
updated: 2025-02-13
refs:
  depends-on: [dp14]
  related: [dp-u02, dp02, dp09]
tags: [dev-platform, cognitive-engineering, learning, architecture, onboarding]
---

# Use Case: Creating a Learning Brief for Architecture Comprehension

## Scenario

A contributor (human or agent) needs to understand a subsystem they haven't worked in before — the event sourcing layer, the AI pipeline, or a specific domain's data model. Rather than reading every file and reverse-engineering the mental model, they need a structured learning brief that efficiently builds comprehension.

## Actors

- **Producer**: The domain DRI (agent or human) who knows the subsystem and needs to explain it
- **Cognitive Engineering Agent**: Provides the methodology for structuring the learning brief
- **Learner**: The contributor who needs to understand the subsystem

## Preconditions

- The subsystem exists and has been documented (feature specs, architecture docs, ADRs)
- The learner has a specific reason to understand the subsystem (assigned work, review, debugging)

## Flow

1. Producer consults cognitive-engineering-agent: "I need to help someone understand the event sourcing layer"
2. Cognitive-engineering-agent provides the learning brief template and asks clarifying questions:
   - What's the learner's current context? What do they already know?
   - Why do they need to understand this? (Review vs. implementation vs. debugging)
   - How deep do they need to go?
3. Producer structures the learning brief:
   - **Context frame**: Where event sourcing fits in Syntropy's architecture and why it exists
   - **Mental model**: The key concepts (events, projections, replay, snapshots) and how they relate
   - **Critical paths**: The event flow from write → store → project → read — the essential "shape"
   - **Common misconceptions**: "Events are just logs" (no — they're the source of truth); "Projections are caches" (no — they're materialized views)
   - **Exploration guide**: Read ADR-002 first, then the event-sourcing arch doc, then the data model
4. Learner uses the brief and provides feedback:
   - "The mental model section was exactly what I needed"
   - "I got confused at the projection step — needed an example"
5. Cognitive-engineering-agent evolves the learning brief template based on feedback

## Postconditions

- The learner has a coherent mental model of the subsystem
- The learner knows where to go deeper and in what order
- The learner can begin productive work in the subsystem
- Feedback is captured for methodology improvement

## Key Quality: Mental Model First

The brief builds the learner's mental model before exposing detail. A learner with the right mental model can figure out details from the code. A learner buried in details without a mental model can read every file and still not understand the system.
