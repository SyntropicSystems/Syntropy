use std::path::{Component, Path, PathBuf};

pub(crate) fn lexical_normalize(path: &Path) -> PathBuf {
    let mut out = PathBuf::new();
    for component in path.components() {
        match component {
            Component::CurDir => {}
            Component::ParentDir => {
                out.pop();
            }
            Component::RootDir => out.push(component.as_os_str()),
            Component::Prefix(prefix) => out.push(prefix.as_os_str()),
            Component::Normal(part) => out.push(part),
        }
    }
    out
}

pub(crate) fn path_to_slash_string(path: &Path) -> String {
    let mut parts = Vec::<String>::new();
    for component in path.components() {
        parts.push(component.as_os_str().to_string_lossy().to_string());
    }
    parts.join("/")
}

pub(crate) fn rel_path_to_output_string(rel_path: &Path) -> String {
    if rel_path.as_os_str().is_empty() || rel_path == Path::new(".") {
        ".".to_string()
    } else {
        path_to_slash_string(rel_path)
    }
}
