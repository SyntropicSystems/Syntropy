use crate::model::{Patch, PatchOp};
use crate::readmes::GENERATED_MARKER;
use crate::workspace::Workspace;
use std::collections::{BTreeMap, BTreeSet};
use std::path::{Path, PathBuf};
use walkdir::WalkDir;

const GENERATED_TOML_MARKER: &str = "# syntropy:generated";

#[derive(Debug, Clone)]
struct CanonicalAgent {
    key: String,
    domain_rel_dir: String,
    title: String,
    scope: String,
}

#[derive(Debug, Clone)]
struct CanonicalWorkflow {
    key: String,
    governed_by: String,
    title: String,
}

#[derive(Debug, Clone)]
pub struct AgentAdaptersPlan {
    pub patches: Vec<Patch>,
    pub conflicts: Vec<PathBuf>,
}

impl Workspace {
    pub fn plan_agent_adapters(&self) -> anyhow::Result<AgentAdaptersPlan> {
        let agents = discover_canonical_agents(&self.root)?;
        let workflows = discover_canonical_workflows(&self.root)?;

        let mut patches = Vec::<Patch>::new();
        let mut conflicts = Vec::<PathBuf>::new();

        let mut expected_paths = BTreeMap::<PathBuf, (&'static str, String)>::new();

        // 1) Claude agents
        for agent in &agents {
            let (content, _body) = render_claude_agent(agent);
            let path = self
                .root
                .join(".claude/agents")
                .join(format!("{}.md", agent.key));
            expected_paths.insert(path, (GENERATED_MARKER, content));
        }

        // 2) Claude commands (from canonical workflows)
        for wf in &workflows {
            let content = render_claude_command(wf);
            let path = self
                .root
                .join(".claude/commands")
                .join(format!("{}.md", wf.key));
            expected_paths.insert(path, (GENERATED_MARKER, content));
        }

        // 3) Codex agent role files
        for agent in &agents {
            let (_claude, body) = render_claude_agent(agent);
            let content = render_codex_agent(agent, &body);
            let path = self
                .root
                .join(".codex/agents")
                .join(format!("{}.toml", agent.key));
            expected_paths.insert(path, (GENERATED_TOML_MARKER, content));
        }

        // 4) Codex config
        let codex_config_path = self.root.join(".codex/config.toml");
        expected_paths.insert(
            codex_config_path,
            (GENERATED_TOML_MARKER, render_codex_config(&agents)),
        );

        // Create/update expected files.
        for (path, (marker, content)) in expected_paths.iter() {
            plan_generated_file(&mut patches, &mut conflicts, path, content, marker)?;
        }

        // Delete unexpected generated files.
        plan_extra_generated_files(
            &mut patches,
            &mut conflicts,
            &self.root.join(".claude/agents"),
            &expected_paths,
            GENERATED_MARKER,
        )?;
        plan_extra_generated_files(
            &mut patches,
            &mut conflicts,
            &self.root.join(".claude/commands"),
            &expected_paths,
            GENERATED_MARKER,
        )?;
        plan_extra_generated_files(
            &mut patches,
            &mut conflicts,
            &self.root.join(".codex/agents"),
            &expected_paths,
            GENERATED_TOML_MARKER,
        )?;

        Ok(AgentAdaptersPlan { patches, conflicts })
    }
}

fn discover_canonical_agents(workspace_root: &Path) -> anyhow::Result<Vec<CanonicalAgent>> {
    let domains_root = workspace_root.join(".syntropy/system-of-work/domains");
    if !domains_root.is_dir() {
        anyhow::bail!(
            "canonical domains root not found: {}",
            domains_root.display()
        );
    }

    let mut agents = Vec::<CanonicalAgent>::new();
    let mut seen_keys = BTreeSet::<String>::new();

    for entry in WalkDir::new(&domains_root)
        .follow_links(false)
        .into_iter()
        .filter_map(Result::ok)
    {
        if !entry.file_type().is_file() {
            continue;
        }
        if entry.file_name() != "AGENT.md" {
            continue;
        }

        let abs_agent_md = entry.into_path();
        let Some(abs_domain_dir) = abs_agent_md.parent() else {
            continue;
        };

        let domain_rel_dir = abs_domain_dir
            .strip_prefix(&workspace_root)
            .unwrap_or(abs_domain_dir)
            .to_string_lossy()
            .to_string();

        let leaf = abs_domain_dir
            .file_name()
            .unwrap_or_default()
            .to_string_lossy()
            .to_string();

        let mut key = leaf;
        if !seen_keys.insert(key.clone()) {
            let rel = abs_domain_dir
                .strip_prefix(&domains_root)
                .unwrap_or(abs_domain_dir);
            key = rel
                .to_string_lossy()
                .replace(std::path::MAIN_SEPARATOR, "-")
                .replace('/', "-");
            // Ensure uniqueness even in pathological cases.
            let mut counter = 2usize;
            while !seen_keys.insert(key.clone()) {
                key = format!("{key}-{counter}");
                counter += 1;
            }
        }

        let raw = std::fs::read_to_string(&abs_agent_md)?;
        let fm = parse_frontmatter(&raw);
        let title = fm.get("title").cloned().unwrap_or_else(|| key.clone());
        let scope = fm.get("scope").cloned().unwrap_or_default();

        agents.push(CanonicalAgent {
            key,
            domain_rel_dir,
            title,
            scope,
        });
    }

    agents.sort_by(|a, b| a.key.cmp(&b.key));
    Ok(agents)
}

fn discover_canonical_workflows(workspace_root: &Path) -> anyhow::Result<Vec<CanonicalWorkflow>> {
    let domains_root = workspace_root.join(".syntropy/system-of-work/domains");
    if !domains_root.is_dir() {
        return Ok(vec![]);
    }

    let mut workflows = Vec::<CanonicalWorkflow>::new();
    let mut seen_keys = BTreeSet::<String>::new();

    for entry in WalkDir::new(&domains_root)
        .follow_links(false)
        .into_iter()
        .filter_map(Result::ok)
    {
        if !entry.file_type().is_file() {
            continue;
        }

        let abs_path = entry.into_path();
        match abs_path.extension().and_then(|e| e.to_str()) {
            Some("md") => {}
            _ => continue,
        }
        if abs_path.file_name().is_some_and(|n| n == "README.md") {
            continue;
        }

        // Only workflows under domains/**/workflows/*.md
        if !abs_path
            .components()
            .any(|c| c.as_os_str().to_string_lossy() == "workflows")
        {
            continue;
        }

        let governed_by = abs_path
            .strip_prefix(workspace_root)
            .unwrap_or(abs_path.as_path())
            .to_string_lossy()
            .to_string();

        let mut key = abs_path
            .file_stem()
            .unwrap_or_default()
            .to_string_lossy()
            .to_string();
        if !seen_keys.insert(key.clone()) {
            let rel = abs_path
                .strip_prefix(&domains_root)
                .unwrap_or(abs_path.as_path());
            let fallback = rel
                .to_string_lossy()
                .replace(std::path::MAIN_SEPARATOR, "-")
                .replace('/', "-");
            key = format!("cmd-{fallback}");
            let mut counter = 2usize;
            while !seen_keys.insert(key.clone()) {
                key = format!("{key}-{counter}");
                counter += 1;
            }
        }

        let raw = std::fs::read_to_string(&abs_path)?;
        let title = extract_first_heading(&raw).unwrap_or_else(|| key.clone());

        workflows.push(CanonicalWorkflow {
            key,
            governed_by,
            title,
        });
    }

    workflows.sort_by(|a, b| a.key.cmp(&b.key));
    Ok(workflows)
}

fn extract_first_heading(markdown: &str) -> Option<String> {
    for line in markdown.lines() {
        let trimmed = line.trim();
        if trimmed.starts_with("# ") {
            return Some(trimmed.trim_start_matches("# ").trim().to_string());
        }
    }
    None
}

fn parse_frontmatter(markdown: &str) -> BTreeMap<String, String> {
    let mut out = BTreeMap::<String, String>::new();
    let mut lines = markdown.lines();

    if lines.next() != Some("---") {
        return out;
    }

    for line in lines.by_ref() {
        if line.trim() == "---" {
            break;
        }

        // Only parse top-level "key: value" lines.
        if line.starts_with(' ') || line.starts_with('\t') {
            continue;
        }

        let Some((k, v)) = line.split_once(':') else {
            continue;
        };
        let key = k.trim();
        let mut value = v.trim().to_string();

        if value.starts_with('"') && value.ends_with('"') && value.len() >= 2 {
            value = value[1..value.len() - 1].to_string();
        } else if value.starts_with('\'') && value.ends_with('\'') && value.len() >= 2 {
            value = value[1..value.len() - 1].to_string();
        }

        out.insert(key.to_string(), value);
    }

    out
}

fn render_claude_agent(agent: &CanonicalAgent) -> (String, String) {
    let description = if agent.scope.trim().is_empty() {
        format!("{} domain expert.", agent.title)
    } else {
        agent.scope.trim().to_string()
    };

    let owned_paths = owned_paths_for(agent);
    let verification_cmds = verification_commands_for(agent);

    let mut body = String::new();
    body.push_str(&format!("# {}\n\n", agent.title));
    body.push_str("## 1) Identity\n\n");
    body.push_str(&format!(
        "You are the **{}** domain expert and DRI proxy.\n\n",
        agent.title
    ));
    if !agent.scope.trim().is_empty() {
        body.push_str(&format!("**Scope**: {}\n\n", agent.scope.trim()));
    }

    body.push_str("## 2) First Actions (always)\n\n");
    body.push_str("Before doing anything else, load the domain brain:\n\n");
    body.push_str(&format!("- `{}/CONTEXT.md`\n", agent.domain_rel_dir));
    body.push_str(&format!("- `{}/POLICY.md`\n", agent.domain_rel_dir));
    body.push_str(&format!("- `{}/OWNER.md`\n", agent.domain_rel_dir));
    body.push('\n');
    body.push_str("Then:\n");
    body.push_str(
        "- Read `.syntropy/system-of-work/ROUTER.md` and choose the correct workflow(s)\n",
    );
    body.push_str("- Read the chosen workflow file(s) and follow them step-by-step\n\n");

    body.push_str("## 3) What You Own\n\n");
    body.push_str("You own and may update (as needed):\n\n");
    body.push_str(&format!("- `{}/**`\n", agent.domain_rel_dir));
    for path in owned_paths {
        body.push_str(&format!("- `{path}`\n"));
    }
    body.push('\n');

    body.push_str("## 4) What You Do Not Own\n\n");
    body.push_str("You do **not** own other domains’ canonical files. If asked to do work outside this scope, either:\n");
    body.push_str("- delegate by domain (consult `.syntropy/system-of-work/ROUTER.md`), or\n");
    body.push_str("- ask for confirmation before proceeding if scope is unclear/high-risk\n\n");

    body.push_str("## 5) Execution Rules (non-negotiable)\n\n");
    body.push_str("- **Workflows first**: start from `.syntropy/system-of-work/ROUTER.md`\n");
    body.push_str(
        "- **Follow the execution contract**: `.syntropy/system-of-work/EXECUTION_CONTRACT.md`\n",
    );
    body.push_str("- **No hand-edits** to `.claude/**` or `.codex/**`; regenerate with `syntropy agents sync`\n");
    body.push_str("- **No hacks / no dual paths / no TODOs** in final artifacts\n\n");

    body.push_str("## 6) Validation & Verification\n\n");
    if verification_cmds.is_empty() {
        body.push_str("- Run the relevant tests/linters for your change.\n");
        body.push_str(
            "- When changing structure/tooling, run `cargo run -p syntropy -- validate`.\n",
        );
    } else {
        for cmd in verification_cmds {
            body.push_str(&format!("- `{cmd}`\n"));
        }
    }
    body.push('\n');

    body.push_str("## 7) Delegation\n\n");
    body.push_str(
        "Preferred: use a formal agent role in `.claude/agents/{domain}.md` when it exists.\n\n",
    );
    body.push_str("Fallback (when no formal agent exists): load the domain brain at\n");
    body.push_str("`.syntropy/system-of-work/domains/{domain}/CONTEXT.md` (+ POLICY/OWNER) and proceed via workflows.\n\n");

    body.push_str("## 8) Outputs\n\n");
    body.push_str(
        "When asked for audits/reviews/validation results, produce crisp reports with:\n\n",
    );
    body.push_str("- What changed\n");
    body.push_str("- What was verified (commands + outcomes)\n");
    body.push_str("- Any drift found (and whether it was fixed or signaled)\n");

    let mut out = String::new();
    out.push_str("---\n");
    out.push_str(&format!("name: {}\n", agent.key));
    out.push_str("description: >\n");
    for line in wrap_text(&description, 76) {
        out.push_str("  ");
        out.push_str(&line);
        out.push('\n');
    }
    out.push_str("tools: Read, Glob, Grep, Edit, Write, Bash\n");
    out.push_str("model: inherit\n");
    out.push_str("---\n\n");
    out.push_str(GENERATED_MARKER);
    out.push('\n');
    out.push_str("<!-- GENERATED — DO NOT EDIT. -->\n");
    out.push_str("<!-- Run: cargo run -p syntropy -- agents sync -->\n\n");
    out.push_str(&body);

    (out, body)
}

fn owned_paths_for(agent: &CanonicalAgent) -> Vec<&'static str> {
    match agent.key.as_str() {
        "system" => vec![
            "AGENTS.md",
            "CLAUDE.md",
            ".syntropy/system-of-work/**",
            ".claude/**",
            ".codex/**",
        ],
        "product" => vec!["docs/product/**", "docs/vision/jtbd*.md"],
        "architecture" => vec!["docs/architecture/**", "docs/decisions/**"],
        "ux" => vec!["docs/product/ux/**", "prototypes/**", "surfaces/**"],
        "integration" => vec![
            "docs/architecture/integrations.md",
            "docs/product/features/f03-gmail-integration.md",
        ],
        "workspace-contracts" => vec![
            "syntropy.toml",
            ".syntropy/**",
            "platform/crates/syntropy-sdk/**",
            "products/command-center/apps/cli/**",
            "docs/product/workspace-platform/**",
            "docs/architecture/workspace-contracts.md",
            "docs/architecture/plan-apply-engine.md",
            "docs/architecture/north-star-layout.md",
        ],
        "bazel" => vec!["MODULE.bazel", "BUILD.bazel", ".bazelrc", "**/BUILD.bazel"],
        "devex" => vec![
            ".devcontainer/**",
            "package.json",
            "pnpm-workspace.yaml",
            "Cargo.toml",
        ],
        "tasks" => vec!["docs/workflows/**"],
        "observations" => vec![
            "observations/**",
            "docs/workflows/capture-observation.md",
            "docs/workflows/audit-observations.md",
        ],
        "decisions" => vec!["docs/decisions/**", "docs/workflows/record-decision.md"],
        "cognitive-engineering" => vec!["docs/product/dev-platform/**"],
        "operational-engineering" => vec!["docs/product/dev-platform/**", "docs/workflows/**"],
        "pulse-companion" => vec!["docs/product/dev-platform/**", "docs/workflows/reflect.md"],
        "f04-ai-engine" => vec![
            "docs/product/features/f04-ai-action-engine.md",
            "docs/architecture/ai-pipeline.md",
        ],
        "f11-domains" => vec![
            "docs/product/features/f11-domains-spaces.md",
            "docs/product/ux/spaces-navigation.md",
        ],
        "f12-artifact" => vec![
            "docs/product/features/f12-artifact-intelligence.md",
            "docs/product/ux/artifact-intelligence-flow.md",
        ],
        _ => vec![],
    }
}

fn verification_commands_for(agent: &CanonicalAgent) -> Vec<&'static str> {
    match agent.key.as_str() {
        "system" => vec![
            "cargo run -p syntropy -- agents sync",
            "cargo run -p syntropy -- agents check",
            "cargo run -p syntropy -- validate",
        ],
        "workspace-contracts" => vec!["cargo test", "cargo run -p syntropy -- validate"],
        "bazel" => vec!["bazel test //... (if available)"],
        "devex" => vec!["pnpm -w lint (if available)", "pnpm -w test (if available)"],
        _ => vec![],
    }
}

fn render_codex_config(agents: &[CanonicalAgent]) -> String {
    let mut out = String::new();
    out.push_str(GENERATED_TOML_MARKER);
    out.push('\n');
    out.push_str("# Syntropy Codex project configuration\n");
    out.push_str("#\n");
    out.push_str("# This file is generated. Do not edit by hand.\n");
    out.push_str("# To regenerate:\n");
    out.push_str("#   cargo run -p syntropy -- agents sync\n\n");

    out.push_str("[features]\n");
    out.push_str("multi_agent = true\n\n");

    out.push_str("[agents]\n");
    out.push_str("max_threads = 8\n\n");

    out.push_str("# BEGIN GENERATED AGENTS (syntropy agents sync)\n");
    for agent in agents {
        let description = if agent.scope.trim().is_empty() {
            format!("{} domain expert.", agent.title)
        } else {
            agent.scope.trim().to_string()
        };

        out.push_str(&format!("[agents.{}]\n", agent.key));
        out.push_str(&format!(
            "description = {}\n",
            toml_string_literal(&description)
        ));
        out.push_str(&format!(
            "config_file = {}\n\n",
            toml_string_literal(&format!("agents/{}.toml", agent.key))
        ));
    }
    out.push_str("# END GENERATED AGENTS (syntropy agents sync)\n");

    out
}

fn render_codex_agent(agent: &CanonicalAgent, claude_body: &str) -> String {
    let mut out = String::new();
    out.push_str(GENERATED_TOML_MARKER);
    out.push('\n');
    out.push_str("# This file is generated. Do not edit by hand.\n");
    out.push_str(&format!("# Source: .claude/agents/{}.md\n", agent.key));
    out.push_str("#\n");
    out.push_str("# To regenerate:\n");
    out.push_str("#   cargo run -p syntropy -- agents sync\n\n");

    out.push_str("developer_instructions = '''");
    out.push_str(claude_body.trim_end());
    out.push_str("'''\n");
    out
}

fn render_claude_command(wf: &CanonicalWorkflow) -> String {
    let mut out = String::new();
    out.push_str("---\n");
    out.push_str(&format!("governed-by: {}\n", wf.governed_by));
    out.push_str("router-entry: .syntropy/system-of-work/ROUTER.md\n");
    out.push_str("---\n\n");
    out.push_str(GENERATED_MARKER);
    out.push('\n');
    out.push_str("<!-- GENERATED — DO NOT EDIT. -->\n");
    out.push_str("<!-- Run: cargo run -p syntropy -- agents sync -->\n\n");
    out.push_str(&format!("# {}\n\n", wf.title));
    out.push_str("## Instructions\n\n");
    out.push_str(&format!("1. Read the workflow at `{}`\n", wf.governed_by));
    out.push_str("2. Follow it step-by-step\n\n");
    out.push_str("$ARGUMENTS\n\n");
    out.push_str("---\n\n");
    out.push_str("## Governance\n\n");
    out.push_str(&format!(
        "**This file is governed by**: `{}`\n",
        wf.governed_by
    ));
    out.push('\n');
    out
}

fn toml_string_literal(value: &str) -> String {
    // Minimal TOML string escaping.
    format!(
        "\"{}\"",
        value
            .replace('\\', "\\\\")
            .replace('\"', "\\\"")
            .replace('\n', "\\n")
    )
}

fn wrap_text(text: &str, width: usize) -> Vec<String> {
    let mut out = Vec::<String>::new();
    let mut line = String::new();

    for word in text.split_whitespace() {
        if line.is_empty() {
            line.push_str(word);
            continue;
        }

        if line.len() + 1 + word.len() > width {
            out.push(line);
            line = word.to_string();
        } else {
            line.push(' ');
            line.push_str(word);
        }
    }

    if !line.is_empty() {
        out.push(line);
    }

    if out.is_empty() {
        out.push(String::new());
    }

    out
}

fn plan_generated_file(
    patches: &mut Vec<Patch>,
    conflicts: &mut Vec<PathBuf>,
    path: &Path,
    content: &str,
    marker: &str,
) -> anyhow::Result<()> {
    match std::fs::read_to_string(path) {
        Ok(existing) => {
            if !existing.contains(marker) {
                conflicts.push(path.to_path_buf());
                return Ok(());
            }

            if existing != content {
                patches.push(Patch {
                    op: PatchOp::Update,
                    path: path.to_path_buf(),
                    content: content.to_string(),
                });
            }
        }
        Err(err) if err.kind() == std::io::ErrorKind::NotFound => patches.push(Patch {
            op: PatchOp::Create,
            path: path.to_path_buf(),
            content: content.to_string(),
        }),
        Err(err) => return Err(err.into()),
    }

    Ok(())
}

fn plan_extra_generated_files(
    patches: &mut Vec<Patch>,
    conflicts: &mut Vec<PathBuf>,
    dir: &Path,
    expected: &BTreeMap<PathBuf, (&'static str, String)>,
    marker: &str,
) -> anyhow::Result<()> {
    if !dir.is_dir() {
        return Ok(());
    }

    for entry in std::fs::read_dir(dir)? {
        let entry = entry?;
        let path = entry.path();
        if entry.file_type()?.is_dir() {
            continue;
        }
        if expected.contains_key(&path) {
            continue;
        }

        match std::fs::read_to_string(&path) {
            Ok(existing) => {
                if existing.contains(marker) {
                    patches.push(Patch {
                        op: PatchOp::Delete,
                        path,
                        content: String::new(),
                    });
                } else {
                    conflicts.push(path);
                }
            }
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => {}
            Err(err) => return Err(err.into()),
        }
    }

    Ok(())
}
