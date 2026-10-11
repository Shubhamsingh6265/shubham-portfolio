"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Tool = { id: string; label: string; usedIn: string };
type Domain = {
  id: string;
  label: string;
  full: string;
  usedIn: string;
  tools: Tool[];
};

const DOMAINS: Domain[] = [
  {
    id: "nlp",
    label: "NLP",
    full: "Natural Language Processing",
    usedIn: "GrievAI",
    tools: [
      { id: "muril", label: "MuRIL", usedIn: "GrievAI" },
      { id: "finbert", label: "FinBERT", usedIn: "GrievAI" },
      { id: "tokenizer", label: "AutoTokenizer", usedIn: "GrievAI" },
    ],
  },
  {
    id: "genai",
    label: "GenAI",
    full: "Generative AI & LLMs",
    usedIn: "Bharat Sangam · GrievAI",
    tools: [
      { id: "hf", label: "Hugging Face", usedIn: "GrievAI" },
      { id: "grok", label: "Grok API", usedIn: "Bharat Sangam · this site" },
      { id: "gemini", label: "Gemini API", usedIn: "AI experiments" },
      { id: "rag", label: "RAG pipelines", usedIn: "Bharat Sangam" },
    ],
  },
  {
    id: "ml",
    label: "ML & Data",
    full: "Machine Learning & Data Science",
    usedIn: "GrievAI · Gau Gyan",
    tools: [
      { id: "sklearn", label: "Scikit-learn", usedIn: "GrievAI" },
      { id: "pandas", label: "Pandas", usedIn: "all projects" },
      { id: "numpy", label: "NumPy", usedIn: "all projects" },
    ],
  },
  {
    id: "cv",
    label: "Vision",
    full: "Computer Vision",
    usedIn: "Gau Gyan",
    tools: [
      { id: "cnn", label: "CNN", usedIn: "Gau Gyan" },
      { id: "opencv", label: "OpenCV", usedIn: "Gau Gyan" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    full: "Cloud & DevOps",
    usedIn: "Gau Gyan · this site",
    tools: [
      { id: "gcp", label: "GCP", usedIn: "9+ months · Arcade tiers" },
      { id: "aws", label: "AWS", usedIn: "Gau Gyan" },
      { id: "git", label: "Git / GitHub", usedIn: "everything" },
    ],
  },
  {
    id: "data",
    label: "Data",
    full: "Databases & Vector Stores",
    usedIn: "Gau Gyan · Bharat Sangam",
    tools: [
      { id: "pg", label: "PostgreSQL", usedIn: "Gau Gyan" },
      { id: "chroma", label: "ChromaDB", usedIn: "Bharat Sangam" },
      { id: "firebase", label: "Firebase", usedIn: "web builds" },
    ],
  },
];

const W = 800;
const H = 560;
const CX = W / 2;
const CY = H / 2;

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

const domainPos = DOMAINS.map((d, i) => {
  const angle = -90 + i * (360 / DOMAINS.length);
  return { ...d, angle, pos: polar(150, angle) };
});

const toolPos = domainPos.flatMap((d) => {
  const n = d.tools.length;
  const spread = 14;
  const start = d.angle - ((n - 1) * spread) / 2;
  return d.tools.map((t, ti) => ({
    ...t,
    domainId: d.id,
    pos: polar(235, start + ti * spread),
  }));
});

export function SkillConstellation() {
  const [active, setActive] = useState<string | null>(null);

  const lit = (() => {
    const domains = new Set<string>();
    const tools = new Set<string>();
    let core = false;

    const domain = domainPos.find((d) => d.id === active);
    const tool = toolPos.find((t) => t.id === active);

    if (active === "core") {
      core = true;
      domainPos.forEach((d) => domains.add(d.id));
    } else if (domain) {
      core = true;
      domains.add(domain.id);
      toolPos
        .filter((t) => t.domainId === domain.id)
        .forEach((t) => tools.add(t.id));
    } else if (tool) {
      core = true;
      domains.add(tool.domainId);
      tools.add(tool.id);
    }

    return { domains, tools, core };
  })();

  const activeInfo = (() => {
    if (!active) return null;
    if (active === "core")
      return {
        label: "Python",
        usedIn: "every project & script",
        x: CX,
        y: CY - 46,
      };
    const d = domainPos.find((d) => d.id === active);
    if (d)
      return { label: d.full, usedIn: d.usedIn, x: d.pos.x, y: d.pos.y - 34 };
    const t = toolPos.find((t) => t.id === active);
    if (t)
      return { label: t.label, usedIn: t.usedIn, x: t.pos.x, y: t.pos.y - 14 };
    return null;
  })();

  return (
    <div className="relative" onMouseLeave={() => setActive(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none">
        {/* core → domain edges */}
        {domainPos.map((d) => (
          <line
            key={`ec-${d.id}`}
            x1={CX}
            y1={CY}
            x2={d.pos.x}
            y2={d.pos.y}
            stroke={
              lit.domains.has(d.id) ? "#22d3ee" : "rgba(255,255,255,0.08)"
            }
            strokeWidth={lit.domains.has(d.id) ? 1.5 : 1}
            className="transition-all duration-300"
          />
        ))}
        {/* domain → tool edges */}
        {toolPos.map((t) => {
          const d = domainPos.find((d) => d.id === t.domainId)!;
          return (
            <line
              key={`et-${t.id}`}
              x1={d.pos.x}
              y1={d.pos.y}
              x2={t.pos.x}
              y2={t.pos.y}
              stroke={
                lit.tools.has(t.id) ? "#2dd4bf" : "rgba(255,255,255,0.06)"
              }
              strokeWidth={lit.tools.has(t.id) ? 1.5 : 1}
              className="transition-all duration-300"
            />
          );
        })}

        {/* core node */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          onMouseEnter={() => setActive("core")}
          onClick={() => setActive("core")}
          onMouseLeave={() => setActive(null)}
          tabIndex={0}
          className="cursor-pointer outline-none"
        >
          <circle
            cx={CX}
            cy={CY}
            r={44}
            fill="none"
            stroke="rgba(34,211,238,0.25)"
            strokeDasharray="4 6"
          />
          <circle
            cx={CX}
            cy={CY}
            r={34}
            fill="#0a262e"
            stroke={lit.core ? "#22d3ee" : "rgba(34,211,238,0.6)"}
            strokeWidth={1.5}
            className="transition-all duration-300"
          />
          <text
            x={CX}
            y={CY + 4}
            textAnchor="middle"
            fontSize={13}
            fontWeight={700}
            fontFamily="monospace"
            className="fill-aqua-300"
          >
            Python
          </text>
        </motion.g>

        {/* domain nodes */}
        {domainPos.map((d, i) => (
          <motion.g
            key={d.id}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            onMouseEnter={() => setActive(d.id)}
            onClick={() => setActive(d.id)}
            onMouseLeave={() => setActive(null)}
            tabIndex={0}
            className="cursor-pointer outline-none"
          >
            <circle
              cx={d.pos.x}
              cy={d.pos.y}
              r={26}
              fill={lit.domains.has(d.id) ? "#0b2931" : "#10161c"}
              stroke={
                lit.domains.has(d.id) ? "#22d3ee" : "rgba(255,255,255,0.15)"
              }
              strokeWidth={1.2}
              className="transition-all duration-300"
            />
            <text
              x={d.pos.x}
              y={d.pos.y + 3.5}
              textAnchor="middle"
              fontSize={9.5}
              fontWeight={600}
              className={
                lit.domains.has(d.id) ? "fill-aqua-300" : "fill-fog-300"
              }
            >
              {d.label}
            </text>
          </motion.g>
        ))}

        {/* tool nodes */}
        {toolPos.map((t, i) => (
          <motion.g
            key={t.id}
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            onMouseEnter={() => setActive(t.id)}
            onClick={() => setActive(t.id)}
            onMouseLeave={() => setActive(null)}
            tabIndex={0}
            className="cursor-pointer outline-none"
          >
            <circle
              cx={t.pos.x}
              cy={t.pos.y}
              r={lit.tools.has(t.id) ? 7 : 5}
              fill={lit.tools.has(t.id) ? "#2dd4bf" : "rgba(182,194,207,0.5)"}
              className="transition-all duration-300"
            />
            <text
              x={t.pos.x}
              y={t.pos.y + 18}
              textAnchor="middle"
              fontSize={9}
              fontFamily="monospace"
              className={lit.tools.has(t.id) ? "fill-teal-400" : "fill-fog-500"}
            >
              {t.label}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* tooltip */}
      {activeInfo && (
        <div
          className="absolute pointer-events-none glass rounded-lg px-3 py-2 text-xs -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(activeInfo.x / W) * 100}%`,
            top: `${(activeInfo.y / H) * 100}%`,
          }}
        >
          <p className="font-semibold text-aqua-300">{activeInfo.label}</p>
          <p className="text-fog-400 mt-0.5">used in: {activeInfo.usedIn}</p>
        </div>
      )}

      <p className="mt-4 text-center font-mono text-xs text-fog-500">
        {
          "// hover or tap any node — lit connections show where each tool was actually used"
        }
      </p>
    </div>
  );
}
