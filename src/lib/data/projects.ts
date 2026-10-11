export type Project = {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  ai: string[];
  metrics: { label: string; value: string }[];
  terminal?: string[];
  links?: { github?: string; demo?: string };
  status: "completed" | "in-progress" | "concept";
  year: number;
};

export const projects: Project[] = [
  {
    slug: "grievai",
    title: "GrievAI",
    tagline: "Multilingual Citizen Grievance Routing Engine",
    problem:
      "Manual classification of citizen grievances across regional languages is time-consuming and error-prone.",
    solution:
      "Built an AI-driven system that automatically classifies and routes grievances to respective government departments using transformer models fine-tuned for Indian languages.",
    stack: ["Python", "Hugging Face", "PostgreSQL", "FastAPI"],
    ai: ["MuRIL", "FinBERT", "AutoTokenizer", "NLP", "Text Classification"],
    metrics: [
      { label: "MuRIL Accuracy", value: "88%" },
      { label: "FinBERT Accuracy", value: "85.1%" },
      { label: "Languages", value: "10+" },
    ],
    terminal: [
      "$ python train.py --model google/muril --epochs 8",
      "[info] AutoTokenizer loaded · 11 regional languages",
      "[train] epoch 8/8 · loss 0.118 · lr 2e-5",
      "✓ accuracy 88.0% · grievance router live",
    ],
    status: "completed",
    year: 2026,
  },
  {
    slug: "bharat-sangam",
    title: "Bharat Sangam",
    tagline: "AI-Powered Cultural Heritage Platform",
    problem:
      "Tourists lack real-time, contextual information about India's cultural heritage sites.",
    solution:
      "Developed a location-aware, voice-enabled RAG chatbot that delivers real-time historical narratives based on tourist GPS coordinates, integrated with 3D heritage models.",
    stack: ["Python", "ChromaDB", "Google TTS", "React", "Three.js"],
    ai: [
      "RAG Pipeline",
      "Grok API",
      "Vector Search",
      "Voice Synthesis",
      "Location Intelligence",
    ],
    metrics: [
      { label: "Response Time", value: "2s" },
      { label: "Heritage Sites", value: "50+" },
      { label: "Voice Languages", value: "5" },
    ],
    terminal: [
      "$ rag serve --index chroma:heritage_in",
      "[info] 50+ heritage docs embedded · grok-3-mini",
      "[gps] tourist @ sanchi-stupa · context 4 chunks",
      "✓ tts narrative streamed · 1.8s latency",
    ],
    status: "completed",
    year: 2026,
  },
  {
    slug: "gau-gyan",
    title: "Gau Gyan",
    tagline: "CNN-Based Cattle Recognition System",
    problem:
      "Farmers struggle to identify cattle breeds and health conditions, especially for cross-bred or less-documented varieties.",
    solution:
      "Engineered CNN deep learning models for cattle breed identification and health analysis, with PostgreSQL backend deployed on AWS for field access.",
    stack: ["Python", "TensorFlow/Keras", "PostgreSQL", "AWS EC2", "OpenCV"],
    ai: ["CNN", "Image Classification", "Object Detection", "Deep Learning"],
    metrics: [
      { label: "Breed Accuracy", value: "82%" },
      { label: "Query Speedup", value: "40%" },
      { label: "AWS Uptime", value: "99.5%" },
    ],
    terminal: [
      "$ python predict.py --img cow_042.jpg",
      "[cnn] breed: cross-bred · confidence 0.82",
      "[pg] schema optimized · queries 40% faster",
      "✓ aws endpoint 200 OK · uptime 99.5%",
    ],
    status: "completed",
    year: 2025,
  },
  {
    slug: "engicalc",
    title: "EngiCalc",
    tagline: "Scientific Calculator for Engineering Students",
    problem:
      "Engineering students need a fast, feature-rich calculator accessible anywhere.",
    solution:
      "Built a fully functional scientific calculator with advanced engineering functions, built rapidly using AI-assisted development.",
    stack: ["JavaScript", "React", "Tailwind CSS"],
    ai: ["AI-Assisted Development"],
    metrics: [
      { label: "Functions", value: "50+" },
      { label: "Load Time", value: "1s" },
    ],
    status: "completed",
    year: 2026,
  },
  {
    slug: "drivesim",
    title: "DriveSim",
    tagline: "Real-World Car Simulation Game",
    problem:
      "Creating an engaging driving simulation with realistic physics and controls.",
    solution:
      "Developed a car simulation game inspired by Dr. Driving, featuring realistic physics and smooth controls.",
    stack: ["JavaScript", "HTML5 Canvas", "Physics Engine"],
    ai: ["AI-Assisted Development"],
    metrics: [
      { label: "FPS", value: "60" },
      { label: "Vehicles", value: "5" },
    ],
    status: "completed",
    year: 2026,
  },
];
