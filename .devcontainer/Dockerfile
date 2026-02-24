# =============================================================================
# Syntropy Dev/Build Container
# Multi-stage: base → build → devcontainer
#
# Usage:
#   Dev: devcontainer.json targets "devcontainer" stage (automatic)
#   CI:  docker build --target build -t syntropy-build .
# =============================================================================

# --- base: shared Rust + Bazel foundation ---
FROM debian:bookworm-slim AS base

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /workspace

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Bazelisk (exposes `bazel` and reads `.bazelversion`).
ARG BAZELISK_VERSION=v1.21.0
RUN arch="$(dpkg --print-architecture)" \
    && curl -fsSL -o /usr/local/bin/bazel \
        "https://github.com/bazelbuild/bazelisk/releases/download/${BAZELISK_VERSION}/bazelisk-linux-${arch}" \
    && chmod +x /usr/local/bin/bazel

# Install Rust toolchain (kept in sync with `rust-toolchain.toml`).
ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

COPY rust-toolchain.toml /tmp/rust-toolchain.toml
RUN toolchain="$(grep -E '^channel = ' /tmp/rust-toolchain.toml | cut -d '\"' -f2)" \
    && curl -fsSL https://sh.rustup.rs | sh -s -- -y --profile minimal --default-toolchain none \
    && rustup toolchain install "${toolchain}" --profile minimal \
    && rustup default "${toolchain}" \
    && rustup component add clippy rustfmt

# --- build: lean CI/CD container ---
FROM base AS build

# --- devcontainer: developer-friendly environment ---
FROM build AS devcontainer

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        bash-completion \
        jq \
        less \
        openssh-client \
        procps \
        sudo \
        vim \
        wget \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash dev \
    && echo "dev ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/dev \
    && chmod 0440 /etc/sudoers.d/dev

USER dev
