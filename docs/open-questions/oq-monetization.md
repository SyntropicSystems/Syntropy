---
id: "oq-monetization"
type: open-question
title: "Monetization Strategy"
status: draft
owner: product-agent
created: 2025-02-07
updated: 2025-02-07
refs:
  affects: [f04, f07, f10]
  resolves-to: []
---

# OQ: Monetization Strategy

## Question

Subscription model? Tiered by AI capabilities? Free tier with manual-only?

## Context

Syntropy OS has significant per-user costs driven by LLM API usage (~$0.02-0.10 per card analysis, ~$0.05-0.15 per artifact processing). An active user processing 50-100 cards/day could generate $1-10/day in LLM costs alone, plus Firestore read/write costs and Cloud Storage for artifacts. The AI capabilities are the core value proposition -- without them, the product is a basic task manager. This creates a natural tension: a free tier needs to be useful enough to attract users, but the AI features that make the product compelling are the expensive part. The monetization model must cover per-user variable costs (LLM, storage) while remaining competitive with existing task management tools.

## Exploration

_(To be filled as exploration happens.)_

## Current Thinking

_(To be filled.)_

## Resolution Criteria

- A pricing model with defined tiers, specifying what each tier includes (number of AI analyses/day, storage limits, integration count, confidence threshold controls)
- A cost model mapping per-user LLM and infrastructure costs to pricing tiers, showing margin at each level
- A free tier definition that is useful enough to convert users but sustainable in terms of cost (e.g., manual-only, limited AI, or AI with daily caps)
