"use client";

import { Award, Trophy, BadgeCheck, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/fx/Reveal";
import { credentials } from "@/lib/data/credentials";

const catMeta = {
  certification: { icon: Award, label: "Certifications" },
  achievement: { icon: Trophy, label: "Achievements" },
  badge: { icon: BadgeCheck, label: "Cloud Badges" },
} as const;

export function Certifications() {
  const groups = Object.keys(catMeta) as (keyof typeof catMeta)[];
  return (
    <section id="certifications" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader kicker="credentials" title="Certifications & badges" />
        <div className="space-y-10">
          {groups.map((cat) => {
            const { icon: Icon, label } = catMeta[cat];
            const items = credentials.filter((c) => c.category === cat);
            return (
              <div key={cat}>
                <Reveal className="flex items-center gap-2 mb-4">
                  <Icon className="text-aqua-400" size={18} />
                  <h3 className="font-semibold">{label}</h3>
                </Reveal>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((c, i) => (
                    <Reveal key={c.title} delay={i * 0.06}>
                      <GlassCard className="flex items-start justify-between gap-3 py-4">
                        <div>
                          <p className="text-sm font-semibold leading-snug mb-1">
                            {c.title}
                          </p>
                          <p className="text-xs text-fog-500">
                            {c.issuer} · {c.year}
                          </p>
                        </div>
                        {c.url && (
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Verify ${c.title}`}
                            className="text-fog-500 hover:text-aqua-400 transition-colors shrink-0"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </GlassCard>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
