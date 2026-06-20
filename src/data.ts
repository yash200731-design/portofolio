import { Project, Skill, Certification, ContactInfo } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "sentiment-analysis",
    name: "Sentiment Analysis",
    description: "An AI-powered natural language processing application that classifies text reviews and social feeds into sentiment categories with dynamic graphical indicators.",
    technologies: ["Python", "AI/ML", "NLP", "Git", "Streamlit"],
    githubUrl: "https://github.com/yash200731-design/sentiment-analysis",
    demoUrl: "https://github.com/yash200731-design/sentiment-analysis#demo",
    isCustom: false
  },
  {
    id: "green-code-choice",
    name: "Green Code Choice (AWS Sustainability Project)",
    description: "A cloud analytics dashboard that dynamically evaluates serverless workload execution paths to calculate and optimize your carbon footprint using AWS Serverless concepts.",
    technologies: ["AWS", "Python", "Cloud Computing", "AI/ML", "GitHub"],
    githubUrl: "https://github.com/yash200731-design/AWS-PROJECT",
    demoUrl: "https://aws-project-iota.vercel.app/",
    isCustom: false
  },
  {
    id: "e-commerce-website",
    name: "E-Commerce Website",
    description: "A fully responsive multi-category online store featuring instant responsive product filters, fluid local cart persistence, and beautiful glassmorphic micro-animations.",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub", "Responsive Design"],
    githubUrl: "https://github.com/yash200731-design/Happy_Hookers",
    demoUrl: "https://happy-hookers.vercel.app/",
    isCustom: false
  }
];

export const SKILLS: Skill[] = [
  {
    name: "Python",
    category: "Languages",
    level: 90,
    iconName: "FileCode2"
  },
  {
    name: "JavaScript",
    category: "Languages",
    level: 85,
    iconName: "Code"
  },
  {
    name: "AWS",
    category: "Cloud & DevOps",
    level: 80,
    iconName: "Cloud"
  },
  {
    name: "AI/ML",
    category: "AI / ML",
    level: 85,
    iconName: "Brain"
  },
  {
    name: "HTML",
    category: "Frontend",
    level: 95,
    iconName: "FileHtml"
  },
  {
    name: "CSS",
    category: "Frontend",
    level: 90,
    iconName: "Palette"
  },
  {
    name: "Git",
    category: "Tools",
    level: 88,
    iconName: "GitBranch"
  },
  {
    name: "GitHub",
    category: "Tools",
    level: 92,
    iconName: "Github"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "2025",
    credentialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    iconType: "azure",
    skillsLearned: ["Cloud Concepts", "Azure Architecture", "Governance", "Security & Compliance"]
  },
  {
    name: "Critical Thinking in the AI Era",
    issuer: "Coursera / DeepLearning.AI",
    date: "2025",
    credentialUrl: "https://www.deeplearning.ai/",
    iconType: "critical-thinking",
    skillsLearned: ["AI Safety", "Empirical Evaluation", "Prompt Optimization", "Ethical AI Scaling"]
  },
  {
    name: "AI and Cyber Security",
    issuer: "Tata Consultancy Services (TCS)",
    date: "2026",
    credentialUrl: "https://www.tcs.com/",
    iconType: "cybersecurity",
    skillsLearned: ["Threat Detection", "Anomaly Recognition", "Infrastructure Security", "AI Risk Frameworks"]
  }
];

export const CONTACT_INFO: ContactInfo = {
  email: "yash2007.31@gmail.com",
  phone: "9910432942",
  github: "https://github.com/yash200731-design",
  linkedin: "https://www.linkedin.com/in/yash-trivedi-3941a43a7/"
};
