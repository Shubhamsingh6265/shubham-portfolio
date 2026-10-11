"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";

const STAGES = [
  { label: "Your question", detail: '"What is GrievAI?"' },
  { label: "Hybrid retrieval", detail: "25 chunks · BM25 + synonym map" },
  { label: "Top-4 context", detail: "scored, packed into prompt" },
  { label: "Grok LLM", detail: "scope-locked system prompt" },
  { label: "Scoped answer", detail: "cached · rate-limited · on-point" },
];

export function PipelineBand() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      // defer one tick: never call setState synchronously inside an effect
      const t = window.setTimeout(() => setActive(STAGES.length), 60);
      return () => window.clearTimeout(t);
    }
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % STAGES.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, [reduce]);

  const openChat = () =>
    window.dispatchEvent(new CustomEvent("portfolio:open-chat"));

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="glass rounded-card p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-aqua-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="font-mono text-sm text-aqua-400 mb-2">
                  {"// live architecture"}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  How the assistant on this site thinks
                </h2>
              </div>
              <button
                onClick={openChat}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-fog-200 hover:text-aqua-400 hover:border-aqua-400/40 transition-colors"
              >
                <MessageCircle size={16} />
                Ask it live
              </button>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-2">
              {/* traveling pulse (desktop) */}
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-glass-border -translate-y-1/2" />
              {active < STAGES.length && (
                <motion.div
                  className="hidden md:block absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-aqua-400 glow-aqua"
                  animate={{ left: `${10 + active * 20}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              )}

              {STAGES.map((s, i) => (
                <div
                  key={s.label}
                  className={`relative rounded-xl border p-4 transition-all duration-500 ${
                    i === active
                      ? "border-aqua-400/60 bg-aqua-500/10 shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                      : i < active
                        ? "border-teal-400/30 bg-ink-800/40"
                        : "border-glass-border bg-ink-900/40"
                  }`}
                >
                  <p className="font-mono text-[10px] text-fog-500 mb-1">
                    0{i + 1}
                  </p>
                  <p
                    className={`text-sm font-semibold mb-1 ${
                      i === active ? "text-aqua-300" : "text-fog-200"
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className="text-[11px] text-fog-500 leading-snug">
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 font-mono text-xs text-fog-500">
              retrieval: local hybrid search (zero embedding cost) · generation:
              grok-3-mini · fallback: offline mode
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
