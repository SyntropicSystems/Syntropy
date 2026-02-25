use crate::model::{
    CheckReport, CheckStepResult, DocFinding, DocsReport, DocsSummary, DocsSyncPlan,
    FindingSeverity, GeneratedFilePlan, Patch, PatchOp, ValidationReport,
};
use crate::paths::{lexical_normalize, path_to_slash_string, rel_path_to_output_string};
use crate::readmes::ReadmePlan;
use crate::workspace::Workspace;
use std::collections::{BTreeMap, BTreeSet};
use std::io::Read;
use std::path::{Path, PathBuf};
use walkdir::WalkDir;

const GENERATED_MARKER_MD: &str = "<!-- syntropy:generated -->";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum DocSourceKind {
    Markdown,
    PrototypeJsx,
}

#[derive(Debug, Clone)]
struct ParsedDoc {
    id: String,
    doc_type: String,
    title: String,
    status: String,
    owner: Option<String>,
    scope: Option<String>,
    updated: String,
    refs: BTreeMap<String, Vec<String>>,
    rel_path: PathBuf,
    abs_path: PathBuf,
    source_kind: DocSourceKind,
}

#[derive(Debug, Clone)]
struct FrontmatterRaw {
    values: BTreeMap<String, String>,
    refs: BTreeMap<String, Vec<String>>,
}

impl FrontmatterRaw {
    fn get(&self, key: &str) -> Option<&String> {
        self.values.get(key)
    }
}

#[derive(Debug, Clone)]
struct FrontmatterSpans {
    frontmatter_lines: Vec<String>,
    body_start: usize,
}

#[derive(Debug, Clone)]
struct PrototypeSpans {
    frontmatter_lines: Vec<String>,
    comment_end: usize,
}

impl Workspace {
    pub fn docs_check(&self) -> anyhow::Result<DocsReport> {
        let discovered = discover_doc_candidates(&self.root);

        let mut findings = Vec::<DocFinding>::new();
        let mut parsed = Vec::<ParsedDoc>::new();

        for (rel_path, kind) in discovered {
            let abs_path = self.root.join(&rel_path);
            let content = match std::fs::read_to_string(&abs_path) {
                Ok(c) => c,
                Err(err) => {
                    findings.push(DocFinding {
                        code: "DG001".to_string(),
                        severity: FindingSeverity::Error,
                        message: format!("failed to read file: {err}"),
                        path: rel_path_to_output_string(&rel_path),
                        doc_id: None,
                        ref_id: None,
                        ref_key: None,
                    });
                    continue;
                }
            };

            let fm = match kind {
                DocSourceKind::Markdown => match parse_markdown_frontmatter(&content) {
                    Ok((fm, _spans)) => fm,
                    Err(err) => {
                        findings.push(DocFinding {
                            code: "DG001".to_string(),
                            severity: FindingSeverity::Error,
                            message: err.to_string(),
                            path: rel_path_to_output_string(&rel_path),
                            doc_id: None,
                            ref_id: None,
                            ref_key: None,
                        });
                        continue;
                    }
                },
                DocSourceKind::PrototypeJsx => match parse_prototype_frontmatter(&content) {
                    Ok((fm, _spans)) => fm,
                    Err(err) => {
                        findings.push(DocFinding {
                            code: "DG001".to_string(),
                            severity: FindingSeverity::Error,
                            message: err.to_string(),
                            path: rel_path_to_output_string(&rel_path),
                            doc_id: None,
                            ref_id: None,
                            ref_key: None,
                        });
                        continue;
                    }
                },
            };

            let doc_id = fm.get("id").cloned();
            let doc_type = fm.get("type").cloned();
            let title = fm.get("title").cloned();
            let status = fm.get("status").cloned();
            let owner = fm.get("owner").cloned();
            let observer = fm.get("observer").cloned();
            let scope = fm.get("scope").cloned();
            let updated = fm.get("updated").cloned();

            let mut missing = Vec::<&'static str>::new();
            for key in ["id", "type", "title", "status", "created", "updated"] {
                if fm.get(key).is_none() {
                    missing.push(key);
                }
            }

            if let Some(t) = doc_type.as_deref() {
                match t {
                    "observation" => {
                        if observer.is_none() {
                            missing.push("observer");
                        }
                    }
                    "agent-manifest" => {
                        if scope.is_none() {
                            missing.push("scope");
                        }
                    }
                    _ => {
                        if owner.is_none() {
                            missing.push("owner");
                        }
                    }
                }
            } else if owner.is_none() {
                // If type is missing, require owner (consistent default).
                missing.push("owner");
            }

            if !missing.is_empty() {
                findings.push(DocFinding {
                    code: "DG003".to_string(),
                    severity: FindingSeverity::Error,
                    message: format!("missing required frontmatter field(s): {}", missing.join(", ")),
                    path: rel_path_to_output_string(&rel_path),
                    doc_id: doc_id.clone(),
                    ref_id: None,
                    ref_key: None,
                });
                // Still continue parsing; if id is present we can include it for
                // duplicate/refs checks.
            }

            let Some(id) = doc_id else {
                continue;
            };

            parsed.push(ParsedDoc {
                id,
                doc_type: doc_type.unwrap_or_else(|| "unknown".to_string()),
                title: title.unwrap_or_else(|| "".to_string()),
                status: status.unwrap_or_else(|| "".to_string()),
                owner,
                scope,
                updated: updated.unwrap_or_else(|| "".to_string()),
                refs: fm.refs,
                rel_path,
                abs_path,
                source_kind: kind,
            });
        }

        // Duplicate IDs.
        let mut id_to_paths = BTreeMap::<String, Vec<String>>::new();
        for doc in &parsed {
            id_to_paths
                .entry(doc.id.clone())
                .or_default()
                .push(rel_path_to_output_string(&doc.rel_path));
        }

        for (id, paths) in id_to_paths.iter() {
            if paths.len() > 1 {
                for path in paths {
                    findings.push(DocFinding {
                        code: "DG004".to_string(),
                        severity: FindingSeverity::Error,
                        message: format!("duplicate id: {id}"),
                        path: path.to_string(),
                        doc_id: Some(id.to_string()),
                        ref_id: None,
                        ref_key: None,
                    });
                }
            }
        }

        // Build ID → doc lookup for ref validation/backrefs.
        let mut docs_by_id = BTreeMap::<String, ParsedDoc>::new();
        for doc in parsed.into_iter() {
            if docs_by_id.contains_key(&doc.id) {
                continue;
            }
            docs_by_id.insert(doc.id.clone(), doc);
        }

        // Unknown refs.
        for (id, doc) in docs_by_id.iter() {
            for (key, ids) in doc.refs.iter() {
                if key == "domain" {
                    continue;
                }
                for ref_id in ids {
                    if !docs_by_id.contains_key(ref_id) {
                        findings.push(DocFinding {
                            code: "DG005".to_string(),
                            severity: FindingSeverity::Error,
                            message: format!("unknown ref target: {ref_id}"),
                            path: rel_path_to_output_string(&doc.rel_path),
                            doc_id: Some(id.clone()),
                            ref_id: Some(ref_id.clone()),
                            ref_key: Some(key.clone()),
                        });
                    }
                }
            }
        }

        // Backrefs.
        for (a_id, a_doc) in docs_by_id.iter() {
            for (key, b_ids) in a_doc.refs.iter() {
                if key == "domain" {
                    continue;
                }
                for b_id in b_ids {
                    let Some(b_doc) = docs_by_id.get(b_id) else {
                        continue;
                    };
                    if !doc_has_ref_to(b_doc, a_id) {
                        findings.push(DocFinding {
                            code: "DG006".to_string(),
                            severity: FindingSeverity::Error,
                            message: format!("missing backref: {b_id} → {a_id}"),
                            path: rel_path_to_output_string(&a_doc.rel_path),
                            doc_id: Some(a_id.clone()),
                            ref_id: Some(b_id.clone()),
                            ref_key: Some(key.clone()),
                        });
                    }
                }
            }
        }

        // Deterministic order: path, then code, then message.
        findings.sort_by(|a, b| {
            (a.path.as_str(), a.code.as_str(), a.message.as_str()).cmp(&(
                b.path.as_str(),
                b.code.as_str(),
                b.message.as_str(),
            ))
        });

        let errors = findings
            .iter()
            .filter(|f| matches!(f.severity, FindingSeverity::Error))
            .count();
        let warnings = findings
            .iter()
            .filter(|f| matches!(f.severity, FindingSeverity::Warning))
            .count();

        Ok(DocsReport {
            schema_version: "v0".to_string(),
            valid: errors == 0,
            findings,
            summary: DocsSummary { errors, warnings },
        })
    }

    pub fn plan_docs_sync(&self) -> anyhow::Result<DocsSyncPlan> {
        let docs = parse_all_docs_strict(&self.root)?;
        let docs_by_id = index_docs_by_id(&docs)?;

        let missing = find_missing_backrefs(&docs_by_id);
        if missing.is_empty() {
            return Ok(DocsSyncPlan { patches: vec![] });
        }

        // Apply additions per target doc id.
        let mut additions = BTreeMap::<String, BTreeMap<String, BTreeSet<String>>>::new();
        for m in missing {
            let reciprocal_key = reciprocal_ref_key(m.ref_key.as_str());
            additions
                .entry(m.to_id.clone())
                .or_default()
                .entry(reciprocal_key.to_string())
                .or_default()
                .insert(m.from_id.clone());
        }

        let mut patches = Vec::<Patch>::new();
        for (target_id, by_key) in additions {
            let Some(doc) = docs_by_id.get(&target_id) else {
                continue;
            };

            let mut new_refs = doc.refs.clone();
            for (key, ids) in by_key {
                let entry = new_refs.entry(key).or_default();
                for id in ids {
                    entry.push(id);
                }
            }

            for ids in new_refs.values_mut() {
                sort_dedup(ids);
            }

            let content = std::fs::read_to_string(&doc.abs_path)?;
            let updated = match doc.source_kind {
                DocSourceKind::Markdown => rewrite_markdown_refs(&content, &new_refs)?,
                DocSourceKind::PrototypeJsx => rewrite_prototype_refs(&content, &new_refs)?,
            };

            if updated != content {
                patches.push(Patch {
                    op: PatchOp::Update,
                    path: doc.abs_path.clone(),
                    content: updated,
                });
            }
        }

        patches.sort_by(|a, b| a.path.cmp(&b.path));
        Ok(DocsSyncPlan { patches })
    }

    pub fn plan_registry(&self, force: bool) -> anyhow::Result<GeneratedFilePlan> {
        let registry_rel = PathBuf::from("docs/_registry.md");
        let registry_abs = self.root.join(&registry_rel);

        let rendered = render_registry(&self.root)?;

        match std::fs::read_to_string(&registry_abs) {
            Ok(existing) => {
                if !existing.contains(GENERATED_MARKER_MD) && !force {
                    anyhow::bail!(
                        "refusing to overwrite non-generated registry; re-run with `--force`: {}",
                        registry_rel.display()
                    );
                }
                if existing == rendered {
                    Ok(GeneratedFilePlan { patches: vec![] })
                } else {
                    Ok(GeneratedFilePlan {
                        patches: vec![Patch {
                            op: PatchOp::Update,
                            path: registry_abs,
                            content: rendered,
                        }],
                    })
                }
            }
            Err(err) if err.kind() == std::io::ErrorKind::NotFound => Ok(GeneratedFilePlan {
                patches: vec![Patch {
                    op: PatchOp::Create,
                    path: registry_abs,
                    content: rendered,
                }],
            }),
            Err(err) => Err(err.into()),
        }
    }

    pub fn check_all(&self) -> anyhow::Result<CheckReport> {
        // 1) docs sync --check
        let docs_sync = match self.plan_docs_sync() {
            Ok(plan) => CheckStepResult {
                name: "docs_sync".to_string(),
                ok: plan.patches.is_empty(),
                errors: 0,
                warnings: 0,
                patches: plan.patches.len(),
                conflicts: 0,
                message: None,
            },
            Err(err) => CheckStepResult {
                name: "docs_sync".to_string(),
                ok: false,
                errors: 1,
                warnings: 0,
                patches: 0,
                conflicts: 0,
                message: Some(err.to_string()),
            },
        };

        // 2) gen registry --check
        let registry = match self.plan_registry(false) {
            Ok(plan) => CheckStepResult {
                name: "registry".to_string(),
                ok: plan.patches.is_empty(),
                errors: 0,
                warnings: 0,
                patches: plan.patches.len(),
                conflicts: 0,
                message: None,
            },
            Err(err) => CheckStepResult {
                name: "registry".to_string(),
                ok: false,
                errors: 1,
                warnings: 0,
                patches: 0,
                conflicts: 0,
                message: Some(err.to_string()),
            },
        };

        // 3) gen readmes --check
        let readmes = match self.plan_readmes() {
            Ok(ReadmePlan { patches, skipped }) => CheckStepResult {
                name: "readmes".to_string(),
                ok: patches.is_empty(),
                errors: 0,
                warnings: 0,
                patches: patches.len(),
                conflicts: skipped.len(),
                message: if skipped.is_empty() {
                    None
                } else {
                    Some(format!("skipped: {}", skipped.len()))
                },
            },
            Err(err) => CheckStepResult {
                name: "readmes".to_string(),
                ok: false,
                errors: 1,
                warnings: 0,
                patches: 0,
                conflicts: 0,
                message: Some(err.to_string()),
            },
        };

        // 4) agents check
        let agents = match self.plan_agent_adapters() {
            Ok(plan) => CheckStepResult {
                name: "agents".to_string(),
                ok: plan.patches.is_empty() && plan.conflicts.is_empty(),
                errors: 0,
                warnings: 0,
                patches: plan.patches.len(),
                conflicts: plan.conflicts.len(),
                message: None,
            },
            Err(err) => CheckStepResult {
                name: "agents".to_string(),
                ok: false,
                errors: 1,
                warnings: 0,
                patches: 0,
                conflicts: 0,
                message: Some(err.to_string()),
            },
        };

        // 5) validate
        let validate = match self.validate() {
            Ok(ValidationReport {
                valid,
                summary,
                ..
            }) => CheckStepResult {
                name: "validate".to_string(),
                ok: valid,
                errors: summary.errors,
                warnings: summary.warnings,
                patches: 0,
                conflicts: 0,
                message: None,
            },
            Err(err) => CheckStepResult {
                name: "validate".to_string(),
                ok: false,
                errors: 1,
                warnings: 0,
                patches: 0,
                conflicts: 0,
                message: Some(err.to_string()),
            },
        };

        let steps = vec![docs_sync, registry, readmes, agents, validate];
        let ok = steps.iter().all(|s| s.ok);

        Ok(CheckReport {
            schema_version: "v0".to_string(),
            ok,
            steps,
        })
    }
}

#[derive(Debug, Clone)]
struct MissingBackref {
    from_id: String,
    to_id: String,
    ref_key: String,
}

fn discover_doc_candidates(root: &Path) -> Vec<(PathBuf, DocSourceKind)> {
    let mut out = Vec::<(PathBuf, DocSourceKind)>::new();

    for rel_dir in [
        "docs",
        "surfaces",
        "observations",
        ".syntropy/system-of-work/domains",
    ] {
        let abs = root.join(rel_dir);
        if !abs.is_dir() {
            continue;
        }

        let frontmatter_only = rel_dir == ".syntropy/system-of-work/domains";

        for entry in WalkDir::new(&abs)
            .follow_links(false)
            .into_iter()
            .filter_map(Result::ok)
        {
            if !entry.file_type().is_file() {
                continue;
            }

            if entry.path().extension().and_then(|e| e.to_str()) != Some("md") {
                continue;
            }

            if file_starts_with_generated_marker(entry.path()) {
                continue;
            }

            if frontmatter_only && !file_starts_with_frontmatter(entry.path()) {
                continue;
            }

            let rel_path = entry
                .path()
                .strip_prefix(root)
                .unwrap_or(entry.path())
                .to_path_buf();
            out.push((lexical_normalize(&rel_path), DocSourceKind::Markdown));
        }
    }

    // Prototypes
    let prototypes = root.join("prototypes");
    if prototypes.is_dir() {
        for entry in WalkDir::new(&prototypes)
            .follow_links(false)
            .max_depth(1)
            .into_iter()
            .filter_map(Result::ok)
        {
            if !entry.file_type().is_file() {
                continue;
            }
            if entry.path().extension().and_then(|e| e.to_str()) != Some("jsx") {
                continue;
            }
            let rel_path = entry
                .path()
                .strip_prefix(root)
                .unwrap_or(entry.path())
                .to_path_buf();
            out.push((lexical_normalize(&rel_path), DocSourceKind::PrototypeJsx));
        }
    }

    out.sort_by(|a, b| a.0.cmp(&b.0));
    out.dedup_by(|a, b| a.0 == b.0);
    out
}

fn file_starts_with_frontmatter(path: &Path) -> bool {
    let Ok(mut file) = std::fs::File::open(path) else {
        return false;
    };

    let mut buf = [0u8; 4];
    let Ok(n) = file.read(&mut buf) else {
        return false;
    };
    if n < 3 {
        return false;
    }
    // `---` at byte 0.
    buf[0] == b'-' && buf[1] == b'-' && buf[2] == b'-'
}

fn file_starts_with_generated_marker(path: &Path) -> bool {
    let Ok(mut file) = std::fs::File::open(path) else {
        return false;
    };

    let mut buf = [0u8; 64];
    let Ok(n) = file.read(&mut buf) else {
        return false;
    };

    let Ok(prefix) = std::str::from_utf8(&buf[..n]) else {
        return false;
    };

    prefix.starts_with(GENERATED_MARKER_MD)
}

fn parse_all_docs_strict(root: &Path) -> anyhow::Result<Vec<ParsedDoc>> {
    let mut docs = Vec::<ParsedDoc>::new();
    let candidates = discover_doc_candidates(root);

    for (rel_path, kind) in candidates {
        let abs_path = root.join(&rel_path);
        let content = std::fs::read_to_string(&abs_path)?;

        let fm = match kind {
            DocSourceKind::Markdown => parse_markdown_frontmatter(&content)?.0,
            DocSourceKind::PrototypeJsx => parse_prototype_frontmatter(&content)?.0,
        };

        let id = fm
            .get("id")
            .ok_or_else(|| anyhow::anyhow!("missing frontmatter id: {}", rel_path.display()))?
            .to_string();

        docs.push(ParsedDoc {
            id,
            doc_type: fm.get("type").cloned().unwrap_or_else(|| "unknown".to_string()),
            title: fm.get("title").cloned().unwrap_or_default(),
            status: fm.get("status").cloned().unwrap_or_default(),
            owner: fm.get("owner").cloned(),
            scope: fm.get("scope").cloned(),
            updated: fm.get("updated").cloned().unwrap_or_default(),
            refs: fm.refs,
            rel_path,
            abs_path,
            source_kind: kind,
        });
    }

    Ok(docs)
}

fn index_docs_by_id(docs: &[ParsedDoc]) -> anyhow::Result<BTreeMap<String, ParsedDoc>> {
    let mut out = BTreeMap::<String, ParsedDoc>::new();
    for doc in docs.iter().cloned() {
        if let Some(existing) = out.insert(doc.id.clone(), doc.clone()) {
            anyhow::bail!(
                "duplicate doc id: {} ({} and {})",
                doc.id,
                existing.rel_path.display(),
                doc.rel_path.display()
            );
        }
    }
    Ok(out)
}

fn doc_has_ref_to(doc: &ParsedDoc, target_id: &str) -> bool {
    for (key, ids) in doc.refs.iter() {
        if key == "domain" {
            continue;
        }
        if ids.iter().any(|v| v == target_id) {
            return true;
        }
    }
    false
}

fn find_missing_backrefs(docs_by_id: &BTreeMap<String, ParsedDoc>) -> Vec<MissingBackref> {
    let mut out = Vec::<MissingBackref>::new();

    for (a_id, a_doc) in docs_by_id.iter() {
        for (key, b_ids) in a_doc.refs.iter() {
            if key == "domain" {
                continue;
            }
            for b_id in b_ids {
                let Some(b_doc) = docs_by_id.get(b_id) else {
                    continue;
                };
                if !doc_has_ref_to(b_doc, a_id) {
                    out.push(MissingBackref {
                        from_id: a_id.clone(),
                        to_id: b_id.clone(),
                        ref_key: key.clone(),
                    });
                }
            }
        }
    }

    out.sort_by(|a, b| {
        (a.to_id.as_str(), a.ref_key.as_str(), a.from_id.as_str()).cmp(&(
            b.to_id.as_str(),
            b.ref_key.as_str(),
            b.from_id.as_str(),
        ))
    });
    out
}

fn reciprocal_ref_key(key: &str) -> &'static str {
    match key {
        "depends-on" => "enables",
        "enables" => "depends-on",
        "decided-by" => "affects",
        "affects" => "decided-by",
        "parent" => "children",
        "children" => "parent",
        "resolves-to" => "resolves",
        "resolves" => "resolves-to",
        "tensions" => "tensions",
        _ => "related",
    }
}

fn sort_dedup(ids: &mut Vec<String>) {
    ids.sort();
    ids.dedup();
}

fn parse_markdown_frontmatter(contents: &str) -> anyhow::Result<(FrontmatterRaw, FrontmatterSpans)> {
    let spans = markdown_frontmatter_spans(contents)?;
    let fm = parse_frontmatter_lines(&spans.frontmatter_lines)?;
    Ok((fm, spans))
}

fn parse_prototype_frontmatter(contents: &str) -> anyhow::Result<(FrontmatterRaw, PrototypeSpans)> {
    let spans = prototype_frontmatter_spans(contents)?;
    let fm = parse_frontmatter_lines(&spans.frontmatter_lines)?;
    Ok((fm, spans))
}

fn markdown_frontmatter_spans(contents: &str) -> anyhow::Result<FrontmatterSpans> {
    let mut lines = contents.split('\n');
    let first = lines
        .next()
        .ok_or_else(|| anyhow::anyhow!("missing frontmatter delimiter at start"))?;
    if first.trim_end_matches('\r') != "---" {
        anyhow::bail!("missing frontmatter delimiter at start (expected `---`)");
    }

    let mut frontmatter_lines = Vec::<String>::new();

    let bytes = contents.as_bytes();
    let mut line_start = first.len() + 1; // + '\n'
    while line_start <= contents.len() {
        let mut line_end = line_start;
        while line_end < contents.len() && bytes[line_end] != b'\n' {
            line_end += 1;
        }
        let line = &contents[line_start..line_end];
        if line.trim_end_matches('\r') == "---" {
            let body_start = if line_end < contents.len() {
                line_end + 1
            } else {
                line_end
            };
            return Ok(FrontmatterSpans {
                frontmatter_lines,
                body_start,
            });
        }
        frontmatter_lines.push(line.to_string());
        if line_end >= contents.len() {
            break;
        }
        line_start = line_end + 1;
    }

    anyhow::bail!("unterminated frontmatter (missing closing `---`)")
}

fn prototype_frontmatter_spans(contents: &str) -> anyhow::Result<PrototypeSpans> {
    if !contents.starts_with("/*") {
        anyhow::bail!("missing prototype frontmatter comment (expected `/*` at byte 0)");
    }

    let end = contents
        .find("*/")
        .ok_or_else(|| anyhow::anyhow!("unterminated prototype frontmatter comment (missing `*/`)"))?;

    let inner = &contents[2..end];
    let inner = inner.trim_start_matches(['\n', '\r', ' ', '\t']);

    // Treat the comment inner as a markdown frontmatter payload (without body).
    let fm_spans = markdown_frontmatter_spans(inner)?;
    // We only accept frontmatter inside the comment; no body content.
    let body = &inner[fm_spans.body_start..];
    if !body.trim().is_empty() {
        anyhow::bail!("prototype frontmatter comment contains extra content after closing delimiter");
    }

    Ok(PrototypeSpans {
        frontmatter_lines: fm_spans.frontmatter_lines,
        comment_end: end,
    })
}

fn parse_frontmatter_lines(lines: &[String]) -> anyhow::Result<FrontmatterRaw> {
    let mut values = BTreeMap::<String, String>::new();
    let mut refs = BTreeMap::<String, Vec<String>>::new();

    let mut idx = 0usize;
    while idx < lines.len() {
        let line = lines[idx].as_str();

        if line.trim().is_empty() {
            idx += 1;
            continue;
        }

        // refs: block
        if is_top_level_key(line, "refs") {
            idx += 1;
            while idx < lines.len() {
                let l = lines[idx].as_str();
                if l.trim().is_empty() {
                    idx += 1;
                    continue;
                }
                if is_top_level_any_key(l) {
                    break;
                }
                if let Some((k, v)) = split_yaml_key_value(l.trim()) {
                    // YAML list style:
                    if v.is_empty() {
                        let mut items = Vec::<String>::new();
                        idx += 1;
                        while idx < lines.len() {
                            let item_line = lines[idx].as_str();
                            if item_line.trim().is_empty() {
                                idx += 1;
                                continue;
                            }
                            if is_top_level_any_key(item_line) {
                                break;
                            }
                            let trimmed = item_line.trim();
                            if let Some(rest) = trimmed.strip_prefix("- ") {
                                items.push(unquote(rest.trim()));
                                idx += 1;
                                continue;
                            }
                            // Another key within refs block.
                            if trimmed.contains(':') && !trimmed.starts_with('-') {
                                break;
                            }
                            idx += 1;
                        }
                        refs.insert(k.to_string(), items);
                        continue;
                    }

                    refs.insert(k.to_string(), parse_yaml_list_literal(v)?);
                }
                idx += 1;
            }
            continue;
        }

        // Top-level key: value
        if line.starts_with(' ') || line.starts_with('\t') {
            idx += 1;
            continue;
        }

        if let Some((k, v)) = split_yaml_key_value(line) {
            values.insert(k.to_string(), unquote(v));
        }

        idx += 1;
    }

    Ok(FrontmatterRaw { values, refs })
}

fn rewrite_markdown_refs(contents: &str, new_refs: &BTreeMap<String, Vec<String>>) -> anyhow::Result<String> {
    let spans = markdown_frontmatter_spans(contents)?;
    let mut fm_lines = spans.frontmatter_lines.clone();

    rewrite_refs_block(&mut fm_lines, new_refs);
    rewrite_updated_field(&mut fm_lines, &today_utc_iso_date());

    let fm = fm_lines.join("\n");
    let body = &contents[spans.body_start..];
    Ok(format!("---\n{fm}\n---\n{body}"))
}

fn rewrite_prototype_refs(contents: &str, new_refs: &BTreeMap<String, Vec<String>>) -> anyhow::Result<String> {
    let spans = prototype_frontmatter_spans(contents)?;
    let mut fm_lines = spans.frontmatter_lines.clone();

    rewrite_refs_block(&mut fm_lines, new_refs);
    rewrite_updated_field(&mut fm_lines, &today_utc_iso_date());

    let fm = fm_lines.join("\n");
    let rest = &contents[spans.comment_end + 2..]; // after */
    Ok(format!("/*\n---\n{fm}\n---\n*/{rest}"))
}

fn rewrite_refs_block(fm_lines: &mut Vec<String>, new_refs: &BTreeMap<String, Vec<String>>) {
    // Determine insertion/replacement span.
    let mut refs_start: Option<usize> = None;
    let mut refs_end: Option<usize> = None;

    for (i, line) in fm_lines.iter().enumerate() {
        if is_top_level_key(line, "refs") {
            refs_start = Some(i);
            // Find end: next top-level key or end.
            let mut j = i + 1;
            while j < fm_lines.len() {
                if is_top_level_any_key(&fm_lines[j]) {
                    break;
                }
                j += 1;
            }
            refs_end = Some(j);
            break;
        }
    }

    let mut new_block = Vec::<String>::new();
    new_block.push("refs:".to_string());

    let mut keys: Vec<&String> = new_refs.keys().collect();
    keys.sort();
    for k in keys {
        if k == "domain" {
            // Always keep domain in refs (non-graph), but render it like any other list.
        }
        let ids = new_refs.get(k).cloned().unwrap_or_default();
        new_block.push(format!("  {k}: {}", render_yaml_list_literal(&ids)));
    }

    if let (Some(start), Some(end)) = (refs_start, refs_end) {
        fm_lines.splice(start..end, new_block);
        return;
    }

    // Insert before tags: if present; else append.
    let mut insert_at = fm_lines.len();
    for (i, line) in fm_lines.iter().enumerate() {
        if is_top_level_key(line, "tags") {
            insert_at = i;
            break;
        }
    }
    fm_lines.splice(insert_at..insert_at, new_block);
}

fn rewrite_updated_field(fm_lines: &mut Vec<String>, updated: &str) {
    for line in fm_lines.iter_mut() {
        if is_top_level_key(line, "updated") {
            *line = format!("updated: {updated}");
            return;
        }
    }

    // Insert after `created:` if present; else append.
    let mut insert_at = fm_lines.len();
    for (idx, line) in fm_lines.iter().enumerate() {
        if is_top_level_key(line, "created") {
            insert_at = idx + 1;
            break;
        }
    }
    fm_lines.insert(insert_at, format!("updated: {updated}"));
}

fn today_utc_iso_date() -> String {
    // Convert UNIX epoch seconds to a UTC calendar date (YYYY-MM-DD).
    // This avoids extra dependencies while keeping the output stable and ISO-comparable.
    const SECS_PER_DAY: u64 = 86_400;

    let secs = match std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH) {
        Ok(d) => d.as_secs(),
        Err(_) => 0,
    };
    let days = (secs / SECS_PER_DAY) as i64;

    let (year, month, day) = civil_from_days(days);
    format!("{year:04}-{month:02}-{day:02}")
}

fn civil_from_days(days_since_unix_epoch: i64) -> (i32, u32, u32) {
    // Howard Hinnant's algorithm: https://howardhinnant.github.io/date_algorithms.html
    // Input: days since 1970-01-01. Output: (year, month, day) in the proleptic Gregorian calendar.
    let z = days_since_unix_epoch + 719_468;
    let era = if z >= 0 { z } else { z - 146_096 } / 146_097;
    let doe = (z - era * 146_097) as u32; // [0, 146096]
    let yoe = (doe - doe / 1_460 + doe / 36_524 - doe / 146_096) / 365; // [0, 399]
    let y = yoe as i32 + era as i32 * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100); // [0, 365]
    let mp = (5 * doy + 2) / 153; // [0, 11]
    let d = doy - (153 * mp + 2) / 5 + 1; // [1, 31]
    let m = mp as i32 + if mp < 10 { 3 } else { -9 }; // [1, 12]
    let year = y + if m <= 2 { 1 } else { 0 };
    (year, m as u32, d)
}

fn render_yaml_list_literal(ids: &[String]) -> String {
    if ids.is_empty() {
        "[]".to_string()
    } else {
        format!("[{}]", ids.join(", "))
    }
}

fn parse_yaml_list_literal(value: &str) -> anyhow::Result<Vec<String>> {
    let value = value.trim();
    if value == "[]" {
        return Ok(vec![]);
    }

    if !value.starts_with('[') || !value.ends_with(']') {
        anyhow::bail!("expected YAML list literal `[...]`, got: {value}");
    }

    let inner = &value[1..value.len() - 1];
    let mut out = Vec::<String>::new();
    for part in inner.split(',') {
        let t = part.trim();
        if t.is_empty() {
            continue;
        }
        out.push(unquote(t));
    }
    Ok(out)
}

fn unquote(value: &str) -> String {
    let v = value.trim();
    if (v.starts_with('"') && v.ends_with('"') && v.len() >= 2)
        || (v.starts_with('\'') && v.ends_with('\'') && v.len() >= 2)
    {
        v[1..v.len() - 1].to_string()
    } else {
        v.to_string()
    }
}

fn is_top_level_any_key(line: &str) -> bool {
    if line.starts_with(' ') || line.starts_with('\t') {
        return false;
    }
    split_yaml_key_value(line).is_some()
}

fn is_top_level_key(line: &str, key: &str) -> bool {
    if line.starts_with(' ') || line.starts_with('\t') {
        return false;
    }
    split_yaml_key_value(line)
        .map(|(k, _)| k == key)
        .unwrap_or(false)
}

fn split_yaml_key_value(line: &str) -> Option<(&str, &str)> {
    let Some((k, v)) = line.split_once(':') else {
        return None;
    };
    let key = k.trim();
    if key.is_empty() {
        return None;
    }
    Some((key, v.trim()))
}

fn render_registry(workspace_root: &Path) -> anyhow::Result<String> {
    let docs = parse_all_docs_strict(workspace_root)?;
    let docs_by_id = index_docs_by_id(&docs)?;

    // Keep generated registry compatible with bidirectional-ref enforcement by including
    // incoming backrefs to `registry` (computed from the rest of the graph).
    let registry_refs = incoming_refs_for_target(&docs_by_id, "registry");

    // Exclude observations from registry.
    let mut nodes = Vec::<ParsedDoc>::new();
    for doc in docs_by_id.values() {
        if doc.doc_type == "observation" {
            continue;
        }
        nodes.push(doc.clone());
    }

    let updated_max = nodes
        .iter()
        .map(|d| d.updated.as_str())
        .filter(|v| is_iso_date(v))
        .max()
        .unwrap_or("2025-02-07");

    let mut out = String::new();
    out.push_str("---\n");
    out.push_str("id: \"registry\"\n");
    out.push_str("type: reference\n");
    out.push_str("title: \"Document Registry\"\n");
    out.push_str("status: active\n");
    out.push_str("mode: generated\n");
    out.push_str("owner: meta-agent\n");
    out.push_str("created: 2025-02-07\n");
    out.push_str(&format!("updated: {updated_max}\n"));
    if !registry_refs.is_empty() {
        out.push_str("refs:\n");
        let mut keys: Vec<&String> = registry_refs.keys().collect();
        keys.sort();
        for key in keys {
            let ids = registry_refs.get(key).cloned().unwrap_or_default();
            out.push_str(&format!("  {key}: {}\n", render_yaml_list_literal(&ids)));
        }
    }
    out.push_str("---\n\n");
    out.push_str(GENERATED_MARKER_MD);
    out.push_str("\n");
    out.push_str("<!-- GENERATED — DO NOT EDIT. -->\n");
    out.push_str("<!-- Run: cargo run -p syntropy -- gen registry -->\n");
    out.push_str("# Document Registry\n\n");
    out.push_str(
        "Master index of all documents in the Syntropy OS knowledge graph. Every document's stable ID maps to its file path, current status, and owning agent.\n\n",
    );

    // Section definitions in fixed order.
    let mut sections = Vec::<(&'static str, Vec<RegistryRow>)>::new();
    for title in REGISTRY_SECTION_ORDER.iter().copied() {
        sections.push((title, vec![]));
    }
    let mut by_title = BTreeMap::<&'static str, usize>::new();
    for (idx, (title, _)) in sections.iter().enumerate() {
        by_title.insert(*title, idx);
    }

    for node in nodes {
        let section = registry_section_for(&node);
        let Some(section_idx) = by_title.get(section) else {
            continue;
        };

        sections[*section_idx].1.push(RegistryRow {
            id: node.id.clone(),
            title: node.title.clone(),
            status: node.status.clone(),
            owner_or_scope: match section {
                "Agents" => node.scope.clone().unwrap_or_default(),
                _ => node.owner.clone().unwrap_or_default(),
            },
            file: rel_path_to_output_string(&node.rel_path),
        });
    }

    // Render each section.
    for (section_title, mut rows) in sections {
        out.push_str(&format!("## {section_title}\n\n"));

        match section_title {
            "Agents" => {
                out.push_str("| ID | Title | Status | Scope | File |\n");
                out.push_str("|----|-------|--------|-------|------|\n");
            }
            _ => {
                out.push_str("| ID | Title | Status | Owner | File |\n");
                out.push_str("|----|-------|--------|-------|------|\n");
            }
        }

        rows.sort_by(|a, b| a.id.cmp(&b.id));
        for row in rows {
            out.push_str(&format!(
                "| {} | {} | {} | {} | `{}` |\n",
                row.id,
                escape_pipes(&row.title),
                row.status,
                escape_pipes(&row.owner_or_scope),
                row.file
            ));
        }
        out.push('\n');
    }

    Ok(out)
}

#[derive(Debug, Clone)]
struct RegistryRow {
    id: String,
    title: String,
    status: String,
    owner_or_scope: String,
    file: String,
}

const REGISTRY_SECTION_ORDER: &[&str] = &[
    "Vision",
    "Features",
    "Use Cases",
    "User Stories",
    "UX Patterns",
    "Architecture",
    "Decisions",
    "Open Questions",
    "Workflows",
    "Agents",
    "Dev Platform — Vision",
    "Dev Platform — Features",
    "Dev Platform — Modules",
    "Dev Platform — Use Cases",
    "Dev Platform — User Stories",
    "Repo Platform — Vision",
    "Repo Platform — Features",
    "Repo Platform — Use Cases",
    "Repo Platform — User Stories",
    "Workspace Platform — Vision",
    "Workspace Platform — Features",
    "Workspace Platform — Use Cases",
    "Workspace Platform — User Stories",
    "Surfaces",
    "Index & Meta Files",
    "Prototypes",
];

fn registry_section_for(node: &ParsedDoc) -> &'static str {
    // First: type-based routing.
    if node.doc_type == "surface" {
        return "Surfaces";
    }
    if node.doc_type == "prototype" {
        return "Prototypes";
    }

    // Fixed IDs for Index & Meta Files.
    if matches!(
        node.id.as_str(),
        "conventions"
            | "changelog"
            | "registry"
            | "product-index"
            | "dp-product-index"
            | "rp-product-index"
            | "wp-product-index"
            | "arch-index"
            | "decisions-index"
            | "surfaces-index"
            | "observations-index"
    ) {
        return "Index & Meta Files";
    }

    // JTBD docs per platform.
    match node.id.as_str() {
        "jtbd-dev-platform" => return "Dev Platform — Vision",
        "jtbd-repo-platform" => return "Repo Platform — Vision",
        "jtbd-workspace-platform" => return "Workspace Platform — Vision",
        _ => {}
    }

    let path = path_to_slash_string(&node.rel_path);

    // Bucket by path prefix.
    if path.starts_with("docs/product/dev-platform/experience-layer/")
        || path.starts_with("docs/product/dev-platform/personality-layer/")
    {
        return "Dev Platform — Modules";
    }

    if path.starts_with("docs/product/dev-platform/features/") {
        return "Dev Platform — Features";
    }
    if path.starts_with("docs/product/dev-platform/use-cases/") {
        return "Dev Platform — Use Cases";
    }
    if path.starts_with("docs/product/dev-platform/user-stories/") {
        return "Dev Platform — User Stories";
    }

    if path.starts_with("docs/product/repo-platform/features/") {
        return "Repo Platform — Features";
    }
    if path.starts_with("docs/product/repo-platform/use-cases/") {
        return "Repo Platform — Use Cases";
    }
    if path.starts_with("docs/product/repo-platform/user-stories/") {
        return "Repo Platform — User Stories";
    }

    if path.starts_with("docs/product/workspace-platform/features/") {
        return "Workspace Platform — Features";
    }
    if path.starts_with("docs/product/workspace-platform/use-cases/") {
        return "Workspace Platform — Use Cases";
    }
    if path.starts_with("docs/product/workspace-platform/user-stories/") {
        return "Workspace Platform — User Stories";
    }

    if path.starts_with("docs/product/features/") {
        return "Features";
    }
    if path.starts_with("docs/product/use-cases/") {
        return "Use Cases";
    }
    if path.starts_with("docs/product/user-stories/") {
        return "User Stories";
    }
    if path.starts_with("docs/product/ux/") {
        return "UX Patterns";
    }

    if path.starts_with("docs/architecture/") {
        return "Architecture";
    }
    if path.starts_with("docs/decisions/") {
        return "Decisions";
    }
    if path.starts_with("docs/open-questions/") {
        return "Open Questions";
    }
    if path.starts_with("docs/workflows/") {
        return "Workflows";
    }
    if path.starts_with(".syntropy/system-of-work/domains/") {
        return "Agents";
    }
    if path.starts_with("docs/vision/") {
        return "Vision";
    }

    // Fallback buckets.
    "Index & Meta Files"
}

fn is_iso_date(value: &str) -> bool {
    let v = value.trim();
    if v.len() != 10 {
        return false;
    }
    let bytes = v.as_bytes();
    bytes[4] == b'-'
        && bytes[7] == b'-'
        && bytes[0..4].iter().all(|b| b.is_ascii_digit())
        && bytes[5..7].iter().all(|b| b.is_ascii_digit())
        && bytes[8..10].iter().all(|b| b.is_ascii_digit())
}

fn escape_pipes(value: &str) -> String {
    value.replace('|', "\\|")
}

fn incoming_refs_for_target(
    docs_by_id: &BTreeMap<String, ParsedDoc>,
    target_id: &str,
) -> BTreeMap<String, Vec<String>> {
    let mut out = BTreeMap::<String, BTreeSet<String>>::new();

    for (from_id, doc) in docs_by_id.iter() {
        if from_id == target_id {
            continue;
        }

        for (key, ids) in doc.refs.iter() {
            if key == "domain" {
                continue;
            }
            if ids.iter().any(|id| id == target_id) {
                out.entry(reciprocal_ref_key(key).to_string())
                    .or_default()
                    .insert(from_id.clone());
            }
        }
    }

    let mut rendered = BTreeMap::<String, Vec<String>>::new();
    for (key, set) in out {
        let mut ids: Vec<String> = set.into_iter().collect();
        ids.sort();
        rendered.insert(key, ids);
    }
    rendered
}
