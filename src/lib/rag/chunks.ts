import { siteConfig } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";
import { skillGroups, coreStrengths } from "@/lib/data/skills";
import { journey } from "@/lib/data/journey";
import { education } from "@/lib/data/education";
import { credentials } from "@/lib/data/credentials";

export type Chunk = {
  id: string;
  source: string;
  text: string;
  keywords: string[];
};

function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "profile",
    source: "about",
    text: `${siteConfig.name} is ${siteConfig.headline} based in ${siteConfig.location}. ${siteConfig.summary} Status: ${siteConfig.status}. Contact: ${siteConfig.email}, ${siteConfig.phone}.`,
    keywords: [
      "profile",
      "about",
      "summary",
      "contact",
      "location",
      "status",
      "internship",
    ],
  });

  chunks.push({
    id: "highlights",
    source: "achievements",
    text: `Key highlights: ${siteConfig.highlights.join("; ")}.`,
    keywords: [
      "achievements",
      "awards",
      "codevita",
      "arcade",
      "ambassador",
      "rank",
    ],
  });

  for (const p of projects) {
    chunks.push({
      id: `project-${p.slug}`,
      source: "projects",
      text: `Project ${p.title} (${p.year}): ${p.tagline}. Problem: ${p.problem} Solution: ${p.solution} Tech stack: ${p.stack.join(", ")}. AI components: ${p.ai.join(", ")}. Metrics: ${p.metrics.map((m) => `${m.label} ${m.value}`).join(", ")}.`,
      keywords: [
        "project",
        p.slug,
        ...p.ai.map((t) => t.toLowerCase()),
        ...p.stack.map((t) => t.toLowerCase()),
      ],
    });
  }

  for (const g of skillGroups) {
    chunks.push({
      id: `skills-${g.title.toLowerCase().replace(/\W+/g, "-")}`,
      source: "skills",
      text: `${g.title}: ${g.items.map((i) => `${i.name} (${i.level})`).join(", ")}.`,
      keywords: [
        "skills",
        g.title.toLowerCase(),
        ...g.items.map((i) => i.name.toLowerCase()),
      ],
    });
  }

  chunks.push({
    id: "core-strengths",
    source: "skills",
    text: `Core strengths: ${coreStrengths.join(", ")}.`,
    keywords: [
      "strengths",
      "core",
      "best",
      ...coreStrengths.map((s) => s.toLowerCase()),
    ],
  });

  for (const j of journey) {
    chunks.push({
      id: `journey-${j.title.toLowerCase().replace(/\W+/g, "-").slice(0, 40)}`,
      source: "experience",
      text: `${j.period} — ${j.title} at ${j.org}. ${j.points.join(" ")}`,
      keywords: [
        "experience",
        "journey",
        "cloud",
        "gcp",
        "google",
        "internship",
        "work",
        "labs",
      ],
    });
  }

  for (const e of education) {
    chunks.push({
      id: `education-${e.degree.toLowerCase().replace(/\W+/g, "-").slice(0, 40)}`,
      source: "education",
      text: `${e.degree}, ${e.institution}, ${e.location}, ${e.period}. ${e.details.join(", ")}.`,
      keywords: [
        "education",
        "degree",
        "college",
        "university",
        "cgpa",
        "school",
        "marks",
        "study",
      ],
    });
  }

  for (const c of credentials) {
    chunks.push({
      id: `credential-${c.title.toLowerCase().replace(/\W+/g, "-").slice(0, 40)}`,
      source: "credentials",
      text: `${c.category}: ${c.title} — ${c.issuer}, ${c.year}.`,
      keywords: [
        "certification",
        "certificate",
        "badge",
        "achievement",
        ...c.title.toLowerCase().split(/\W+/).filter(Boolean),
      ],
    });
  }

  chunks.push({
    id: "links",
    source: "links",
    text: `Profiles: LinkedIn ${siteConfig.social.linkedin}; GitHub ${siteConfig.social.github}; Kaggle ${siteConfig.social.kaggle}; X ${siteConfig.social.twitter}; LeetCode ${siteConfig.social.leetcode}; GeeksforGeeks ${siteConfig.social.geeksforgeeks}; Google Skills ${siteConfig.social.googleSkills}; Credly ${siteConfig.social.credly}.`,
    keywords: [
      "links",
      "social",
      "github",
      "linkedin",
      "kaggle",
      "leetcode",
      "credly",
      "profile",
    ],
  });

  return chunks;
}

export const CHUNKS = buildChunks();
