"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseValue(value: string) {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const decimals = (m[2].split(".")[1] ?? "").length;
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3], decimals };
}

export function AnimatedMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const parsed = useMemo(() => parseValue(value), [value]);
  const gradientId = `grad${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!parsed || !inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(
        `${parsed.prefix}${(parsed.num * eased).toFixed(parsed.decimals)}${parsed.suffix}`,
      );
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed]);

  const isPercent = parsed !== null && parsed.suffix.trim() === "%";
  const R = 18;
  const C = 2 * Math.PI * R;

  return (
    <div
      ref={ref}
      className="rounded-lg bg-ink-800/60 p-2 text-center flex flex-col items-center justify-center gap-1"
    >
      {isPercent && parsed ? (
        <div className="relative h-12 w-12">
          <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90">
            <circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="4"
            />
            <circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={inView ? C * (1 - parsed.num / 100) : C}
              style={{
                transition:
                  "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-aqua-300">
            {display}
          </span>
        </div>
      ) : (
        <p className="font-mono text-aqua-300 text-sm font-bold">{display}</p>
      )}
      <p className="text-[10px] text-fog-500 leading-tight">{label}</p>
    </div>
  );
}
