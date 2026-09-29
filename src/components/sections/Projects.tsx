"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/fx/Reveal";
import { projects } from "@/lib/data/projects";

export function Projects() {
  const flagship = projects.slice(0, 3);
  const builds = projects.slice(3);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader kicker="projects" title="Featured work" />
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {flagship.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} className="h-full">
              <GlassCard className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-aqua-400/60 text-sm">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-xs text-fog-500">
                    {p.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{p.title}</h3>
                <p className="text-sm text-teal-400 mb-4">{p.tagline}</p>
                <p className="text-sm text-fog-400 leading-relaxed mb-5 flex-1">
                  {p.solution}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {p.metrics.slice(0, 3).map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg bg-ink-800/60 p-2 text-center"
                    >
                      <p className="font-mono text-aqua-300 text-sm font-bold">
                        {m.value}
                      </p>
                      <p className="text-[10px] text-fog-500 leading-tight mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.ai.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-aqua-500/10 text-aqua-300 border border-aqua-400/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-[11px] text-fog-400 glass"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-4">
          <h3 className="font-mono text-sm text-fog-500">
            // rapid builds — shipped with AI pair-programming
          </h3>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {builds.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <GlassCard className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold mb-1">{p.title}</h4>
                  <p className="text-sm text-fog-400">{p.tagline}</p>
                </div>
                <span className="font-mono text-xs text-fog-500 shrink-0">
                  {p.year}
                </span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <p className="text-sm text-fog-500 font-mono">
            * Source code available on request — GitHub repos publishing in
            progress.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
