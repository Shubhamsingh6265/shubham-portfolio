"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function TypingTerminal({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [done, setDone] = useState<string[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    let line = 0;
    let char = 0;

    const step = () => {
      if (cancelled || line >= lines.length) return;
      const full = lines[line];
      char += 1;
      setTyping(full.slice(0, char));
      if (char < full.length) {
        window.setTimeout(step, 16);
      } else {
        setDone((d) => [...d, full]);
        setTyping("");
        line += 1;
        char = 0;
        window.setTimeout(step, 240);
      }
    };
    step();
    return () => {
      cancelled = true;
    };
  }, [inView, lines]);

  return (
    <div
      ref={ref}
      className={`rounded-lg border border-glass-border bg-ink-950/80 overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-glass-border">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal-400/70" />
        <span className="ml-2 font-mono text-[10px] text-fog-500">
          train.sh — shubham@gcp
        </span>
      </div>
      <div className="px-3 py-2 font-mono text-[11px] leading-5 min-h-26 text-fog-300">
        {done.map((l) => (
          <p
            key={l}
            className={
              l.startsWith("✓")
                ? "text-teal-400"
                : l.startsWith("$")
                  ? "text-aqua-300"
                  : ""
            }
          >
            {l}
          </p>
        ))}
        {typing && (
          <p className={typing.startsWith("$") ? "text-aqua-300" : ""}>
            {typing}
            <span className="animate-pulse text-aqua-400">▍</span>
          </p>
        )}
      </div>
    </div>
  );
}
