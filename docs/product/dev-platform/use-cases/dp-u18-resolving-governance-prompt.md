---
id: "dp-u18"
type: use-case
title: "Resolving a Governance Prompt"
status: exploring
owner: meta-agent
created: 2026-02-14
updated: 2026-02-14
refs:
  depends-on: [dp15, dp13]
  related: [dp-u17, dp-u16, dp-u12]
tags: [dev-platform, shadow-navigator, prompts, decisions]
---

# DP-U18 — Resolving a Governance Prompt

## Scenario

The Shadow Navigator encounters a drift it cannot resolve automatically — it needs a human decision. Instead of dumping a report or blocking, it surfaces one crisp, focused prompt with choices and consequences.

### Steps

1. Developer adds a new endpoint that changes the shape of an existing API response.
2. The Shadow Navigator detects this diverges from the current API spec.
3. The system cannot auto-determine whether this is a breaking change (requires client updates) or a non-breaking addition (backward compatible).
4. HUD shows yellow: "1 prompt needed."
5. Developer opens the Inbox. They see a single prompt:
   - **Question**: "Is the change to `/api/users` response a breaking change or a non-breaking addition?"
   - **Option A**: "Breaking change" — consequence: "Will trigger API versioning workflow. Client migration spec will be generated."
   - **Option B**: "Non-breaking addition" — consequence: "Spec will be updated. No versioning needed. Backward compatibility check will run."
6. Developer selects "Non-breaking addition."
7. The system generates a follow-up patch: "Update API spec with new field, mark as backward-compatible addition."
8. Developer applies the patch.
9. HUD turns green.

### Outcome

The developer made a governance decision in 30 seconds. They didn't read any documents. The system gave them exactly the context they needed — the question, the options, and the consequences — in a decision-shaped format. The answer triggered automatic follow-up actions.

## Features Exercised

- DP15 — Shadow Navigator (primary — prompt generation, focused decisions, follow-up patch generation)
- DP13 — Decision Records (the API versioning decision that governs this)
- DP09 — Domain Context Sync (domain-specific rules about breaking changes)
- DP03 — Workflow Engine (follow-up workflows triggered by the answer)

## Acceptance Criteria

- [ ] Prompts are rare — the system resolves most drift automatically
- [ ] Each prompt is a single, crisp question with concrete choices
- [ ] Each choice shows its consequences in one sentence
- [ ] Prompts never require reading large documents — they link to minimal relevant sources
- [ ] Answering a prompt triggers follow-up patches or workflows automatically
- [ ] Developer can skip a prompt ("decide later") without the system nagging repeatedly
- [ ] Prompts are prioritized — the most important one surfaces first
