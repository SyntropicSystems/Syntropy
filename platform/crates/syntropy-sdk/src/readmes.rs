use crate::model::{Patch, PatchOp};
use crate::workspace::Workspace;

pub(crate) const GENERATED_MARKER: &str = "<!-- syntropy:generated -->";

#[derive(Debug, Clone)]
pub struct ReadmePlan {
    pub patches: Vec<Patch>,
    pub skipped: Vec<std::path::PathBuf>,
}

impl Workspace {
    pub fn plan_readmes(&self) -> anyhow::Result<ReadmePlan> {
        let mut targets = self.known_directories();
        targets.sort();
        targets.dedup();

        let mut patches = Vec::<Patch>::new();
        let mut skipped = Vec::<std::path::PathBuf>::new();

        for rel_dir in targets {
            let abs_dir = self.root.join(&rel_dir);
            if !abs_dir.is_dir() {
                continue;
            }

            let Some(readme_filename) = self.resolve_definition(&rel_dir).readme_filename else {
                continue;
            };

            let abs_readme = abs_dir.join(readme_filename);
            let content = self.render_readme(&rel_dir)?;

            match std::fs::read_to_string(&abs_readme) {
                Ok(existing) => {
                    if !existing.contains(GENERATED_MARKER) {
                        skipped.push(abs_readme);
                        continue;
                    }

                    if existing == content {
                        continue;
                    }

                    patches.push(Patch {
                        op: PatchOp::Update,
                        path: abs_readme,
                        content,
                    });
                }
                Err(err) if err.kind() == std::io::ErrorKind::NotFound => patches.push(Patch {
                    op: PatchOp::Create,
                    path: abs_readme,
                    content,
                }),
                Err(err) => return Err(err.into()),
            }
        }

        Ok(ReadmePlan { patches, skipped })
    }
}
