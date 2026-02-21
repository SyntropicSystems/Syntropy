# Workflow: Sync Tool Agent Adapters

## Goal

Keep `.claude/**` and `.codex/**` in sync with canonical agent specs under `.syntropy/system-of-work/domains/**`.

## Steps

1. Edit canonical agent specs:
   - `.syntropy/system-of-work/domains/**/AGENT.md`
   - and any referenced `CONTEXT.md`, `POLICY.md`, `OWNER.md`
2. Regenerate adapters:
   - `cargo run -p syntropy -- agents sync`
3. Verify no drift:
   - `cargo run -p syntropy -- agents check`

## Notes

- Do not hand-edit `.claude/**` or `.codex/**`. They are generated output.

