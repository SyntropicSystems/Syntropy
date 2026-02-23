use syntropy_sdk::{InitOptions, Workspace};

fn init_workspace(root: &std::path::Path) -> anyhow::Result<Workspace> {
    let mut options = InitOptions::default();
    options.generate_readmes = false;
    Workspace::init(root, options)?;
    Workspace::discover(root)
}

fn write_file(path: &std::path::Path, contents: &str) -> anyhow::Result<()> {
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent)?;
    }
    std::fs::write(path, contents)?;
    Ok(())
}

#[test]
fn docs_check_fails_on_one_way_ref_and_sync_fixes() -> anyhow::Result<()> {
    let dir = tempfile::tempdir()?;
    let workspace = init_workspace(dir.path())?;

    write_file(
        &dir.path().join("docs/a.md"),
        r#"---
id: "a"
type: feature-spec
title: "Doc A"
status: defining
owner: meta-agent
created: 2026-01-01
updated: 2026-01-01
refs:
  depends-on: [b]
tags: []
---

# A
"#,
    )?;

    write_file(
        &dir.path().join("docs/b.md"),
        r#"---
id: "b"
type: feature-spec
title: "Doc B"
status: defining
owner: meta-agent
created: 2026-01-01
updated: 2026-01-01
refs:
  enables: []
tags: []
---

# B
"#,
    )?;

    let report = workspace.docs_check()?;
    assert!(!report.valid);
    assert!(report.findings.iter().any(|f| f.code == "DG006"));

    let plan = workspace.plan_docs_sync()?;
    assert!(!plan.patches.is_empty());

    workspace.apply_patches(&plan.patches)?;

    let report = workspace.docs_check()?;
    assert!(
        report.valid,
        "expected docs_check to pass after sync; findings: {:?}",
        report.findings
    );
    Ok(())
}

#[test]
fn prototype_frontmatter_is_required() -> anyhow::Result<()> {
    let dir = tempfile::tempdir()?;
    let workspace = init_workspace(dir.path())?;

    write_file(
        &dir.path().join("prototypes/demo.jsx"),
        r#"export default function Demo() { return null; }"#,
    )?;

    let report = workspace.docs_check()?;
    assert!(!report.valid);
    assert!(report.findings.iter().any(|f| f.code == "DG001"));

    write_file(
        &dir.path().join("prototypes/demo.jsx"),
        r#"/*
---
id: "proto-demo"
type: prototype
title: "Demo Prototype"
status: active
owner: ux-agent
created: 2026-01-01
updated: 2026-01-01
---
*/
export default function Demo() { return null; }
"#,
    )?;

    let report = workspace.docs_check()?;
    assert!(
        report.valid,
        "expected docs_check to pass with valid prototype frontmatter; findings: {:?}",
        report.findings
    );
    Ok(())
}

#[test]
fn registry_generation_places_docs_in_expected_sections() -> anyhow::Result<()> {
    let dir = tempfile::tempdir()?;
    let workspace = init_workspace(dir.path())?;

    write_file(
        &dir.path().join("docs/vision/manifesto.md"),
        r#"---
id: "manifesto"
type: vision
title: "Core Philosophy"
status: active
owner: meta-agent
created: 2025-02-07
updated: 2025-02-07
---

# Manifesto
"#,
    )?;

    write_file(
        &dir.path().join("docs/product/user-stories/stories.md"),
        r#"---
id: "stories"
type: user-story
title: "User Stories"
status: defining
owner: product-agent
created: 2025-02-07
updated: 2025-02-07
---

# Stories
"#,
    )?;

    write_file(
        &dir.path().join("prototypes/demo.jsx"),
        r#"/*
---
id: "proto-demo"
type: prototype
title: "Demo Prototype"
status: active
owner: ux-agent
created: 2026-01-01
updated: 2026-01-01
---
*/
export default function Demo() { return null; }
"#,
    )?;

    let plan = workspace.plan_registry(true)?;
    assert_eq!(plan.patches.len(), 1);
    let content = &plan.patches[0].content;

    assert!(content.contains("<!-- syntropy:generated -->"));
    assert!(content.contains("## Vision"));
    assert!(content.contains("| manifesto |"));

    assert!(content.contains("## User Stories"));
    assert!(content.contains("| stories |"));

    assert!(content.contains("## Prototypes"));
    assert!(content.contains("| proto-demo |"));

    let vision_idx = content.find("## Vision").unwrap();
    let features_idx = content.find("## Features").unwrap();
    assert!(vision_idx < features_idx, "expected Vision before Features");

    Ok(())
}

#[test]
fn check_all_has_stable_step_order() -> anyhow::Result<()> {
    let dir = tempfile::tempdir()?;
    let workspace = init_workspace(dir.path())?;

    let report = workspace.check_all()?;
    let names: Vec<&str> = report.steps.iter().map(|s| s.name.as_str()).collect();

    assert_eq!(report.schema_version, "v0");
    assert_eq!(names, vec!["docs_sync", "registry", "readmes", "agents", "validate"]);
    Ok(())
}

