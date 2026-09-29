export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
};

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science & Engineering (AI & ML)",
    institution: "Bansal Institute of Science and Technology",
    location: "Bhopal (RGPV University)",
    period: "2024 - 2028 (Expected)",
    details: ["CGPA: 7.92 (up to 3rd Semester)"],
  },
  {
    degree: "Class XII",
    institution: "Model Higher Secondary School",
    location: "T.T. Nagar, Bhopal",
    period: "2023 - 2024",
    details: ["92%"],
  },
  {
    degree: "Class X",
    institution: "Model Higher Secondary School",
    location: "T.T. Nagar, Bhopal",
    period: "2021 - 2022",
    details: ["91.6%"],
  },
];