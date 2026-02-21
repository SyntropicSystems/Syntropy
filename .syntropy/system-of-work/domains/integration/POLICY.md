# Integration Domain Policy

## Invariants

- External API boundaries must be explicit and versioned.

## Rules

1. Every integration must define: auth flow, data model mapping, sync strategy, error handling.
2. OAuth tokens are stored encrypted, decrypted only by Cloud Functions at execution time.
3. Integration failures must degrade gracefully — the system works without any integration.
4. Each integration phase is independent — phase N doesn't require phase N-1.

## Workflows

- Integration specification follows the feature-spec workflow with additional sections for auth, sync, and data mapping.
- Base workflows apply (see `.syntropy/system-of-work/domains/system/_base-traits.md`).

## Decision Authority

### Autonomous

- Integration specification content and structure
- OAuth flow design within existing patterns
- Data mapping between external APIs and Firestore
- Sync strategy (push vs pull, frequency, conflict resolution)

### Escalate

- New integration additions to the roadmap → `.syntropy/system-of-work/domains/product/AGENT.md` / human
- Security model changes for token storage → `.syntropy/system-of-work/domains/architecture/AGENT.md`
- Privacy implications of reading external data → `.syntropy/system-of-work/domains/architecture/AGENT.md` (via `oq-privacy-model`)
