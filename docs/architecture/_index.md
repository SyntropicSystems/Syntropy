---
id: "arch-index"
type: reference
title: "Architecture Domain"
status: active
owner: architecture-agent
created: 2025-02-07
updated: 2025-02-07
---

# Architecture Domain

Technical architecture for Syntropy OS. This domain covers how we're building it.

## Components
- **Stack**: Technology choices and rationale → `stack.md`
- **Data Model**: Firestore collections, entity relationships → `data-model.md`
- **Event Sourcing**: Append-only event log on Firestore → `event-sourcing.md`
- **AI Pipeline**: LLM orchestration, domain agents → `ai-pipeline.md`
- **Offline Strategy**: Offline-first approach, sync, conflicts → `offline-strategy.md`
- **Security**: Auth, security rules, data isolation → `security.md`
- **Integrations**: Integration roadmap (phases 1-6) → `integrations.md`

## Key Decisions
- ADR-001: Firebase as Backend Platform → `../decisions/adr-001-firebase-backend.md`
- ADR-002: Event Sourcing on Firestore → `../decisions/adr-002-event-sourcing-firestore.md`
- ADR-003: Claude as Primary LLM → `../decisions/adr-003-claude-primary-llm.md`
