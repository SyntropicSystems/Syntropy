---
id: "u07"
type: use-case
title: "AI Auto-Filing into Spaces"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f04, f11, f03]
  related: [u06, u03]
tags: [ai, spaces, automation]
---

# U07 — AI Auto-Filing into Spaces

## Scenario
User receives an email from their contractor Mike about cabinet delivery dates. AI recognizes: sender is in "My Condo" contacts, subject mentions kitchen → auto-routes the email card into the Condo space, links it to the Kitchen Renovation project, and extracts the delivery date into a new task: "Receive kitchen cabinets — March 12."

## Features Exercised
- F04 — AI Action Engine
- F11 — Domains / Spaces (Persistent Living Contexts)
- F03 — Gmail / Google Workspace Integration
