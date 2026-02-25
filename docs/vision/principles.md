---
id: "principles"
type: vision
title: "Design Principles"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2026-02-25
refs:
  depends-on: [manifesto]
  related: [coherence-engine, el-anti-patterns, experience-layer, glossary, jtbd, jtbd-dev-platform, jtbd-repo-platform, jtbd-workspace-platform, personality-layer, pl-design-pillars, pl-governance]
tags: [vision, principles, foundation]
---

# Design Principles

Derived from the core philosophy. These principles guide every product and technical decision.

## 1. One Card at a Time

Reduce cognitive load by presenting one actionable item at a time. The queue provides context (what's ahead, what's done), but the focus is always on the current card. Depth on demand, not depth by default.

## 2. Confidence-Based Handoff

AI and human operate on a spectrum, not a binary. High confidence = autonomous action. Low confidence = human judgment. The boundary is user-configurable and shifts over time as trust builds. Never force either extreme.

## 3. Capture Once, Organize Everywhere

The user's job is to get information into the system. The system's job is to extract meaning, identify structure, and file it correctly. Manual data entry is a failure mode. Many-to-many linking means information lives wherever it's relevant.

## 4. Permanent Domains, Temporary Projects

Life areas (home, career, finances) are persistent contexts that outlive any individual project. Projects end; domains don't. This distinction prevents the system from losing context when a project completes.

## 5. Event-Sourced Everything

Every action is an immutable event. State is derived, not stored. This enables: full audit trails, AI learning from history, undo/replay, accountability, and trust. If it happened, there's a record.

## 6. Transparency Over Magic

AI actions are always explainable. Confidence scores are visible. The audit trail shows exactly what happened and why. Users can inspect, correct, and train. The system earns trust through visibility, not by hiding complexity.

## 7. Progressive Autonomy

Start manual, graduate to autonomous. The system begins in training mode (suggest only) and earns autonomy through demonstrated accuracy. Trust ratchets up organically. Users are never forced to trust before they're ready.

## 8. Platform Parity, Surface Adaptation

Core logic is shared across platforms. UX adapts to each surface (swipe on mobile, keyboard on web). Users can switch surfaces mid-workflow without losing state. The queue is the queue, regardless of where you access it.

## 9. Dependencies as First-Class Citizens

Task relationships (blocking, enabling, follow-up) are explicit in the data model. The system understands sequencing — completing a task unlocks the next one. This prevents the common failure of flat task lists that ignore ordering.

## 10. Corrections as Training Data

Every time a user edits an AI suggestion, rejects a recommendation, or reclassifies an item, that's a training signal. The system doesn't just accept corrections — it learns from them. Disagreement makes the system smarter.
