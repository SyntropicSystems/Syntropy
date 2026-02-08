---
id: "arch-integrations"
type: architecture
title: "Integration Roadmap"
status: defining
owner: integration-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  related: [f03]
  enables: []
tags: [architecture, integrations, roadmap]
---

# Integration Roadmap

## Overview

Syntropy OS becomes more powerful as it connects to more data sources. Each integration turns an external service into a source of task cards, context, and actionable intelligence. The roadmap is phased to prioritize high-value, high-frequency integrations first.

## Phases

| Phase | Integration | What It Enables |
|-------|------------|----------------|
| **Phase 1** | Gmail / Google Workspace | Email -> cards, reply, archive, project creation. This is the primary integration and daily driver. Every email becomes a task card with intelligent action suggestions. OAuth connection via Firebase Auth. |
| **Phase 2** | Google Calendar | Schedule-aware prioritization, meeting prep cards. The AI can factor in calendar context when prioritizing the queue -- e.g., prep tasks surface before meetings. Calendar events can generate cards. |
| **Phase 3** | Slack / Teams | Messages -> cards, channel monitoring, auto-responses. Important messages from monitored channels become task cards. The AI can draft responses and flag items needing attention. |
| **Phase 4** | GitHub / Linear | Issues -> cards, PR reviews, deployment tasks. Development workflow items become task cards. PR review requests, assigned issues, and deployment notifications surface in the queue. |
| **Phase 5** | Financial (Plaid, etc.) | Bills -> cards, budget tracking, payment reminders. Financial transactions and bills become task cards. The Finance Agent understands invoices, subscriptions, and payment patterns. |
| **Phase 6** | Home / IoT | Maintenance reminders, smart home actions. Home device notifications and maintenance schedules become task cards. Integration with smart home platforms for contextual actions. |

## Integration Architecture

Each integration follows a common pattern:

1. **OAuth connection** -- user authorizes the integration via OAuth flow. Tokens stored encrypted in `users/{uid}/integrations/{integrationId}`.
2. **Sync** -- Cloud Function polls or receives webhooks from the external service. New items are ingested as events.
3. **Card creation** -- ingested items are processed by the AI pipeline and become task cards with contextual actions.
4. **Action execution** -- when the user takes an action on a card (reply, archive, close issue, etc.), a Cloud Function executes the action against the external service's API using the stored OAuth token.
5. **Bidirectional sync** -- changes in the external service update the corresponding card; actions on cards propagate back to the external service.

## Phase 1 Detail: Gmail / Google Workspace

Phase 1 is the most detailed because it is the first and primary integration:

- OAuth connection to Gmail/Google Workspace via Firebase Auth Google sign-in
- Each email becomes a task card with metadata: sender, subject, snippet, thread context, attachments
- Standard actions: Reply, Archive, Snooze, Delete, Mark Read, Unsubscribe
- AI generates contextual actions based on email content (e.g., "Create project from this thread," "Schedule meeting with sender," "Forward to [person]")
- Email threads are linked -- replying to one card in a thread can update related cards
- Cards derived from email preserve the source reference and can link back to the original in Gmail
- Email attachments are auto-processed through the Artifact Intelligence pipeline (F12)
- Emails can be auto-routed to a Space based on sender, subject, or AI classification
