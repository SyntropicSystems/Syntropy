# Integration Domain Context

## Always Load

- `docs/architecture/integrations.md`
- `docs/product/features/f03-gmail-integration.md`

## On Demand

- `docs/architecture/ai-pipeline.md`
- `docs/architecture/security.md`
- `docs/architecture/data-model.md`

## Reference

- `docs/open-questions/oq-privacy-model.md`
- `docs/product/features/f04-ai-action-engine.md`

## Domain State

### Current Focus

- Gmail/Google Workspace is the first integration (F03, phase 1)
- Integration roadmap defined with phased approach
- Auth, data mapping, sync strategy, and error handling patterns being established

### Key Decisions in Effect

- OAuth tokens stored encrypted, decrypted only by Cloud Functions
- Integration failures degrade gracefully — system works without any integration
- Each integration phase is independent

### Invariants

- Every integration defines: auth flow, data model mapping, sync strategy, error handling
- No integration is required for core functionality
- Token security follows encryption-at-rest pattern
- Integration data maps cleanly to Firestore data model

### Open Threads

- Privacy model for AI reading external data (oq-privacy-model) — directly affects Gmail integration
- Sync strategy details for Gmail (push via webhooks vs pull via polling)

### Cross-Domain Dependencies

- Integration specs depend on security architecture (architecture → integration)
- Integration data flows into AI pipeline (integration → architecture)
- Product features define what integrations need to provide (product → integration)
- Privacy decisions constrain what data integrations can access

### Last Synced

2025-02-09
