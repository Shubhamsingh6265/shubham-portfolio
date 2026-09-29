export type Credential = {
  title: string;
  issuer: string;
  year: number;
  url?: string;
  category: "certification" | "achievement" | "badge";
};

export const credentials: Credential[] = [
  // Certifications
  {
    title: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services Academy",
    year: 2025,
    category: "certification",
  },
  {
    title: "Python Essential 1",
    issuer: "Cisco Networking Academy",
    year: 2026,
    category: "certification",
  },
  {
    title: "C++ Programming Language",
    issuer: "Infosys Springboard",
    year: 2026,
    category: "certification",
  },
  {
    title: "C Programming",
    issuer: "SkillUp",
    year: 2024,
    category: "certification",
  },
  {
    title: "JavaScript",
    issuer: "Cisco Networking Academy",
    year: 2025,
    category: "certification",
  },

  // Achievements
  {
    title: "TCS CodeVita Season 13 - Global Top 1500",
    issuer: "TCS",
    year: 2026,
    category: "achievement",
  },
  {
    title: "Google Student Ambassador (Team Gemini)",
    issuer: "Google",
    year: 2025,
    category: "achievement",
  },

  // Badges
  {
    title: "Google Cloud Arcade - Champion Tier",
    issuer: "Google Cloud",
    year: 2026,
    url: "https://www.credly.com/users/shubham-singh.d74f728b",
    category: "badge",
  },
  {
    title: "Google Cloud Arcade - Legend Tier",
    issuer: "Google Cloud",
    year: 2026,
    url: "https://www.credly.com/users/shubham-singh.d74f728b",
    category: "badge",
  },
  {
    title: "AIAPC Certification",
    issuer: "Google",
    year: 2025,
    category: "badge",
  },
];
