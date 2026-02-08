---
id: "f01"
type: feature-spec
title: "Task Card System"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f06]
  enables: [u01, u02, u03, u04, u05]
  related: [f02, f03, f05, f08, f09, f10, f11]
  informed-by: [jtbd, stories]
  ux-patterns: [ux-card-queue, ux-epic-drill-down]
  architecture: [arch-data-model]
  open-questions: [oq-notification-strategy]
tags: [core, mvp, queue, p0]
---

# F01 — Task Card System

## Summary

The primary interface paradigm. Every actionable item is a "card" presented one at a time. Users work through cards sequentially, taking actions on each before moving to the next.

## Jobs Addressed

- J1 — Remove Mental Overhead from Daily Life (primary)
- J2 — Never Lose Track of Commitments (secondary)

## How It Works

- Cards are the atomic unit of the system. Everything becomes a card: emails, notes, AI-generated tasks, manual tasks, follow-ups.
- Each card shows: title, source, context/snippet, available actions, AI suggestion (with confidence), epic/project link, dependency status.
- Cards can be swiped or actioned via buttons (Reply, Archive, Approve, Delegate, Snooze, Create Project, etc.).
- Actions are contextual — different card sources surface different action sets.
- After completing a card's action, the system auto-advances to the next card.

### Card-by-Card Queue UX

- The main view shows one active card prominently in the center of the screen.
- A horizontal scrollable queue appears at the bottom of the screen showing all cards as compact chips.
- The currently active card is always centered/highlighted in the bottom queue.
- Completed cards remain in the queue (visually marked as done with checkmark, muted styling, strikethrough) so the user can review what they've processed.
- Tapping any card in the queue navigates to it (unless it's already completed — then it shows a read-only summary or allows re-opening).
- When a card is completed, the view animates (card slides out) and the next uncompleted card slides in.
- The queue scrolls to keep the active card centered.

### Queue Navigation

- Users can freely jump between cards by tapping the queue chips.
- A progress indicator (X/Y completed + progress ring) is always visible in the top bar.
- Blocked cards (those with unresolved dependencies) show a "blocked" indicator and cannot have their primary action taken until dependencies clear.

## Dependencies

- Requires: F06 (Event Sourcing & Audit Trail) — all card actions are event-sourced
- Enables: U01 (Email Triage), U03 (AI Auto-Managing Inbox), U04 (Project Overview & Epic Drill-Down), U05 (End-of-Day Review)

## Open Questions

- [ ] What is the maximum queue depth before performance degrades?
- [ ] How should card priority ordering interact with manual reordering?
- [ ] Should completed cards be auto-purged from the queue after a configurable time, or persist indefinitely?
