# DevEx Domain Context

## Always Load

- `.devcontainer/**` (if relevant)
- `Cargo.toml` (Rust workspace)
- `Cargo.lock` (pinned deps)
- `rust-toolchain.toml` (pinned toolchain)
- `MODULE.bazel` (Bzlmod + Rust toolchain pin)
- `.bazelversion` (Bazel pin via Bazelisk)
- `.github/workflows/syntropy-validate.yml` (CI entrypoints)
