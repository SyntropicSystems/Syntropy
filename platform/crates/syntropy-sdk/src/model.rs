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
#[serde(rename_all = "snake_case")]
pub enum PatchOp {
    Create,
    Update,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Patch {
    pub op: PatchOp,
    pub path: PathBuf,
    pub content: String,
}
