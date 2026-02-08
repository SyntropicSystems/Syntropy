---
id: "f03"
type: feature-spec
title: "Gmail / Google Workspace Integration"
status: defining
owner: integration-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f01, f04]
  enables: [u01, u03, u07]
  related: [f11, f12]
  informed-by: [jtbd, stories]
  architecture: [arch-integrations]
  open-questions: [oq-privacy-model]
tags: [integration, mvp, email, p0]
---

# F03 — Gmail / Google Workspace Integration

## Summary

The first and primary integration. Connect Gmail so every email becomes a task card with intelligent action suggestions.

## Jobs Addressed

- J1 — Remove Mental Overhead from Daily Life (primary)
- J2 — Never Lose Track of Commitments (primary)
- J3 — Automate Myself Where Possible (secondary)

## How It Works

- OAuth connection to Gmail/Google Workspace.
- Each email becomes a task card with metadata: sender, subject, snippet, thread context, attachments.
- Standard actions are always available: Reply, Archive, Snooze, Delete, Mark Read, Unsubscribe.
- AI generates additional contextual actions based on email content (e.g., "Create project from this thread," "Schedule meeting with sender," "Forward to [person]").
- Email threads are linked — replying to one card in a thread can update related cards.
- Cards derived from email preserve the source reference and can link back to the original in Gmail.

### Email-to-Project Workflow

- From any email card, the user can create a project/epic.
- The email becomes the root context for the project.
- AI can suggest sub-tasks based on the email content.
- Future emails in the same thread auto-link to the project.
- Actions taken on the project propagate context back to email (e.g., "Draft reply with project status update").

## Dependencies

- Requires: F01 (Task Card System) — emails become cards in the queue; F04 (AI Action Engine) — contextual action suggestions on email cards
- Enables: U01 (Email Triage), U03 (AI Auto-Managing Inbox), U07 (AI Auto-Filing into Spaces)

## Open Questions

- [ ] How should OAuth token refresh and expiry be handled transparently?
- [ ] What is the sync strategy for large inboxes on initial connection (full history vs. recent-only)?
- [ ] How should draft replies created in TaskCard sync back to Gmail drafts?
- [ ] What happens when an email is actioned both in TaskCard and directly in Gmail?
