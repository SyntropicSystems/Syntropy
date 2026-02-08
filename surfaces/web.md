---
id: "surf-web"
type: surface
title: "Web Surface (Desktop)"
status: defining
owner: ux-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f08]
  related: [surf-mobile]
tags: [surface, web, react, desktop]
---

# Web Surface (Desktop)

React (Vite) web application for desktop browsers. The primary surface for longer sessions, project review, and bulk actions.

## Platform Constraints

- Keyboard + mouse interaction
- Large screen (responsive down to tablet width)
- Always-online (graceful offline with service worker)
- Drag-and-drop for file uploads and card reordering
- Browser notifications (Web Push API)

## Surface-Specific UX Adaptations

- **Card Queue**: Keyboard shortcuts for card actions (j/k to navigate, a to archive, r to reply)
- **Bulk Actions**: Multi-select cards for batch operations (not available on mobile)
- **Spaces**: Sidebar navigation with space list always visible
- **Artifacts**: Drag-and-drop upload zone, larger preview area
- **Epic View**: Split-pane layout — dependency graph on left, active card on right
- **Audit Trail**: Full-width timeline with filtering sidebar

## Key Differences from Mobile

- Keyboard shortcuts for power users
- Multi-select and bulk operations
- Side panels and split-pane layouts
- Larger artifact previews and inline document viewing
- Animations use Framer Motion (vs React Native Reanimated on mobile)
