"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/fx/Reveal";
import { journey } from "@/lib/data/journey";

export function Journey() {
  return (
    <section id="journey" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader kicker="experience" title="Cloud & AI journey" />
        <div className="relative border-l border-glass-border ml-3 space-y-12">
          {journey.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="relative pl-8">
              <span className="absolute -left-1.75 top-1 w-3.5 h-3.5 rounded-full bg-aqua-400 glow-aqua" />
              <p className="font-mono text-sm text-aqua-400 mb-1">
                {item.period}
              </p>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-fog-500 mb-3">{item.org}</p>
              <ul className="space-y-2">
                {item.points.map((p) => (
                  <li
                    key={p}
                    className="text-fog-400 text-sm leading-relaxed flex gap-2"
                  >
                    <span className="text-teal-400 mt-0.5">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
