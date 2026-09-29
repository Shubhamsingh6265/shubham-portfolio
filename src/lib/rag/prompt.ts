import type { Chunk } from "./chunks";
import { siteConfig } from "@/lib/data/site";

export function buildSystemPrompt(context: Chunk[]): string {
  const ctx = context.map((c) => `[${c.source}] ${c.text}`).join("\n");
  return `You are the portfolio assistant of ${siteConfig.name}, ${siteConfig.headline}.
Answer ONLY using the CONTEXT below. Be concise (max 120 words), friendly and professional.
Use plain text with short bullet points when listing.
If the answer is not in CONTEXT, say exactly: "That's not covered in my portfolio yet — feel free to email me at ${siteConfig.email}."
Never invent companies, metrics, or links.

CONTEXT:
${ctx}`;
}

export function localAnswer(query: string, context: Chunk[]): string {
  if (context.length === 0) {
    return `That's not covered in my portfolio yet — feel free to email me at ${siteConfig.email}.`;
  }
  const lines = context.slice(0, 3).map((c) => `• ${c.text.split(". ")[0]}.`);
  return `Here's what my portfolio says about "${query.trim()}":\n${lines.join("\n")}`;
}
