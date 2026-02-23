# Syntropy

This repo contains:
- **Syntropy OS** application code (`apps/`, `packages/`, `infra/`)
- **Syntropy Workspace Platform** bootstrap implementation (`platform/`, `products/`, `.syntropy/`)

## Start here

- `AGENTS.md` — canonical entry point (humans + coding AIs)
- `docs/architecture/north-star-layout.md` — repo structure contract (why + boundaries)
- `syntropy.toml` — workspace contract (single reviewed config)

## Quick commands

```bash
cargo run -p syntropy -- info .
cargo run -p syntropy -- gen readmes
bash .syntropy/system-of-work/scripts/validate.sh
```

## Notes

- `.claude/**` and `.codex/**` are generated tool adapters. Edit canonical specs under `.syntropy/system-of-work/domains/**`, then run `cargo run -p syntropy -- agents sync`.
