"use client";

import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/fx/Reveal";
import { education } from "@/lib/data/education";

export function Education() {
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader kicker="education" title="Academic background" />
        <div className="grid md:grid-cols-3 gap-6">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1} className="h-full">
              <GlassCard className="h-full">
                <GraduationCap className="text-aqua-400 mb-4" size={22} />
                <h3 className="font-semibold mb-1 leading-snug">{e.degree}</h3>
                <p className="text-sm text-fog-400 mb-1">{e.institution}</p>
                <p className="text-xs text-fog-500 mb-3">
                  {e.location} · {e.period}
                </p>
                {e.details.map((d) => (
                  <span
                    key={d}
                    className="inline-block px-2.5 py-1 rounded-full text-xs font-mono bg-teal-400/10 text-teal-400 border border-teal-400/20"
                  >
                    {d}
                  </span>
                ))}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}