use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct ProviderTestResult {
    pub ok: bool,
    pub message: String,
}

#[tauri::command]
pub async fn test_ollama_connection(base_url: String) -> ProviderTestResult {
    ProviderTestResult {
        ok: !base_url.trim().is_empty(),
        message: "Ollama connection test placeholder. Wire HTTP check to /api/tags next.".to_string(),
    }
}

#[tauri::command]
pub async fn test_lm_studio_connection(base_url: String) -> ProviderTestResult {
    ProviderTestResult {
        ok: !base_url.trim().is_empty(),
        message: "LM Studio connection test placeholder. Wire HTTP check to /v1/models next.".to_string(),
    }
}
