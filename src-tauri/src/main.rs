// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
      .setup(|app| {
        let _window = app.get_window("main").unwrap();
        Ok(())
      })
      .invoke_handler(tauri::generate_handler![increment_counter])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}

#[derive(serde::Serialize)]
struct Counter {
  value: i32,
}

#[tauri::command]
async fn increment_counter(counter: i32) -> tauri::Result<Counter> {
  Ok(Counter { value: counter + 1 })
}
