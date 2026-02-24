# System of Work

Canonical repo collaboration artifacts (for humans and coding AIs):

- **Domains**: `.syntropy/system-of-work/domains/**` (source of truth)
- **Generated tool adapters**: `.claude/**`, `.codex/**` (do not hand-edit)
- **Entry point**: `AGENTS.md` (repo root)

If you change anything under `.syntropy/system-of-work/domains/**`, regenerate adapters with:

- `cargo run -p syntropy -- gen agents`

For routing and global rules:

- `.syntropy/system-of-work/ROUTER.md`
- `.syntropy/system-of-work/EXECUTION_CONTRACT.md`
