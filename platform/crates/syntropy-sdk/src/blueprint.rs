use crate::model::{Boundaries, NodeDefinition};
use std::collections::HashMap;
use std::path::Path;

pub(crate) const NORTH_STAR_V0: &str = "north-star/v0";

#[derive(Debug, Clone)]
pub(crate) struct Blueprint {
    pub id: String,
    nodes: HashMap<&'static str, NodeDefinition>,
    pub allowed_top_level_dirs: Vec<&'static str>,
}

impl Blueprint {
    pub fn by_id(id: &str) -> anyhow::Result<Self> {
        match id {
            NORTH_STAR_V0 => Ok(Self::north_star_v0()),
            _ => anyhow::bail!("unknown blueprint: {id}"),
        }
    }

    pub fn node_definition(&self, rel_path: &Path) -> Option<&NodeDefinition> {
        let key = rel_path_to_key(rel_path);
        self.nodes.get(key.as_str())
    }

    fn north_star_v0() -> Self {
        let mut nodes = HashMap::<&'static str, NodeDefinition>::new();

        nodes.insert(
            ".",
            NodeDefinition {
                kind: "workspace_root".to_string(),
                purpose: Some(
                    "Workspace root. Configuration lives in syntropy.toml; structure is validated against the selected blueprint."
                        .to_string(),
                ),
                rules: vec![
                    "Keep repo structure coherent and low-entropy.".to_string(),
                    "Prefer platform commands over manual restructuring.".to_string(),
                ],
                boundaries: Some(Boundaries {
                    allowed_children: vec![
                        "apps".to_string(),
                        "packages".to_string(),
                        "infra".to_string(),
                        "platform".to_string(),
                        "products".to_string(),
                        "surfaces".to_string(),
                        "prototypes".to_string(),
                        "observations".to_string(),
                        "tools".to_string(),
                        "workspaces".to_string(),
                        "docs".to_string(),
                        ".syntropy".to_string(),
                        ".claude".to_string(),
                        ".codex".to_string(),
                        ".github".to_string(),
                        ".devcontainer".to_string(),
                        ".eraser".to_string(),
                    ],
                    disallowed: vec![],
                }),
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "apps",
            NodeDefinition {
                kind: "apps".to_string(),
                purpose: Some(
                    "Application shells for Syntropy OS and the Dev Platform (thin composition over packages/)."
                        .to_string(),
                ),
                rules: vec![
                    "Keep app shells thin; move shared logic into packages/.".to_string(),
                    "Apps may depend on packages/; packages must not depend on apps/.".to_string(),
                ],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "packages",
            NodeDefinition {
                kind: "packages".to_string(),
                purpose: Some(
                    "TypeScript packages (domain logic, infrastructure, and UI primitives).".to_string(),
                ),
                rules: vec![
                    "Prefer pure packages; keep environment-specific wiring in apps/.".to_string(),
                    "Avoid accidental coupling: shared code belongs here, not duplicated across apps."
                        .to_string(),
                ],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "infra",
            NodeDefinition {
                kind: "infra".to_string(),
                purpose: Some("Infrastructure as code (Pulumi).".to_string()),
                rules: vec!["Keep secrets out of version control.".to_string()],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "surfaces",
            NodeDefinition {
                kind: "surfaces".to_string(),
                purpose: Some(
                    "Surface definitions: interfaces through which users (or developers) interact with the system."
                        .to_string(),
                ),
                rules: vec!["Use YAML frontmatter for docs in this tree.".to_string()],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "prototypes",
            NodeDefinition {
                kind: "prototypes".to_string(),
                purpose: Some("Interactive React JSX design prototypes.".to_string()),
                rules: vec!["Keep prototypes self-contained and powered by mock data.".to_string()],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "observations",
            NodeDefinition {
                kind: "observations".to_string(),
                purpose: Some(
                    "Raw signals captured over time; see observations/_index.md for workflow and template."
                        .to_string(),
                ),
                rules: vec!["Capture first; structure later (audit with workflows).".to_string()],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "tools",
            NodeDefinition {
                kind: "tools".to_string(),
                purpose: Some("Repo tooling (CI, devex utilities, codegen).".to_string()),
                rules: vec![
                    "Tools are not product features; keep product code in products/.".to_string(),
                ],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "workspaces",
            NodeDefinition {
                kind: "workspaces".to_string(),
                purpose: Some(
                    "Fixtures and templates used to prove portability across repository shapes."
                        .to_string(),
                ),
                rules: vec!["Keep fixtures minimal and representative.".to_string()],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            ".claude",
            NodeDefinition {
                kind: "tool_adapter".to_string(),
                purpose: Some("Generated Claude Code tool adapter.".to_string()),
                rules: vec!["Do not hand-edit; regenerate with `syntropy gen agents`.".to_string()],
                boundaries: Some(Boundaries {
                    allowed_children: vec!["agents".to_string(), "commands".to_string()],
                    disallowed: vec![],
                }),
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            ".codex",
            NodeDefinition {
                kind: "tool_adapter".to_string(),
                purpose: Some("Generated OpenAI Codex tool adapter.".to_string()),
                rules: vec!["Do not hand-edit; regenerate with `syntropy gen agents`.".to_string()],
                boundaries: Some(Boundaries {
                    allowed_children: vec!["agents".to_string(), "config.toml".to_string()],
                    disallowed: vec![],
                }),
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            ".github",
            NodeDefinition {
                kind: "repo_platform".to_string(),
                purpose: Some("GitHub configuration (workflows, CI).".to_string()),
                rules: vec![
                    "Prefer a single CI entrypoint: `syntropy check`."
                        .to_string(),
                ],
                boundaries: Some(Boundaries {
                    allowed_children: vec!["workflows".to_string()],
                    disallowed: vec![],
                }),
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            ".devcontainer",
            NodeDefinition {
                kind: "repo_platform".to_string(),
                purpose: Some("Dev/build container configuration.".to_string()),
                rules: vec!["Pin toolchain versions to keep builds deterministic.".to_string()],
                boundaries: Some(Boundaries {
                    allowed_children: vec![
                        "Dockerfile".to_string(),
                        "devcontainer.json".to_string(),
                    ],
                    disallowed: vec![],
                }),
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            ".eraser",
            NodeDefinition {
                kind: "repo_platform".to_string(),
                purpose: Some("Eraser diagram exports used by docs.".to_string()),
                rules: vec![
                    "Check in exports; avoid treating this as a hand-edited source of truth."
                        .to_string(),
                ],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "platform",
            NodeDefinition {
                kind: "platform".to_string(),
                purpose: Some("Reusable foundation: crates, adapters, contracts.".to_string()),
                rules: vec!["Platform never imports from products.".to_string()],
                boundaries: Some(Boundaries {
                    allowed_children: vec![
                        "crates".to_string(),
                        "adapters".to_string(),
                        "contracts".to_string(),
                    ],
                    disallowed: vec![],
                }),
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "platform/crates",
            NodeDefinition {
                kind: "platform_crates".to_string(),
                purpose: Some("All Rust libraries live here.".to_string()),
                rules: vec!["No binaries in platform crates.".to_string()],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "platform/contracts",
            NodeDefinition {
                kind: "platform_contracts".to_string(),
                purpose: Some("Versioned contracts: runtime + workspace APIs.".to_string()),
                rules: vec![],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "products",
            NodeDefinition {
                kind: "products".to_string(),
                purpose: Some("Shipped surfaces built on the platform.".to_string()),
                rules: vec!["Products can import platform.".to_string()],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "products/command-center",
            NodeDefinition {
                kind: "product".to_string(),
                purpose: Some("Command Center: primary surface for Syntropy tooling.".to_string()),
                rules: vec![],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "products/command-center/apps",
            NodeDefinition {
                kind: "apps".to_string(),
                purpose: Some("Applications for the product (CLI, web, etc.).".to_string()),
                rules: vec![],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "products/command-center/apps/cli",
            NodeDefinition {
                kind: "cli_app".to_string(),
                purpose: Some("CLI wrapper around syntropy-sdk.".to_string()),
                rules: vec!["Keep business logic in syntropy-sdk.".to_string()],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        nodes.insert(
            "docs",
            NodeDefinition {
                kind: "docs".to_string(),
                purpose: Some(
                    "Project knowledge graph (vision/product/architecture/workflows).".to_string(),
                ),
                rules: vec![
                    "Use YAML frontmatter for docs in this tree.".to_string(),
                    "Update docs/_registry.md and docs/_changelog.md when adding docs.".to_string(),
                ],
                boundaries: None,
                readme_filename: None,
            },
        );

        nodes.insert(
            ".syntropy",
            NodeDefinition {
                kind: "instance".to_string(),
                purpose: Some("Workspace instance directory: system-of-work, tasks, signals, and machine state.".to_string()),
                rules: vec![
                    "Human artifacts are checked in; machine state is gitignored.".to_string(),
                ],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            },
        );

        Self {
            id: NORTH_STAR_V0.to_string(),
            nodes,
            allowed_top_level_dirs: vec![
                "apps",
                "packages",
                "infra",
                "platform",
                "products",
                "surfaces",
                "prototypes",
                "observations",
                "tools",
                "workspaces",
                "docs",
                ".syntropy",
                ".claude",
                ".codex",
                ".github",
                ".devcontainer",
                ".eraser",
            ],
        }
    }
}

fn rel_path_to_key(rel_path: &Path) -> String {
    if rel_path.as_os_str().is_empty() || rel_path == Path::new(".") {
        return ".".to_string();
    }

    let mut parts = Vec::<String>::new();
    for component in rel_path.components() {
        parts.push(component.as_os_str().to_string_lossy().to_string());
    }
    parts.join("/")
}
