use crate::model::{Finding, FindingSeverity, ValidationReport, ValidationSummary};
use crate::workspace::Workspace;
use std::collections::BTreeSet;

impl Workspace {
    pub fn validate(&self) -> anyhow::Result<ValidationReport> {
        let mut findings = Vec::<Finding>::new();

        let allowed: BTreeSet<&str> = self
            .blueprint
            .allowed_top_level_dirs
            .iter()
            .copied()
            .collect();

        for entry in std::fs::read_dir(&self.root)? {
            let entry = entry?;
            let file_type = entry.file_type()?;
            if !file_type.is_dir() {
                continue;
            }

            let name = entry.file_name().to_string_lossy().to_string();
            if should_ignore_top_level_dir(name.as_str()) {
                continue;
            }
            if allowed.contains(name.as_str()) {
                continue;
            }

            findings.push(Finding {
                code: "W001".to_string(),
                severity: FindingSeverity::Warning,
                message: format!("unexpected top-level directory: {name}"),
                path: Some(name),
            });
        }

        let errors = findings
            .iter()
            .filter(|f| matches!(f.severity, FindingSeverity::Error))
            .count();
        let warnings = findings
            .iter()
            .filter(|f| matches!(f.severity, FindingSeverity::Warning))
            .count();

        Ok(ValidationReport {
            schema_version: "v0".to_string(),
            blueprint: self.blueprint.id.clone(),
            valid: errors == 0,
            findings,
            summary: ValidationSummary { errors, warnings },
        })
    }
}

fn should_ignore_top_level_dir(name: &str) -> bool {
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
            | "bazel-bin"
            | "bazel-out"
            | "bazel-testlogs"
    )
}
