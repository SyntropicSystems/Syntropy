---
id: "wf-design-workspace-contract"
type: workflow
title: "Design a Workspace Contract"
status: active
owner: workspace-contracts-agent
created: 2026-02-21
updated: 2026-02-21
refs:
  related: [wp01, wp08, arch-workspace-contracts, wf-make-decision]
tags: [workflow, workspace-platform, contracts]
---

# Workflow: Design a Workspace Contract

## When to Use

When you need to define a new workspace contract boundary (a new schema, a new contract file, or a new section in `syntropy.toml`) or extend an existing one. This includes:

- Adding new fields to `syntropy.toml`
- Defining a new output contract (like a new `--json` output format)
- Evolving the workspace state schema
- Adding new validation report categories

## Prerequisites

- The need for the contract is established (a boundary exists that's currently implicit)
- The workspace-contracts-agent is loaded
- Relevant architecture docs are loaded (`docs/architecture/workspace-contracts.md`)

## Steps

### Step 1: Identify the Boundary

What boundary does this contract serve? Who produces the data? Who consumes it?

Document:
- **Producer**: what component writes/generates this data
- **Consumer(s)**: what components read/use this data
- **Boundary type**: config (human-authored) or output (machine-generated)

### Step 2: Define the Rust Types

Following the code-first strategy:
1. Define the Rust structs/enums in the appropriate crate
2. Use `serde` for serialization
3. Use `schemars` for JSON Schema generation
4. Ensure all fields have documentation comments

### Step 3: Generate the Schema

1. Run the schema generation target: `bazel run //platform/contracts/workspace:generate_schemas`
2. Review the generated JSON Schema for correctness
3. Check in the generated schema to `platform/contracts/workspace/v0/`

### Step 4: Add Validation Rules

If this contract introduces new validation concerns:
1. Add validation rules to the validation engine
2. Define error codes for violations
3. Include fix hints in error messages
4. Add tests for both valid and invalid cases

### Step 5: Update the Workspace Contract Feature Spec

If this changes `syntropy.toml`:
1. Update WP01 feature spec with the new fields
2. Update the architecture doc with the new contract details
3. Consider whether a migration is needed (WP06)

### Step 6: Wire Cross-References

1. Update relevant feature specs with new contract references
2. Update architecture docs
3. Add changelog entry
4. Update registry if new documents were created

## Validation Checklist

- [ ] Boundary is explicitly identified (producer, consumer, type)
- [ ] Rust types are defined with serde + schemars
- [ ] JSON Schema is generated and checked in
- [ ] Schema matches Rust types (drift check passes)
- [ ] Validation rules cover the new contract
- [ ] Error codes follow the taxonomy
- [ ] Feature specs updated
- [ ] Architecture docs updated
- [ ] Cross-references are bidirectional
- [ ] Changelog entry created

## Executor Notes

Primary executor: workspace-contracts-agent. Architecture-agent may co-execute for contracts that span runtime and workspace boundaries. Human review required for any changes to `syntropy.toml` schema.
