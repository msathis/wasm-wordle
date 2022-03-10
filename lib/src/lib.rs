use std::sync::Mutex;

use lazy_static::lazy_static;
use wasm_bindgen::prelude::*;
mod wordle;
use wordle::Wordle;

lazy_static! {
    static ref WORDLE: Mutex<Wordle> = Mutex::new(Wordle::new());
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub async fn init() {
    console_error_panic_hook::set_once();
    WORDLE.lock().unwrap().init().await.unwrap();
}

#[wasm_bindgen]
pub fn get_random_word() -> String {
    let word = WORDLE.lock().unwrap().get_random_word();
    word
}

#[wasm_bindgen]
pub fn is_word(word: &str) -> bool {
    WORDLE.lock().unwrap().is_word(word.to_string())
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
