import { CHUNKS, type Chunk } from "./chunks";

const SYNONYMS: Record<string, string[]> = {
  llm: ["genai", "grok", "gemini", "rag", "chatbot"],
  ai: ["machine learning", "genai", "nlp"],
  ml: ["machine learning", "scikit-learn"],
  cloud: ["gcp", "google cloud", "aws", "arcade"],
  gcp: ["google cloud", "arcade"],
  bot: ["chatbot", "rag"],
  chatbot: ["rag", "bharat sangam", "grok"],
  nlp: ["text", "muril", "finbert", "grievai"],
  cv: ["computer vision", "cnn", "gau gyan", "image"],
  vision: ["computer vision", "cnn", "gau gyan"],
  intern: ["internship", "experience"],
  job: ["internship", "status", "open"],
  hire: ["status", "contact"],
  cert: ["certification", "badge"],
  study: ["education", "cgpa", "college"],
  contact: ["email", "phone", "links"],
  resume: ["profile", "education", "experience", "skills"],
};

const STOP = new Set([
  "what",
  "who",
  "is",
  "are",
  "the",
  "a",
  "an",
  "in",
  "on",
  "of",
  "to",
  "me",
  "my",
  "your",
  "you",
  "about",
  "tell",
  "please",
  "can",
  "could",
  "how",
  "why",
  "which",
  "do",
  "does",
  "did",
  "have",
  "has",
  "and",
  "or",
  "with",
  "for",
  "shubham",
  "he",
  "him",
  "his",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function expand(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) {
    for (const s of SYNONYMS[t] ?? []) out.add(s);
  }
  return [...out];
}

export function retrieve(query: string, topK = 4): Chunk[] {
  const tokens = expand(tokenize(query));
  if (tokens.length === 0) return CHUNKS.slice(0, 2);

  const scored = CHUNKS.map((chunk) => {
    const hay = (chunk.text + " " + chunk.keywords.join(" ")).toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (chunk.keywords.some((k) => k.includes(t))) score += 3;
      const occurrences = hay.split(t).length - 1;
      score += Math.min(occurrences, 4);
      if (t.includes(" ") && hay.includes(t)) score += 4;
    }
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}
