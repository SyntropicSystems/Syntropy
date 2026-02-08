---
id: "u09"
type: use-case
title: "Photo to Structured Knowledge"
status: defining
owner: product-agent
priority: P0
created: 2025-02-07
updated: 2025-02-07
refs:
  depends-on: [f12, f11]
  related: [u10, u06]
tags: [artifacts, capture, extraction]
---

# U09 — Photo to Structured Knowledge

## Scenario
User at a tile showroom takes a photo of 4 tile samples with price tags. Opens TaskCard → Add Artifact → snaps photo. AI processes: extracts each tile name, price per sq ft, and material. Presents structured summary: "Bathroom Tile Samples — 4 options from TileBar SF." Key facts: "Arctic Matte $4.50/sqft, Fog $5.20/sqft, ..." User accepts, AI auto-links to Condo domain + Bathroom Retile project + suggests creating task "Decide on bathroom tile color." All from one photo.

## Features Exercised
- F12 — Artifact Intelligence (Upload → Extract → Link)
- F11 — Domains / Spaces (Persistent Living Contexts)
