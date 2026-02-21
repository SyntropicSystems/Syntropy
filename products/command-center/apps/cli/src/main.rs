use anyhow::Context;
use clap::{Parser, Subcommand};
use syntropy_sdk::{InitOptions, Workspace};

#[derive(Debug, Parser)]
#[command(name = "syntropy")]
#[command(about = "Syntropy workspace platform CLI (bootstrap slice)")]
struct Cli {
    /// Emit machine-readable JSON output.
    #[arg(long, global = true)]
    json: bool,

    #[command(subcommand)]
    command: Command,
}

#[derive(Debug, Subcommand)]
enum Command {
    /// Initialize a workspace (creates syntropy.toml if missing).
    Init {
        /// Workspace root (defaults to current directory).
        #[arg(default_value = ".")]
        path: std::path::PathBuf,

        /// Workspace name (defaults to directory name).
        #[arg(long)]
        name: Option<String>,

        /// Blueprint ID (default: north-star/v0).
        #[arg(long)]
        blueprint: Option<String>,
    },

    /// Render a directory tree (human or JSON).
    Tree {
        /// Path to render (defaults to workspace root).
        #[arg(default_value = ".")]
        path: std::path::PathBuf,

        /// Max depth (0 = only the node itself).
        #[arg(long, default_value_t = 4)]
        depth: usize,
    },

    /// Describe a path (purpose, rules, boundaries).
    #[command(alias = "describe")]
    Info {
        /// Path to describe.
        path: std::path::PathBuf,
    },

    /// Generate/refresh README contracts.
    Gen {
        #[command(subcommand)]
        command: GenCommand,
    },

    /// Validate workspace structure against the selected blueprint.
    Validate,
}

#[derive(Debug, Subcommand)]
enum GenCommand {
    /// Generate README.md files for known blueprint directories.
    Readmes {
        /// Print what would change, but do not write.
        #[arg(long)]
        dry_run: bool,
    },
}

fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Command::Init {
            path,
            name,
            blueprint,
        } => {
            let path = resolve_user_path(path)?;
            let mut options = InitOptions::default();
            options.name = name;
            if let Some(blueprint) = blueprint {
                options.blueprint = blueprint;
            }
            let report = Workspace::init(path, options)?;
            if cli.json {
                println!(
                    "{}",
                    serde_json::to_string_pretty(&serde_json::json!({
                        "schema_version": "v0",
                        "root": report.root,
                        "config_path": report.config_path,
                        "created": report.created,
                    }))?
                );
            } else {
                println!("Initialized workspace at {}", report.root.display());
                for created in report.created {
                    println!("- created {}", created.display());
                }
            }
        }

        Command::Tree { path, depth } => {
            let path = resolve_user_path(path)?;
            let workspace = Workspace::discover(&path)?;
            let node = workspace.tree(path, depth)?;

            if cli.json {
                println!("{}", serde_json::to_string_pretty(&node)?);
            } else {
                print_tree(&node);
            }
        }

        Command::Info { path } => {
            let path = resolve_user_path(path)?;
            let workspace = Workspace::discover(&path)?;
            let info = workspace.info(path)?;

            if cli.json {
                println!("{}", serde_json::to_string_pretty(&info)?);
            } else {
                println!("path: {}", info.path);
                println!("kind: {}", info.kind);
                println!("type: {:?}", info.node_type);
                println!("exists: {}", info.exists);
                if let Some(purpose) = info.purpose.as_ref() {
                    println!("\nPurpose:\n{purpose}");
                }
                if !info.rules.is_empty() {
                    println!("\nRules:");
                    for rule in &info.rules {
                        println!("- {rule}");
                    }
                }
                if let Some(boundaries) = info.boundaries.as_ref() {
                    if !boundaries.allowed_children.is_empty() || !boundaries.disallowed.is_empty()
                    {
                        println!("\nBoundaries:");
                        if !boundaries.allowed_children.is_empty() {
                            println!("- allowed_children:");
                            for child in &boundaries.allowed_children {
                                println!("  - {child}");
                            }
                        }
                        if !boundaries.disallowed.is_empty() {
                            println!("- disallowed:");
                            for child in &boundaries.disallowed {
                                println!("  - {child}");
                            }
                        }
                    }
                }
                if let Some(readme_path) = info.readme_path.as_ref() {
                    println!("\nreadme: {readme_path}");
                }
            }
        }

        Command::Gen {
            command: GenCommand::Readmes { dry_run },
        } => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            let plan = workspace.plan_readmes()?;

            if cli.json {
                println!(
                    "{}",
                    serde_json::to_string_pretty(&serde_json::json!({
                        "schema_version": "v0",
                        "patches": plan.patches,
                        "skipped": plan.skipped,
                        "dry_run": dry_run,
                    }))?
                );
            } else {
                if plan.patches.is_empty() {
                    println!("No README changes.");
                } else {
                    println!("README changes:");
                    for patch in &plan.patches {
                        println!("- {:?} {}", patch.op, patch.path.display());
                    }
                }
                if !plan.skipped.is_empty() {
                    println!("\nSkipped (non-generated README exists):");
                    for path in &plan.skipped {
                        println!("- {}", path.display());
                    }
                }
            }

            if !dry_run {
                workspace
                    .apply_patches(&plan.patches)
                    .context("applying README patches")?;
            }
        }

        Command::Validate => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            let report = workspace.validate()?;

            if cli.json {
                println!("{}", serde_json::to_string_pretty(&report)?);
            } else if report.findings.is_empty() {
                println!("OK: no findings.");
            } else {
                println!(
                    "Findings: {} error(s), {} warning(s)",
                    report.summary.errors, report.summary.warnings
                );
                for finding in &report.findings {
                    let path = finding.path.as_deref().unwrap_or("-");
                    println!(
                        "- [{:?}] {} {} ({path})",
                        finding.severity, finding.code, finding.message
                    );
                }
            }

            if !report.valid {
                std::process::exit(1);
            }
        }
    }

    Ok(())
}

fn print_tree(node: &syntropy_sdk::TreeNode) {
    println!("{}", node.name);
    for (idx, child) in node.children.iter().enumerate() {
        let is_last = idx + 1 == node.children.len();
        print_tree_node(child, "", is_last);
    }
}

fn print_tree_node(node: &syntropy_sdk::TreeNode, prefix: &str, last: bool) {
    let connector = if last { "└── " } else { "├── " };

    if node.node_type == syntropy_sdk::NodeType::Dir {
        println!("{prefix}{connector}{}/ ({})", node.name, node.kind);
    } else {
        println!("{prefix}{connector}{}", node.name);
    }

    let next_prefix = if last {
        format!("{prefix}    ")
    } else {
        format!("{prefix}│   ")
    };

    for (idx, child) in node.children.iter().enumerate() {
        let is_last = idx + 1 == node.children.len();
        print_tree_node(child, &next_prefix, is_last);
    }
}

fn resolve_user_path(path: std::path::PathBuf) -> anyhow::Result<std::path::PathBuf> {
    if path.is_absolute() {
        return Ok(path);
    }

    Ok(std::env::current_dir()?.join(path))
}
