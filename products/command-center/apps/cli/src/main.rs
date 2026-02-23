use anyhow::Context;
use clap::{ColorChoice, CommandFactory, Parser, Subcommand};
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

    /// Generate/refresh deterministic workspace artifacts.
    Gen {
        #[command(subcommand)]
        command: GenCommand,
    },

    /// Validate workspace structure against the selected blueprint.
    Validate,

    /// Run all drift gates and workspace validation.
    Check,

    #[command(hide = true)]
    Agents {
        #[command(subcommand)]
        command: LegacyAgentsCommand,
    },
}

#[derive(Debug, Subcommand)]
enum GenCommand {
    /// Generate README.md files for known blueprint directories.
    Readmes {
        /// Print what would change, but do not write.
        #[arg(long)]
        dry_run: bool,

        /// Fail if README generation would make changes (drift gate).
        #[arg(long)]
        check: bool,
    },

    /// Generate/refresh `.claude/**` and `.codex/**` adapters from canonical specs.
    Agents {
        /// Print what would change, but do not write.
        #[arg(long)]
        dry_run: bool,

        /// Fail if adapter generation would make changes (drift gate).
        #[arg(long)]
        check: bool,
    },

    /// Generate/refresh CLI reference documentation.
    #[command(name = "cli-docs")]
    CliDocs {
        /// Print what would change, but do not write.
        #[arg(long)]
        dry_run: bool,

        /// Fail if CLI doc generation would make changes (drift gate).
        #[arg(long)]
        check: bool,
    },

    /// Run all generators (CLI docs, README contracts, agent adapters).
    All {
        /// Print what would change, but do not write.
        #[arg(long)]
        dry_run: bool,

        /// Fail if generation would make changes (drift gate).
        #[arg(long)]
        check: bool,
    },
}

#[derive(Debug, Subcommand)]
enum LegacyAgentsCommand {
    Sync {
        #[arg(long)]
        dry_run: bool,
    },

    Check,
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
            command: GenCommand::Readmes { dry_run, check },
        } => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            let plan = workspace.plan_readmes()?;
            let ok = plan.patches.is_empty();

            if cli.json {
                println!(
                    "{}",
                    serde_json::to_string_pretty(&serde_json::json!({
                        "schema_version": "v0",
                        "ok": ok,
                        "patches": plan.patches,
                        "skipped": plan.skipped,
                        "dry_run": dry_run,
                        "check": check,
                    }))?
                );
            } else {
                if check && ok {
                    println!("OK: README contracts are up-to-date.");
                } else if plan.patches.is_empty() {
                    println!("No README changes.");
                } else {
                    println!(
                        "{}:",
                        if check {
                            "Drift detected"
                        } else {
                            "README changes"
                        }
                    );
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

            if check && !ok {
                std::process::exit(1);
            }

            if !dry_run && !check {
                workspace
                    .apply_patches(&plan.patches)
                    .context("applying README patches")?;
            }
        }

        Command::Gen {
            command: GenCommand::Agents { dry_run, check },
        } => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            run_gen_agents(&cli, &workspace, dry_run, check)?;
        }

        Command::Gen {
            command: GenCommand::CliDocs { dry_run, check },
        } => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            run_gen_cli_docs(&cli, &workspace, dry_run, check)?;
        }

        Command::Gen {
            command: GenCommand::All { dry_run, check },
        } => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            run_gen_all(&cli, &workspace, dry_run, check)?;
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

        Command::Check => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            run_check(&cli, &workspace)?;
        }

        Command::Agents {
            command: LegacyAgentsCommand::Sync { dry_run },
        } => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            run_gen_agents(&cli, &workspace, dry_run, false)?;
        }

        Command::Agents {
            command: LegacyAgentsCommand::Check,
        } => {
            let workspace = Workspace::discover(std::env::current_dir()?)?;
            run_gen_agents(&cli, &workspace, true, true)?;
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

fn run_gen_agents(cli: &Cli, workspace: &Workspace, dry_run: bool, check: bool) -> anyhow::Result<()> {
    let plan = workspace.plan_agent_adapters()?;
    let ok = plan.patches.is_empty() && plan.conflicts.is_empty();

    if cli.json {
        println!(
            "{}",
            serde_json::to_string_pretty(&serde_json::json!({
                "schema_version": "v0",
                "ok": ok,
                "patches": plan.patches,
                "conflicts": plan.conflicts,
                "dry_run": dry_run,
                "check": check,
            }))?
        );
    } else if ok {
        if check {
            println!("OK: agent adapters are up-to-date.");
        } else {
            println!("No agent adapter changes.");
        }
    } else {
        println!("{}", if check { "Drift detected:" } else { "Agent adapter changes:" });
        for patch in &plan.patches {
            println!("- {:?} {}", patch.op, patch.path.display());
        }

        if !plan.conflicts.is_empty() {
            println!("\nConflicts (non-generated file exists):");
            for path in &plan.conflicts {
                println!("- {}", path.display());
            }
        }
    }

    if check && !ok {
        std::process::exit(1);
    }

    if !dry_run && !check {
        if !plan.conflicts.is_empty() {
            anyhow::bail!("refusing to write: conflicts exist");
        }

        workspace
            .apply_patches(&plan.patches)
            .context("applying agent adapter patches")?;
    }

    Ok(())
}

fn run_gen_cli_docs(
    cli: &Cli,
    workspace: &Workspace,
    dry_run: bool,
    check: bool,
) -> anyhow::Result<()> {
    let (patches, conflicts) = plan_cli_reference(workspace)?;
    let ok = patches.is_empty() && conflicts.is_empty();

    if cli.json {
        println!(
            "{}",
            serde_json::to_string_pretty(&serde_json::json!({
                "schema_version": "v0",
                "ok": ok,
                "patches": patches,
                "conflicts": conflicts,
                "dry_run": dry_run,
                "check": check,
            }))?
        );
    } else if ok {
        if check {
            println!("OK: CLI reference is up-to-date.");
        } else {
            println!("No CLI doc changes.");
        }
    } else {
        println!("{}", if check { "Drift detected:" } else { "CLI doc changes:" });
        for patch in &patches {
            println!("- {:?} {}", patch.op, patch.path.display());
        }
        if !conflicts.is_empty() {
            println!("\nConflicts (non-generated file exists):");
            for path in &conflicts {
                println!("- {}", path.display());
            }
        }
    }

    if check && !ok {
        std::process::exit(1);
    }

    if !dry_run && !check {
        if !conflicts.is_empty() {
            anyhow::bail!("refusing to write: conflicts exist");
        }

        workspace
            .apply_patches(&patches)
            .context("applying CLI doc patches")?;
    }

    Ok(())
}

fn run_gen_all(cli: &Cli, workspace: &Workspace, dry_run: bool, check: bool) -> anyhow::Result<()> {
    let (cli_patches, cli_conflicts) = plan_cli_reference(workspace)?;
    let cli_ok = cli_patches.is_empty() && cli_conflicts.is_empty();

    let readmes_plan = workspace.plan_readmes()?;
    let readmes_ok = readmes_plan.patches.is_empty();

    let agents_plan = workspace.plan_agent_adapters()?;
    let agents_ok = agents_plan.patches.is_empty() && agents_plan.conflicts.is_empty();

    let ok = cli_ok && readmes_ok && agents_ok;

    if cli.json {
        println!(
            "{}",
            serde_json::to_string_pretty(&serde_json::json!({
                "schema_version": "v0",
                "ok": ok,
                "dry_run": dry_run,
                "check": check,
                "cli_docs": {
                    "ok": cli_ok,
                    "patches": cli_patches,
                    "conflicts": cli_conflicts,
                },
                "readmes": {
                    "ok": readmes_ok,
                    "patches": readmes_plan.patches,
                    "skipped": readmes_plan.skipped,
                },
                "agents": {
                    "ok": agents_ok,
                    "patches": agents_plan.patches,
                    "conflicts": agents_plan.conflicts,
                }
            }))?
        );
    } else {
        println!("Generators:");
        println!("- cli-docs: {}", if cli_ok { "OK" } else { "drift/conflict" });
        println!("- readmes: {}", if readmes_ok { "OK" } else { "drift" });
        println!("- agents: {}", if agents_ok { "OK" } else { "drift/conflict" });

        if !cli_ok {
            if !cli_patches.is_empty() {
                println!("\nCLI doc changes:");
                for patch in &cli_patches {
                    println!("- {:?} {}", patch.op, patch.path.display());
                }
            }
            if !cli_conflicts.is_empty() {
                println!("\nCLI doc conflicts (non-generated file exists):");
                for path in &cli_conflicts {
                    println!("- {}", path.display());
                }
            }
        }

        if !readmes_ok {
            println!("\nREADME changes:");
            for patch in &readmes_plan.patches {
                println!("- {:?} {}", patch.op, patch.path.display());
            }
        }
        if !readmes_plan.skipped.is_empty() {
            println!("\nSkipped READMEs (non-generated README exists):");
            for path in &readmes_plan.skipped {
                println!("- {}", path.display());
            }
        }

        if !agents_ok {
            if !agents_plan.patches.is_empty() {
                println!("\nAgent adapter changes:");
                for patch in &agents_plan.patches {
                    println!("- {:?} {}", patch.op, patch.path.display());
                }
            }
            if !agents_plan.conflicts.is_empty() {
                println!("\nAgent adapter conflicts (non-generated file exists):");
                for path in &agents_plan.conflicts {
                    println!("- {}", path.display());
                }
            }
        }
    }

    if check && !ok {
        std::process::exit(1);
    }

    if !dry_run && !check {
        if !cli_conflicts.is_empty() || !agents_plan.conflicts.is_empty() {
            anyhow::bail!("refusing to write: conflicts exist");
        }

        let mut patches = Vec::<syntropy_sdk::Patch>::new();
        patches.extend(cli_patches);
        patches.extend(readmes_plan.patches);
        patches.extend(agents_plan.patches);

        if !patches.is_empty() {
            workspace
                .apply_patches(&patches)
                .context("applying generator patches")?;
        }
    }

    Ok(())
}

fn run_check(cli: &Cli, workspace: &Workspace) -> anyhow::Result<()> {
    let (cli_patches, cli_conflicts) = plan_cli_reference(workspace)?;
    let cli_ok = cli_patches.is_empty() && cli_conflicts.is_empty();

    let readmes_plan = workspace.plan_readmes()?;
    let readmes_ok = readmes_plan.patches.is_empty();

    let agents_plan = workspace.plan_agent_adapters()?;
    let agents_ok = agents_plan.patches.is_empty() && agents_plan.conflicts.is_empty();

    let validation = workspace.validate()?;
    let validate_ok = validation.valid;

    let ok = cli_ok && readmes_ok && agents_ok && validate_ok;

    if cli.json {
        println!(
            "{}",
            serde_json::to_string_pretty(&serde_json::json!({
                "schema_version": "v0",
                "ok": ok,
                "generators": {
                    "cli_docs": {
                        "ok": cli_ok,
                        "patches": cli_patches,
                        "conflicts": cli_conflicts,
                    },
                    "readmes": {
                        "ok": readmes_ok,
                        "patches": readmes_plan.patches,
                        "skipped": readmes_plan.skipped,
                    },
                    "agents": {
                        "ok": agents_ok,
                        "patches": agents_plan.patches,
                        "conflicts": agents_plan.conflicts,
                    }
                },
                "validate": {
                    "ok": validate_ok,
                    "report": validation,
                }
            }))?
        );
    } else {
        println!("Check:");
        println!("- gen cli-docs --check: {}", if cli_ok { "OK" } else { "FAIL" });
        println!("- gen readmes --check: {}", if readmes_ok { "OK" } else { "FAIL" });
        println!("- gen agents --check: {}", if agents_ok { "OK" } else { "FAIL" });
        println!("- validate: {}", if validate_ok { "OK" } else { "FAIL" });

        if !cli_ok {
            if !cli_patches.is_empty() {
                println!("\nCLI doc drift:");
                for patch in &cli_patches {
                    println!("- {:?} {}", patch.op, patch.path.display());
                }
            }
            if !cli_conflicts.is_empty() {
                println!("\nCLI doc conflicts (non-generated file exists):");
                for path in &cli_conflicts {
                    println!("- {}", path.display());
                }
            }
        }

        if !readmes_ok {
            println!("\nREADME drift:");
            for patch in &readmes_plan.patches {
                println!("- {:?} {}", patch.op, patch.path.display());
            }
        }
        if !readmes_plan.skipped.is_empty() {
            println!("\nSkipped READMEs (non-generated README exists):");
            for path in &readmes_plan.skipped {
                println!("- {}", path.display());
            }
        }

        if !agents_ok {
            if !agents_plan.patches.is_empty() {
                println!("\nAgent adapter drift:");
                for patch in &agents_plan.patches {
                    println!("- {:?} {}", patch.op, patch.path.display());
                }
            }
            if !agents_plan.conflicts.is_empty() {
                println!("\nAgent adapter conflicts (non-generated file exists):");
                for path in &agents_plan.conflicts {
                    println!("- {}", path.display());
                }
            }
        }

        if validation.findings.is_empty() {
            println!("\nWorkspace validation: OK (no findings).");
        } else {
            println!(
                "\nWorkspace validation findings: {} error(s), {} warning(s)",
                validation.summary.errors, validation.summary.warnings
            );
            for finding in &validation.findings {
                let path = finding.path.as_deref().unwrap_or("-");
                println!(
                    "- [{:?}] {} {} ({path})",
                    finding.severity, finding.code, finding.message
                );
            }
        }
    }

    if !ok {
        std::process::exit(1);
    }

    Ok(())
}

fn plan_cli_reference(workspace: &Workspace) -> anyhow::Result<(Vec<syntropy_sdk::Patch>, Vec<std::path::PathBuf>)> {
    let rel = std::path::PathBuf::from("products/command-center/apps/cli/CLI_REFERENCE.md");
    let abs = workspace.root().join(&rel);

    let expected = render_cli_reference();

    let mut patches = Vec::<syntropy_sdk::Patch>::new();
    let mut conflicts = Vec::<std::path::PathBuf>::new();

    match std::fs::read_to_string(&abs) {
        Ok(existing) => {
            if !existing.contains("<!-- syntropy:generated -->") {
                conflicts.push(abs);
            } else if existing != expected {
                patches.push(syntropy_sdk::Patch {
                    op: syntropy_sdk::PatchOp::Update,
                    path: abs,
                    content: expected,
                });
            }
        }
        Err(err) if err.kind() == std::io::ErrorKind::NotFound => patches.push(syntropy_sdk::Patch {
            op: syntropy_sdk::PatchOp::Create,
            path: abs,
            content: expected,
        }),
        Err(err) => return Err(err.into()),
    }

    Ok((patches, conflicts))
}

fn render_cli_reference() -> String {
    let root = Cli::command()
        .color(ColorChoice::Never)
        .term_width(100)
        .max_term_width(100);

    let mut cmds = Vec::<(Vec<String>, clap::Command)>::new();
    collect_cli_commands(&root, Vec::new(), &mut cmds);

    let mut out = String::new();
    out.push_str("<!-- syntropy:generated -->\n");
    out.push_str("# Syntropy CLI Reference\n\n");
    out.push_str("Generated by `syntropy gen cli-docs`.\n\n");

    for (path, mut cmd) in cmds {
        let invocation = if path.is_empty() {
            "syntropy".to_string()
        } else {
            format!("syntropy {}", path.join(" "))
        };

        cmd = cmd
            .color(ColorChoice::Never)
            .term_width(100)
            .max_term_width(100);
        cmd.set_bin_name(invocation.clone());

        let help = cmd.render_long_help().to_string();

        out.push_str(&format!("## `{invocation}`\n\n"));
        out.push_str("```text\n");
        out.push_str(help.trim_end());
        out.push_str("\n```\n\n");
    }

    out
}

fn collect_cli_commands(cmd: &clap::Command, path: Vec<String>, out: &mut Vec<(Vec<String>, clap::Command)>) {
    if cmd.get_name() == "help" {
        return;
    }
    if cmd.is_hide_set() && !path.is_empty() {
        return;
    }

    out.push((path.clone(), cmd.clone()));

    let mut subs: Vec<clap::Command> = cmd.get_subcommands().cloned().collect();
    subs.sort_by(|a, b| a.get_name().cmp(b.get_name()));

    for sub in subs {
        if sub.get_name() == "help" || sub.is_hide_set() {
            continue;
        }
        let mut next_path = path.clone();
        next_path.push(sub.get_name().to_string());
        collect_cli_commands(&sub, next_path, out);
    }
}
