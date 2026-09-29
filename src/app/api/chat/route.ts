import { NextResponse } from "next/server";
import { chatSchema } from "@/lib/validation";
import { retrieve } from "@/lib/rag/retrieve";
import { buildSystemPrompt, localAnswer } from "@/lib/rag/prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory rate limit + response cache (per serverless instance)
const RATE_LIMIT = 10; // req/min per IP
const hits = new Map<string, { count: number; reset: number }>();
const cache = new Map<string, { answer: string; expires: number }>();
const CACHE_TTL = 10 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  const { message, history = [] } = parsed.data;
  const context = retrieve(message);

  const cacheKey = message.toLowerCase().trim();
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json({ answer: cached.answer, mode: "cache" });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      answer: localAnswer(message, context),
      mode: "offline",
    });
  }

  try {
    const model = process.env.GROK_MODEL ?? "grok-3-mini";
    const base = process.env.GROK_BASE_URL ?? "https://api.x.ai";

    const res = await fetch(`${base}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 300,
        temperature: 0.4,
        messages: [
          { role: "system", content: buildSystemPrompt(context) },
          ...history.slice(-4),
          { role: "user", content: message },
        ],
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      return NextResponse.json({
        answer: localAnswer(message, context),
        mode: "fallback",
      });
    }

    const data = await res.json();
    const answer: string =
      data?.choices?.[0]?.message?.content ?? localAnswer(message, context);

    cache.set(cacheKey, { answer, expires: Date.now() + CACHE_TTL });
    if (cache.size > 100) {
      const first = cache.keys().next().value;
      if (first) cache.delete(first);
    }

    return NextResponse.json({ answer, mode: "grok" });
  } catch {
    return NextResponse.json({
      answer: localAnswer(message, context),
      mode: "fallback",
    });
  }
}
