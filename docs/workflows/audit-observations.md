---
id: "wf-audit-observations"
type: workflow
title: "Audit Observations"
status: active
owner: observations-agent
created: 2025-02-09
updated: 2026-02-21
refs:
  related: [dp-u09, dp10, observations-agent, observations-index, wf-capture-observation, wf-sync-domain-context]
---

# Workflow: Audit Observations

## When to Use

Periodically (at least weekly, or on-demand) to process accumulated observations, add structure, detect patterns, and surface actionable intelligence. This is the observations-agent's primary recurring workflow.

## Prerequisites

- Access to `observations/` directory
- Knowledge of current domains and their scopes (via `.syntropy/system-of-work/ROUTER.md`)
- Familiarity with the observation type system (see `observations/_index.md`)

## Steps

### Step 1: Scan for Unprocessed Observations

- List all observation files in `observations/`
- Filter for `status: raw` (unprocessed) and `status: structured` (processed but not yet triaged)
- Note the date of the last audit (check changelog for last `wf-audit-observations` entry)

### Step 2: Structure Raw Observations

For each `raw` observation:

1. **Read and understand** the content — what is the observer trying to say?
2. **Assign type** if missing: `friction`, `bug`, `idea`, `question`, `anxiety`, `pattern`, `need`, `praise`, `general`
3. **Tag domains** if missing: determine which agent domain(s) this relates to
4. **Improve clarity** if needed: fix formatting, expand abbreviations, add section headers — but **preserve the observer's voice and intent**
5. **Add refs** if obvious: link to related features, docs, ADRs, other observations
6. **Flag for clarification** if the observation is too unclear to process — leave a note in the file asking the observer for more context, keep status as `raw`
7. **Update status** to `structured`
8. **Update the `updated` date**

**Important**: When structuring, you are a steward, not an editor. Don't change what the observer meant. Add structure around their words. If you need to rephrase for clarity, keep the original text and add your structured version alongside it.

### Step 3: Detect Patterns

After structuring, look across all observations (not just new ones) for:

- **Frequency**: Are multiple observations about the same friction/topic?
- **Clustering**: Do observations from different people/domains point to the same root issue?
- **Sentiment**: Is there a pattern of anxieties or frustrations in a particular area?
- **Recurring needs**: Are multiple people asking for the same capability?
- **Cross-domain signals**: Do frictions in one domain connect to issues in another?

When a pattern is found:
1. Create a new `pattern` type observation that links the related observations
2. Summarize the pattern and its significance
3. Note the signal strength (how many observations, how many observers, how consistent)

### Step 4: Triage

For `structured` observations and detected patterns:

1. **Assess actionability**: Is there something concrete that could be done?
2. **Assess signal strength**: Is this one person's minor annoyance or a recurring systemic issue?
3. **Assess urgency**: Is this blocking work? Causing errors? Or just suboptimal?
4. **Categorize**:
   - **Promote**: Strong signal, clear action → promote to formal item
   - **Watch**: Moderate signal, not yet actionable → keep `triaged`, revisit next audit
   - **Archive**: Low signal, one-off, or already addressed → mark `archived`
5. **Update status** to `triaged`

### Step 5: Promote High-Signal Observations

For observations marked for promotion:

1. Determine the target type:
   - Recurring friction → **open question** or **feature request**
   - Bug → **bug report** (or direct fix if trivial)
   - Idea with clear value → **feature proposal** (route to product-agent)
   - Architectural concern → **ADR proposal** (route to architecture-agent)
   - Process issue → **workflow improvement** (route to meta-agent)
2. Create the formal item using the appropriate workflow
3. Link the source observation(s) to the new item via `refs`
4. Update observation status to `promoted`
5. Add a note to the observation pointing to the promoted item

### Step 6: Notify Domain DRIs

For observations tagged with specific domains:
- Ensure domain agents are aware of observations in their scope
- Note relevant observations in domain agents' "Open Threads" during their next sync
- Flag any observations that suggest domain invariant violations

### Step 7: Uplevel Contributors

As part of the audit, notice observation quality:
- Which contributors are writing clear, structured, context-rich observations?
- Which contributors are improving over time?
- Are there common gaps (missing context, unclear type, no domain tag)?
- When structuring a raw observation, make your improvements visible so the observer can learn from the diff
- If a contributor consistently struggles, consider reaching out to help them develop their observation skills

### Step 8: Log the Audit

- Add an entry to `docs/_changelog.md`: date, action `audited`, description of what was processed
- Include counts: observations structured, patterns detected, items promoted

## Validation Checklist

- [ ] All `raw` observations reviewed (structured, flagged for clarification, or escalated)
- [ ] Types and domains assigned to all structured observations
- [ ] Pattern analysis completed across observation corpus
- [ ] High-signal patterns promoted to formal items with cross-references
- [ ] Domain DRIs notified of relevant observations
- [ ] Audit logged in changelog
- [ ] Contributor upleveling notes captured

## Executor Notes

Primary executor: `observations-agent`. Can also be executed by any human who wants to process observations. Domain agents can run a scoped version of this audit (Steps 1–3 only, filtered to their domain) to understand what contributors are experiencing in their area.

## Audit Cadence

- **Minimum**: Weekly
- **Recommended**: After any significant milestone or at the end of a work sprint
- **On-demand**: When observation volume is high or a specific signal needs investigation
