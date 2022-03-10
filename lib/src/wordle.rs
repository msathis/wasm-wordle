use js_sys::Math::random;

#[derive(Debug)]
pub struct Wordle {
    words:Vec<String>
}

impl Wordle {
    pub fn new() -> Self {
        Wordle { words:  vec![] }
    }

    pub async fn init(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        let words = self.read_words().await?;
        self.words = words;
        Ok(())
    }

    pub fn get_random_word(&self) -> String {
        let index = random() * self.words.len() as f64;
        self.words[index.floor() as usize].clone()
    }

    pub fn is_word(&self, word: String) -> bool {
        self.words.contains(&word)
    }

    async fn read_words(&self) -> Result<Vec<String>, Box<dyn std::error::Error>> {
        let data = reqwest::get("http://localhost:8080/5-words.txt").await?.text().await?;
        return Ok(data.lines().map(|s| s.to_string()).collect());
    }
}
