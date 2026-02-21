# Bazel Domain Policy

## Invariants

- Builds must remain reproducible and deterministic.
- Prefer minimal dependency visibility; avoid leaking transitive deps.

