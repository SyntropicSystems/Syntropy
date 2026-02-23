---
id: "surf-mobile"
type: surface
title: "Mobile Surface (iOS/Android)"
status: defining
owner: ux-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f08]
  related: [dp06, surf-web]
tags: [surface, mobile, react-native]
---

# Mobile Surface (iOS/Android)

React Native (Expo) application for iOS and Android. The primary surface for on-the-go usage.

## Platform Constraints

- Touch-first interaction (no keyboard shortcuts)
- Variable screen sizes (phone and tablet)
- Offline-capable (Firestore offline persistence)
- Background sync when connectivity returns
- Push notifications (FCM)
- Camera and microphone access for Quick Capture (F05) and Artifact Intelligence (F12)

## Surface-Specific UX Adaptations

- **Card Queue**: Swipe gestures for card actions (left = archive, right = approve)
- **Quick Capture**: Prominent floating action button for voice, photo, text capture
- **Spaces**: Tab bar navigation with quick-switch between spaces
- **Artifacts**: Camera integration for photo capture, share sheet for receiving files from other apps

## Key Differences from Web

- Swipe gestures replace button clicks for common actions
- Voice capture is a primary input method (tap-to-record)
- Queue is always single-card view (no side panels)
- Animations use React Native Reanimated (vs Framer Motion on web)
