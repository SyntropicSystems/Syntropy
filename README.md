# Syntropy

This repo contains:
- **Syntropy Workspace Platform** bootstrap implementation (`platform/`, `products/`, `.syntropy/`)
- **Knowledge graph + system-of-work** (`docs/`, `surfaces/`, `prototypes/`, `observations/`)

## Start here

- `AGENTS.md` — canonical entry point (humans + coding AIs)
- `docs/architecture/north-star-layout.md` — repo structure contract (why + boundaries)
- `syntropy.toml` — workspace contract (single reviewed config)
 - `docs/decisions/adr-006-rust-first-foundation.md` — current direction (Rust-first; app/backend stack deferred)

## Quick commands

```bash
cargo run -p syntropy -- info .
cargo run -p syntropy -- gen readmes
cargo run -p syntropy -- check
```

## Notes

- `.claude/**` and `.codex/**` are generated tool adapters. Edit canonical specs under `.syntropy/system-of-work/domains/**`, then run `cargo run -p syntropy -- gen agents`.
