use std::fs;

pub fn detect_distro_name() -> Option<String> {
    let content = fs::read_to_string("/etc/os-release").ok()?;
    content
        .lines()
        .find_map(|line| line.strip_prefix("PRETTY_NAME=").map(clean_value))
}

fn clean_value(value: &str) -> String {
    value.trim_matches('"').to_string()
}
