export type JourneyItem = {
  period: string;
  title: string;
  org: string;
  points: string[];
  type: "experience" | "education" | "certification";
};

export const journey: JourneyItem[] = [
  {
    period: "2025 - Present",
    title: "Google Cloud Console Experience (9+ months)",
    org: "Self-Directed Learning",
    points: [
      "Completed 50+ hands-on labs across microservices, cloud infrastructure, and data visualization",
      "Achieved Google Cloud Arcade Champion and Legend tier status",
      "Deployed ML models and backend services on GCP infrastructure",
      "Gained expertise in cloud-native AI/ML deployment patterns",
    ],
    type: "experience",
  },
  {
    period: "2025",
    title: "Google Student Ambassador (Team Gemini)",
    org: "Google",
    points: [
      "Earned 250+ milestone reward for successful candidate referrals",
      "Received PING Network Letter of Appreciation",
      "Promoted Google AI tools and Gemini platform among students",
    ],
    type: "experience",
  },
];
