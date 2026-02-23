use crate::blueprint::Blueprint;
use crate::config::{OutputFormat, SyntropyToml, WorkspaceOverride};
use crate::model::{NodeDefinition, NodeInfo, NodeType, Patch, TreeNode};
use crate::paths::{lexical_normalize, path_to_slash_string, rel_path_to_output_string};
use crate::readmes::GENERATED_MARKER;
use std::collections::HashMap;
use std::path::{Path, PathBuf};

#[derive(Debug, Clone)]
pub struct Workspace {
    pub(crate) root: PathBuf,
    pub(crate) config_path: PathBuf,
    pub(crate) config: SyntropyToml,
    pub(crate) blueprint: Blueprint,
    overrides: HashMap<String, WorkspaceOverride>,
}

#[derive(Debug, Clone)]
pub struct InitOptions {
    pub name: Option<String>,
    pub blueprint: String,
    pub output_format_default: Option<OutputFormat>,
    pub generate_readmes: bool,
}

impl Default for InitOptions {
    fn default() -> Self {
        Self {
            name: None,
            blueprint: crate::blueprint::NORTH_STAR_V0.to_string(),
            output_format_default: Some(OutputFormat::Human),
            generate_readmes: true,
        }
    }
}

#[derive(Debug, Clone)]
pub struct InitReport {
    pub root: PathBuf,
    pub config_path: PathBuf,
    pub created: Vec<PathBuf>,
}

impl Workspace {
    pub fn discover(start: impl AsRef<Path>) -> anyhow::Result<Self> {
        let start = start.as_ref();
        let start_dir = if start.is_dir() {
            start.to_path_buf()
        } else {
            start.parent().unwrap_or(Path::new(".")).to_path_buf()
        };

        let start_dir = std::fs::canonicalize(&start_dir).unwrap_or_else(|_| start_dir);

        for dir in start_dir.ancestors() {
            let direct = dir.join("syntropy.toml");
            if direct.is_file() {
                return Self::load_from_config_path(direct);
            }

            let in_syntropy = dir.join(".syntropy").join("syntropy.toml");
            if in_syntropy.is_file() {
                return Self::load_from_config_path(in_syntropy);
            }

            let in_work = dir.join(".work").join("syntropy.toml");
            if in_work.is_file() {
                anyhow::bail!(
                    "legacy workspace location `.work/syntropy.toml` detected; rename `.work/` → `.syntropy/` and move `syntropy.toml` to the repo root (recommended) or `.syntropy/syntropy.toml`"
                );
            }
        }

        anyhow::bail!(
            "workspace not found (expected syntropy.toml or .syntropy/syntropy.toml in current or parent directories)"
        )
    }

    pub fn init(root: impl AsRef<Path>, options: InitOptions) -> anyhow::Result<InitReport> {
        let root = root.as_ref();
        let root = std::fs::canonicalize(root).unwrap_or_else(|_| root.to_path_buf());

        let config_path = root.join("syntropy.toml");
        if config_path.exists() {
            anyhow::bail!("syntropy.toml already exists at {}", config_path.display());
        }

        let workspace_name = options.name.clone().unwrap_or_else(|| {
            root.file_name()
                .unwrap_or_default()
                .to_string_lossy()
                .to_string()
        });

        let mut created = Vec::<PathBuf>::new();

        let config_contents = render_default_config(
            &workspace_name,
            &options.blueprint,
            options.output_format_default,
            options.generate_readmes,
        );

        std::fs::write(&config_path, config_contents)?;
        created.push(config_path.clone());

        let instance_state_gitignore = root.join(".syntropy").join("state").join(".gitignore");
        if !instance_state_gitignore.exists() {
            if let Some(parent) = instance_state_gitignore.parent() {
                std::fs::create_dir_all(parent)?;
            }
            std::fs::write(&instance_state_gitignore, "*\n!.gitignore\n")?;
            created.push(instance_state_gitignore);
        }

        Ok(InitReport {
            root,
            config_path,
            created,
        })
    }

    pub fn root(&self) -> &Path {
        &self.root
    }

    pub fn config_path(&self) -> &Path {
        &self.config_path
    }

    pub fn config(&self) -> &SyntropyToml {
        &self.config
    }

    pub fn output_format_default(&self) -> OutputFormat {
        self.config
            .output
            .format_default
            .unwrap_or(OutputFormat::Human)
    }

    pub fn tree(&self, start: impl AsRef<Path>, max_depth: usize) -> anyhow::Result<TreeNode> {
        let resolved = self.resolve_input_path(start.as_ref())?;
        self.build_tree(&resolved.abs_path, &resolved.rel_path, max_depth)
    }

    pub fn info(&self, path: impl AsRef<Path>) -> anyhow::Result<NodeInfo> {
        let resolved = self.resolve_input_path(path.as_ref())?;
        let (definition, chain) = self.effective_definition_and_chain(&resolved.rel_path);

        let (node_type, exists) = match std::fs::symlink_metadata(&resolved.abs_path) {
            Ok(meta) => {
                if meta.file_type().is_symlink() {
                    (NodeType::Symlink, true)
                } else if meta.is_dir() {
                    (NodeType::Dir, true)
                } else if meta.is_file() {
                    (NodeType::File, true)
                } else {
                    (NodeType::Missing, false)
                }
            }
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => (NodeType::Missing, false),
            Err(err) => return Err(err.into()),
        };

        let readme_path = if matches!(node_type, NodeType::Dir) {
            definition.readme_filename.as_ref().map(|name| {
                let rel = resolved.rel_path.join(name);
                path_to_slash_string(&rel)
            })
        } else {
            None
        };

        Ok(NodeInfo {
            schema_version: "v0".to_string(),
            workspace_root: self.root.display().to_string(),
            path: rel_path_to_output_string(&resolved.rel_path),
            contract_chain: chain.iter().map(|p| rel_path_to_output_string(p)).collect(),
            node_type,
            kind: definition.kind,
            exists,
            purpose: definition.purpose,
            rules: definition.rules,
            boundaries: definition.boundaries,
            readme_path,
        })
    }

    pub fn apply_patches(&self, patches: &[Patch]) -> anyhow::Result<()> {
        for patch in patches {
            match patch.op {
                crate::model::PatchOp::Create | crate::model::PatchOp::Update => {
                    if let Some(parent) = patch.path.parent() {
                        std::fs::create_dir_all(parent)?;
                    }
                    write_atomic(&patch.path, patch.content.as_bytes())?;
                }
                crate::model::PatchOp::Delete => match std::fs::remove_file(&patch.path) {
                    Ok(()) => {}
                    Err(err) if err.kind() == std::io::ErrorKind::NotFound => {}
                    Err(err) => return Err(err.into()),
                },
            }
        }
        Ok(())
    }

    pub(crate) fn known_directories(&self) -> Vec<PathBuf> {
        let mut dirs = Vec::<PathBuf>::new();

        for key in self.blueprint.allowed_top_level_dirs.iter().copied() {
            dirs.push(PathBuf::from(key));
        }

        // Discover leaf work units so README contracts emerge as the repo grows.
        dirs.extend(discover_immediate_child_dirs(&self.root, Path::new("apps")));
        dirs.extend(discover_immediate_child_dirs(
            &self.root,
            Path::new("packages"),
        ));

        // A small set of blueprint directories we want to have contracts for.
        dirs.push(PathBuf::from("platform/crates"));
        dirs.push(PathBuf::from("platform/contracts"));
        dirs.push(PathBuf::from("products/command-center"));
        dirs.push(PathBuf::from("products/command-center/apps"));
        dirs.push(PathBuf::from("products/command-center/apps/cli"));

        for override_entry in self.overrides.values() {
            dirs.push(PathBuf::from(&override_entry.path));
        }

        dirs
    }

    pub(crate) fn render_readme(&self, rel_dir: &Path) -> anyhow::Result<String> {
        let info = self.info(rel_dir)?;
        let title = if info.path == "." || info.path.is_empty() {
            self.config.workspace.name.clone()
        } else {
            rel_dir
                .file_name()
                .unwrap_or_default()
                .to_string_lossy()
                .to_string()
        };

        let mut out = String::new();
        out.push_str(GENERATED_MARKER);
        out.push('\n');
        out.push_str(&format!("# {title}\n\n"));

        if let Some(purpose) = info.purpose.as_ref() {
            out.push_str("## Purpose\n\n");
            out.push_str(purpose.trim());
            out.push_str("\n\n");
        }

        if !info.rules.is_empty() {
            out.push_str("## Rules\n\n");
            for rule in info.rules {
                out.push_str("- ");
                out.push_str(rule.trim());
                out.push('\n');
            }
            out.push('\n');
        }

        if let Some(boundaries) = info.boundaries.as_ref() {
            if !boundaries.allowed_children.is_empty() || !boundaries.disallowed.is_empty() {
                out.push_str("## Boundaries\n\n");
                if !boundaries.allowed_children.is_empty() {
                    out.push_str("- Allowed children:\n");
                    for child in &boundaries.allowed_children {
                        out.push_str("  - ");
                        out.push_str(child);
                        out.push('\n');
                    }
                }
                if !boundaries.disallowed.is_empty() {
                    out.push_str("- Disallowed:\n");
                    for child in &boundaries.disallowed {
                        out.push_str("  - ");
                        out.push_str(child);
                        out.push('\n');
                    }
                }
                out.push('\n');
            }
        }

        out.push_str("## Notes\n\n");
        out.push_str("Generated by `syntropy gen readmes`.\n");
        out.push('\n');

        Ok(out)
    }

    pub(crate) fn resolve_definition(&self, rel_path: &Path) -> NodeDefinition {
        let mut merged = self
            .blueprint
            .node_definition(rel_path)
            .cloned()
            .unwrap_or_else(|| NodeDefinition {
                kind: "unknown".to_string(),
                purpose: None,
                rules: vec![],
                boundaries: None,
                readme_filename: Some("README.md".to_string()),
            });

        let key = path_to_slash_string(rel_path);
        if let Some(override_entry) = self.overrides.get(key.as_str()) {
            if let Some(kind) = override_entry.kind.as_ref() {
                merged.kind = kind.clone();
            }
            if override_entry.purpose.is_some() {
                merged.purpose = override_entry.purpose.clone();
            }
            if override_entry.boundaries.is_some() {
                merged.boundaries = override_entry.boundaries.clone();
            }
            if override_entry.readme_filename.is_some() {
                merged.readme_filename = override_entry.readme_filename.clone();
            }

            if !override_entry.rules.is_empty() {
                let mut out = Vec::<String>::new();
                let mut seen = std::collections::BTreeSet::<String>::new();
                for rule in merged
                    .rules
                    .iter()
                    .cloned()
                    .chain(override_entry.rules.iter().cloned())
                {
                    if seen.insert(rule.clone()) {
                        out.push(rule);
                    }
                }
                merged.rules = out;
            }
        }

        merged
    }

    pub(crate) fn effective_definition_and_chain(
        &self,
        rel_path: &Path,
    ) -> (NodeDefinition, Vec<PathBuf>) {
        let chain = contract_chain_paths(rel_path);

        let mut kind = "unknown".to_string();
        let mut purpose: Option<String> = None;
        let mut rules = Vec::<String>::new();
        let mut seen = std::collections::BTreeSet::<String>::new();

        for p in chain.iter() {
            let local = self.resolve_definition(p);

            if local.kind != "unknown" {
                kind = local.kind;
            }
            if local.purpose.is_some() {
                purpose = local.purpose;
            }
            for rule in local.rules {
                if seen.insert(rule.clone()) {
                    rules.push(rule);
                }
            }
        }

        let leaf_local = self.resolve_definition(rel_path);

        (
            NodeDefinition {
                kind,
                purpose,
                rules,
                boundaries: leaf_local.boundaries,
                readme_filename: leaf_local.readme_filename,
            },
            chain,
        )
    }

    fn load_from_config_path(config_path: PathBuf) -> anyhow::Result<Self> {
        let root = config_path
            .parent()
            .and_then(|p| {
                if p.file_name().is_some_and(|n| n == ".syntropy") {
                    p.parent()
                } else {
                    Some(p)
                }
            })
            .unwrap_or(Path::new("."))
            .to_path_buf();

        let root = std::fs::canonicalize(&root).unwrap_or(root);

        let raw = std::fs::read_to_string(&config_path)?;
        let config: SyntropyToml = toml::from_str(&raw)?;
        let blueprint = Blueprint::by_id(&config.workspace.blueprint)?;

        let mut overrides = HashMap::<String, WorkspaceOverride>::new();
        for override_entry in config.overrides.iter().cloned() {
            let key = lexical_normalize(Path::new(&override_entry.path));
            overrides.insert(path_to_slash_string(&key), override_entry);
        }

        Ok(Self {
            root,
            config_path,
            config,
            blueprint,
            overrides,
        })
    }

    fn build_tree(&self, abs: &Path, rel: &Path, max_depth: usize) -> anyhow::Result<TreeNode> {
        let name = if rel.as_os_str().is_empty() || rel == Path::new(".") {
            ".".to_string()
        } else {
            rel.file_name()
                .unwrap_or_default()
                .to_string_lossy()
                .to_string()
        };

        let (node_type, mut children) = match std::fs::symlink_metadata(abs) {
            Ok(meta) => {
                if meta.file_type().is_symlink() {
                    (NodeType::Symlink, vec![])
                } else if meta.is_dir() {
                    if max_depth == 0 {
                        (NodeType::Dir, vec![])
                    } else {
                        let children = self.list_tree_children(abs, rel, max_depth)?;
                        (NodeType::Dir, children)
                    }
                } else if meta.is_file() {
                    (NodeType::File, vec![])
                } else {
                    (NodeType::Missing, vec![])
                }
            }
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => (NodeType::Missing, vec![]),
            Err(err) => return Err(err.into()),
        };

        // Ensure deterministic order, even if filesystem doesn't guarantee it.
        children.sort_by(|a, b| a.name.cmp(&b.name));

        Ok(TreeNode {
            path: rel_path_to_output_string(rel),
            name,
            node_type: node_type.clone(),
            kind: if matches!(node_type, NodeType::Dir) {
                self.effective_definition_and_chain(rel).0.kind
            } else {
                "file".to_string()
            },
            children,
        })
    }

    fn list_tree_children(
        &self,
        abs_dir: &Path,
        rel_dir: &Path,
        max_depth: usize,
    ) -> anyhow::Result<Vec<TreeNode>> {
        let mut entries = Vec::<std::fs::DirEntry>::new();
        for entry in std::fs::read_dir(abs_dir)? {
            entries.push(entry?);
        }

        entries.sort_by_key(|e| e.file_name());

        let mut out = Vec::<TreeNode>::new();
        for entry in entries {
            let name = entry.file_name().to_string_lossy().to_string();
            if should_ignore_tree_entry(name.as_str()) {
                continue;
            }

            let abs_child = entry.path();
            let rel_child = rel_dir.join(&name);
            out.push(self.build_tree(&abs_child, &rel_child, max_depth.saturating_sub(1))?);
        }

        Ok(out)
    }

    fn resolve_input_path(&self, input: &Path) -> anyhow::Result<ResolvedPath> {
        let abs_input = if input.is_absolute() {
            input.to_path_buf()
        } else {
            self.root.join(input)
        };

        let abs_input = lexical_normalize(&abs_input);
        let root = lexical_normalize(&self.root);

        let rel = abs_input
            .strip_prefix(&root)
            .map_err(|_| anyhow::anyhow!("path is outside workspace: {}", input.display()))?
            .to_path_buf();

        Ok(ResolvedPath {
            abs_path: abs_input,
            rel_path: rel,
        })
    }
}

struct ResolvedPath {
    abs_path: PathBuf,
    rel_path: PathBuf,
}

fn should_ignore_tree_entry(name: &str) -> bool {
    matches!(
        name,
        ".git"
            | "node_modules"
            | "target"
            | ".nx"
            | "dist"
            | "build"
            | ".next"
            | "out"
            | "coverage"
            | ".DS_Store"
    )
}

fn render_default_config(
    name: &str,
    blueprint: &str,
    format_default: Option<OutputFormat>,
    generate_readmes: bool,
) -> String {
    let format_default = match format_default {
        Some(OutputFormat::Human) => "human",
        Some(OutputFormat::Json) => "json",
        None => "human",
    };

    format!(
        r#"# syntropy.toml
#
# Workspace contract for Syntropy. Keep this file boring and hard to mess up.

[workspace]
name = "{name}"
blueprint = "{blueprint}"

[output]
format_default = "{format_default}"
generate_readmes = {generate_readmes}
"#
    )
}

fn write_atomic(path: &Path, contents: &[u8]) -> std::io::Result<()> {
    let parent = path.parent().unwrap_or(Path::new("."));
    let mut tmp = parent.join(format!(
        ".{}.tmp",
        path.file_name()
            .unwrap_or_default()
            .to_string_lossy()
            .to_string()
    ));

    // Avoid collisions in the (rare) case of parallel writers.
    let mut i = 0u32;
    while tmp.exists() {
        i = i.saturating_add(1);
        tmp = parent.join(format!(
            ".{}.{}.tmp",
            path.file_name()
                .unwrap_or_default()
                .to_string_lossy()
                .to_string(),
            i
        ));
    }

    std::fs::write(&tmp, contents)?;
    std::fs::rename(&tmp, path)?;
    Ok(())
}

fn discover_immediate_child_dirs(root: &Path, rel_parent: &Path) -> Vec<PathBuf> {
    let abs_parent = root.join(rel_parent);
    if !abs_parent.is_dir() {
        return vec![];
    }

    let Ok(read_dir) = std::fs::read_dir(&abs_parent) else {
        return vec![];
    };

    let mut entries = Vec::<std::fs::DirEntry>::new();
    for entry in read_dir {
        if let Ok(entry) = entry {
            entries.push(entry);
        }
    }

    entries.sort_by_key(|e| e.file_name());

    let mut out = Vec::<PathBuf>::new();
    for entry in entries {
        let Ok(file_type) = entry.file_type() else {
            continue;
        };
        if !file_type.is_dir() {
            continue;
        }

        let name = entry.file_name().to_string_lossy().to_string();
        if name.starts_with('.') {
            continue;
        }
        if matches!(
            name.as_str(),
            "node_modules" | "dist" | "build" | ".next" | "out" | "coverage"
        ) {
            continue;
        }

        out.push(rel_parent.join(name));
    }

    out
}

fn contract_chain_paths(rel_path: &Path) -> Vec<PathBuf> {
    let mut out = Vec::<PathBuf>::new();
    out.push(PathBuf::from("."));

    if rel_path.as_os_str().is_empty() || rel_path == Path::new(".") {
        return out;
    }

    let mut current = PathBuf::new();
    for component in rel_path.components() {
        current.push(component.as_os_str());
        out.push(current.clone());
    }

    out
}
