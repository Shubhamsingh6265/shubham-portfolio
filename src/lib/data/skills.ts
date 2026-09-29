export type SkillGroup = {
  title: string;
  icon: string;
  items: { name: string; level: "beginner" | "intermediate" | "advanced" }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "code",
    items: [
      { name: "Python", level: "advanced" },
      { name: "C++", level: "intermediate" },
      { name: "C", level: "intermediate" },
      { name: "JavaScript", level: "intermediate" },
      { name: "SQL", level: "intermediate" },
    ],
  },
  {
    title: "AI/ML & Data",
    icon: "brain",
    items: [
      { name: "NumPy", level: "advanced" },
      { name: "Pandas", level: "advanced" },
      { name: "Scikit-learn", level: "advanced" },
      { name: "NLP", level: "advanced" },
      { name: "Deep Learning", level: "intermediate" },
      { name: "Computer Vision", level: "intermediate" },
      { name: "Anomaly Detection", level: "intermediate" },
    ],
  },
  {
    title: "GenAI & LLM Tools",
    icon: "sparkles",
    items: [
      { name: "Hugging Face", level: "advanced" },
      { name: "MuRIL", level: "advanced" },
      { name: "FinBERT", level: "advanced" },
      { name: "Gemini API", level: "intermediate" },
      { name: "Grok API", level: "intermediate" },
      { name: "RAG Pipelines", level: "intermediate" },
      { name: "ChromaDB", level: "intermediate" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    items: [
      { name: "Google Cloud Platform", level: "advanced" },
      { name: "AWS", level: "intermediate" },
      { name: "Git", level: "advanced" },
      { name: "GitHub", level: "advanced" },
      { name: "Linux", level: "beginner" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    items: [
      { name: "PostgreSQL", level: "advanced" },
      { name: "Firebase Auth", level: "intermediate" },
    ],
  },
  {
    title: "Web (AI-Assisted)",
    icon: "globe",
    items: [
      { name: "React", level: "intermediate" },
      { name: "Next.js", level: "intermediate" },
      { name: "Tailwind CSS", level: "intermediate" },
      { name: "FastAPI", level: "beginner" },
    ],
  },
];

export const coreStrengths = [
  "Python",
  "C++",
  "Google Cloud",
  "Machine Learning",
  "Deep Learning",
];
