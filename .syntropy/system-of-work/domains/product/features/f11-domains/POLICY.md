# F11 Domains/Spaces — Policy

Follow the Product domain policy.

## Rules

1. Spaces are permanent — they never "complete" or "end" (unlike projects).
2. The naming hierarchy is: Space → Project → Task/Card (not interchangeable).
3. Info tab is a structured knowledge base (category → key-value), not free-form notes.
4. Cross-space awareness: AI should surface connections between spaces when relevant.
5. Every entity (project, task, artifact) can belong to a space, but space-less entities are valid.

## Decision Authority

### Autonomous

- Space content structure and info organization
- Space navigation flow and tab design
- Auto-routing rules and classification logic
- Cross-space connection surfacing

### Escalate

- Changes to the Space ↔ Project ↔ Task hierarchy → `.syntropy/system-of-work/domains/product/AGENT.md`
- Multi-user space sharing → `.syntropy/system-of-work/domains/product/AGENT.md` (via `oq-multi-user`)
- Data model changes for spaces → `.syntropy/system-of-work/domains/architecture/AGENT.md`
