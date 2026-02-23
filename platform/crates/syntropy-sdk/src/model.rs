use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum NodeType {
    File,
    Dir,
    Symlink,
    Missing,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum FindingSeverity {
    Error,
    Warning,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Finding {
    pub code: String,
    pub severity: FindingSeverity,
    pub message: String,
    pub path: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationReport {
    pub schema_version: String,
    pub blueprint: String,
    pub valid: bool,
    pub findings: Vec<Finding>,
    pub summary: ValidationSummary,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationSummary {
    pub errors: usize,
    pub warnings: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocsReport {
    pub schema_version: String,
    pub valid: bool,
    pub findings: Vec<DocFinding>,
    pub summary: DocsSummary,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocsSummary {
    pub errors: usize,
    pub warnings: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocFinding {
    pub code: String,
    pub severity: FindingSeverity,
    pub message: String,
    pub path: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub doc_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ref_id: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ref_key: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CheckReport {
    pub schema_version: String,
    pub ok: bool,
    pub steps: Vec<CheckStepResult>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CheckStepResult {
    pub name: String,
    pub ok: bool,
    pub errors: usize,
    pub warnings: usize,
    pub patches: usize,
    pub conflicts: usize,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub message: Option<String>,
}

#[derive(Debug, Clone)]
pub(crate) struct NodeDefinition {
    pub kind: String,
    pub purpose: Option<String>,
    pub rules: Vec<String>,
    pub boundaries: Option<Boundaries>,
    pub readme_filename: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Boundaries {
    #[serde(default)]
    pub allowed_children: Vec<String>,
    #[serde(default)]
    pub disallowed: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NodeInfo {
    pub schema_version: String,
    pub workspace_root: String,
    pub path: String,
    #[serde(default)]
    pub contract_chain: Vec<String>,
    pub node_type: NodeType,
    pub kind: String,
    pub exists: bool,
    pub purpose: Option<String>,
    pub rules: Vec<String>,
    pub boundaries: Option<Boundaries>,
    pub readme_path: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TreeNode {
    pub path: String,
    pub name: String,
    pub node_type: NodeType,
    pub kind: String,
    #[serde(default)]
    pub children: Vec<TreeNode>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocsSyncPlan {
    pub patches: Vec<Patch>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GeneratedFilePlan {
    pub patches: Vec<Patch>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PatchOp {
    Create,
    Update,
    Delete,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Patch {
    pub op: PatchOp,
    pub path: PathBuf,
    pub content: String,
}
