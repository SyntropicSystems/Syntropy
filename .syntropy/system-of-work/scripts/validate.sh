#!/usr/bin/env bash
set -euo pipefail

# Syntropy System-of-Work validation entrypoint.
#
# This script is intentionally boring and deterministic so it can be used by:
# - humans locally
# - CI drift gates
# - coding AIs following the paved road

cargo run -p syntropy -- agents check
cargo run -p syntropy -- validate

