---
id: "f08"
type: feature-spec
title: "Cross-Platform (React Native + Web)"
status: defining
owner: architecture-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  architecture: [arch-offline]
  decided-by: [adr-001, adr-004, adr-005, oq-monorepo-architecture]
  informed-by: [jtbd, stories]
  open-questions: [oq-notification-strategy]
  related: [f01]
  surfaces: [surf-mobile, surf-web]
tags: [platform, mvp, p0]
---

# F08 — Cross-Platform (React Native + Web)

## Summary
Mobile-first design with a full web experience. React Native for iOS and Android with a React web app for desktop, sharing core logic across platforms while adapting UX to each platform's strengths.

## Jobs Addressed
- J1 — Remove Mental Overhead from Daily Life (primary)

## How It Works
- React Native for iOS and Android — optimized for card-swiping, voice capture, and quick actions.
- React web app for desktop — optimized for longer project review, queue management, and bulk actions.
- Shared core logic (state management, API layer, AI interaction) across platforms.
- Platform-specific UX adaptations: swipe gestures on mobile, keyboard shortcuts on web, responsive queue layout.
- Offline-first: cards and actions queue locally and sync when connectivity returns.

## Dependencies
- Requires: Task Card System (F1) as the core interface paradigm that must work across platforms.
- Enables: Cross-platform continuity where users start triaging on mobile and continue on desktop with the same queue state.

## Open Questions
- [ ] What is the shared code percentage target between React Native and React web?
- [ ] How do we handle platform-specific features (e.g., haptic feedback on iOS, notification channels on Android)?
- [ ] What is the offline sync conflict resolution strategy for concurrent edits across devices?
- [ ] Should we use Expo for React Native or bare workflow?
- [ ] What is the minimum supported OS version for each platform?
