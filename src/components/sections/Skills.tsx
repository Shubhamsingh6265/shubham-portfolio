"use client";

import { useState } from "react";
import { Code2, Brain, Sparkles, Cloud, Database, Globe } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/fx/Reveal";
import { SkillConstellation } from "@/components/fx/SkillConstellation";
import { skillGroups } from "@/lib/data/skills";

const icons: Record<string, typeof Code2> = {
  code: Code2,
  brain: Brain,
  sparkles: Sparkles,
  cloud: Cloud,
  database: Database,
  globe: Globe,
};

const levelWidth: Record<string, string> = {
  beginner: "50%",
  intermediate: "75%",
  advanced: "92%",
};

export function Skills() {
  const reduce = useReducedMotion();
  const [view, setView] = useState<"map" | "bars">("map");

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader kicker="skills" title="Technical arsenal" />

        <Reveal className="mb-8 flex gap-2">
          {(["map", "bars"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-colors glass ${
                view === v
                  ? "text-aqua-300 border-aqua-400/50"
                  : "text-fog-500 hover:text-fog-300"
              }`}
            >
              {v === "map" ? "constellation" : "skill bars"}
            </button>
          ))}
        </Reveal>

        {view === "map" ? (
          <Reveal>
            <SkillConstellation />
          </Reveal>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, gi) => {
              const Icon = icons[group.icon] ?? Code2;
              return (
                <Reveal key={group.title} delay={gi * 0.08} className="h-full">
                  <GlassCard className="h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <Icon className="text-aqua-400" size={20} />
                      <h3 className="font-semibold">{group.title}</h3>
                    </div>
                    <ul className="space-y-4">
                      {group.items.map((item) => (
                        <li key={item.name}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="text-fog-200">{item.name}</span>
                            <span className="font-mono text-xs text-fog-500">
                              {item.level}
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-linear-to-r from-aqua-500 to-teal-400"
                              initial={reduce ? false : { width: 0 }}
                              whileInView={{ width: levelWidth[item.level] }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
