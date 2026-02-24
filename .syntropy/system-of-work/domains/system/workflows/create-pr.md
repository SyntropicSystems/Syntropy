# Workflow: Create a Pull Request

## Goal

Turn local changes into a reviewable pull request with a descriptive commit and reproducible verification.

## Steps

1. Create/switch to a feature branch:
   - `git checkout -b codex/<short-slug>`
2. If you touched the System of Work or agent specs, regenerate and drift-check tool adapters:
   - `cargo run -p syntropy -- gen agents`
   - `cargo run -p syntropy -- gen agents --check`
3. Run relevant verification:
   - Rust changes: `cargo test` (or at least `cargo check`)
   - Workspace/blueprint changes: `cargo run -p syntropy -- validate`
   - Any domain-specific tests/linters for the area you changed
4. Review what will ship:
   - `git status`
   - `git diff`
5. Stage and commit with a descriptive message:
   - `git add -A`
   - `git commit -m "<imperative summary of the change>"`
6. Push and open the PR:
   - `git push -u origin HEAD`
   - `gh pr create --fill`
7. Ensure the PR description includes:
   - What changed
   - How to verify (commands + outcomes)
   - Any follow-ups / open questions

## Notes

- Do not hand-edit `.claude/**` or `.codex/**`; regenerate via `syntropy gen agents`.
- If `gh` is not authenticated, run `gh auth login`.
