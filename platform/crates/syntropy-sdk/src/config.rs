use crate::model::Boundaries;
use serde::Deserialize;

#[derive(Debug, Clone, Copy, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum OutputFormat {
    Human,
    Json,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct SyntropyToml {
    pub workspace: WorkspaceSection,

    #[serde(default)]
    pub output: OutputSection,

    #[serde(default, rename = "override")]
    pub overrides: Vec<WorkspaceOverride>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct WorkspaceSection {
    pub name: String,
    pub blueprint: String,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct OutputSection {
    #[serde(default)]
    pub format_default: Option<OutputFormat>,

    #[serde(default)]
    pub generate_readmes: bool,
}

impl Default for OutputSection {
    fn default() -> Self {
        Self {
            format_default: None,
            generate_readmes: false,
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct WorkspaceOverride {
    pub path: String,

    #[serde(default)]
    pub kind: Option<String>,

    #[serde(default)]
    pub purpose: Option<String>,

    #[serde(default)]
    pub rules: Vec<String>,

    #[serde(default)]
    pub boundaries: Option<Boundaries>,

    #[serde(default)]
    pub readme_filename: Option<String>,
}
