# =============================================================================
# Syntropy Dev/Build Container
# Multi-stage: base → build → devcontainer
#
# Usage:
#   Dev:  devcontainer.json targets "devcontainer" stage (automatic)
#   CI:   docker build --target build -t syntropy-build .
# =============================================================================

# --- base: shared Node.js + pnpm foundation ---
FROM node:24-slim AS base

# Pin pnpm version to match package.json packageManager field
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /workspace

# --- build: lean CI/CD container ---
FROM base AS build

# Only what CI strictly needs beyond base:
#   git        — Nx affected detection, pnpm git-based deps
#   ca-certs   — HTTPS fetches (registry, remote cache)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       git \
       ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# --- devcontainer: developer-friendly environment ---
FROM build AS devcontainer

# Convenience tools for interactive development
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       curl \
       wget \
       openssh-client \
       procps \
       sudo \
       vim \
       less \
       jq \
       bash-completion \
    && rm -rf /var/lib/apt/lists/*

# Grant the default node user (uid 1000) passwordless sudo
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

USER node
