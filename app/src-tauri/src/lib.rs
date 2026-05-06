mod commands;
mod system;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::system_info::get_system_info,
            commands::providers::test_ollama_connection,
            commands::providers::test_lm_studio_connection
        ])
        .run(tauri::generate_context!())
        .expect("error while running Pardus Mihmandar");
}
