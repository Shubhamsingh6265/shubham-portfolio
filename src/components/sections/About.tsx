"use client";

import { MapPin, GraduationCap, Target } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/fx/Reveal";
import { siteConfig } from "@/lib/data/site";
import { coreStrengths } from "@/lib/data/skills";

const facts = [
  { icon: MapPin, label: "Location", value: siteConfig.location },
  {
    icon: GraduationCap,
    label: "Degree",
    value: "B.Tech CSE (AI & ML) · 2028",
  },
  { icon: Target, label: "Focus", value: "NLP · GenAI · Cloud AI" },
];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          kicker="about"
          title="Turning data into real-world impact"
        />
        <div className="grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-3">
            <p className="text-fog-300 text-lg leading-relaxed mb-6">
              {siteConfig.summary}
            </p>
            <p className="text-fog-400 leading-relaxed mb-8">
              My journey runs from fine-tuning multilingual transformers (MuRIL,
              FinBERT) for citizen-scale NLP, to architecting location-aware RAG
              chatbots, to deploying CNN vision models on AWS. Alongside, 9+
              months of continuous Google Cloud lab work — reaching Arcade
              Champion and Legend tiers — keeps my infrastructure instincts
              sharp.
            </p>
            <div className="flex flex-wrap gap-2">
              {coreStrengths.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full glass text-sm text-aqua-300 border-aqua-400/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {facts.map(({ icon: Icon, label, value }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <GlassCard className="flex items-center gap-4">
                  <Icon className="text-aqua-400 shrink-0" size={22} />
                  <div>
                    <p className="text-xs font-mono text-fog-500 uppercase">
                      {label}
                    </p>
                    <p className="text-fog-100 font-semibold">{value}</p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
