---
id: "ux-spaces-nav"
type: ux-pattern
title: "Spaces Navigation"
status: defining
owner: ux-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f11]
  related: [ux-artifact-flow]
tags: [ux, spaces, navigation, tabs]
---

# Spaces Navigation

- **Spaces List:** Top-level screen. Cards with icon, name, description, active project count, last activity. Staggered entrance animation.
- **Space Detail:** Tabbed view (Overview, Info, Projects, Artifacts, History). Back button returns to list.
- **Overview Tab:** Dashboard layout — active cards section (with "Open in Card Queue →"), active projects with progress bars, quick info preview (first 2 categories, 3 items each), recent activity (last 4 events).
- **Info Tab:** Searchable knowledge base. Categories as section headers. Key-value pairs in alternating row styling. Matching results highlighted with gold border when searching. Add entry button at bottom.
- **Projects Tab:** Active projects first, completed below (dimmed). Each shows: icon, title, budget, deadline, progress bar, task counts, blocked count.
- **Artifacts Tab:** 2-column grid of artifact chips. Each shows: type icon, title, source icon, date, tags. Shows link count badge (e.g., "linked to 2 projects"). Searchable.
- **History Tab:** Vertical timeline with dot indicators. Each event shows: actor (You in white, AI in gold), action, detail, timestamp, type badge (color-coded). Filterable by type.
- **Navigation Flow:** Spaces → Space Detail → Project → Card Queue (filtered). Breadcrumb trail maintained.
