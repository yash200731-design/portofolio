/**
 * Yash Trivedi Portfolio - TypeScript Definitions
 */

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface Skill {
  name: string;
  category: "Languages" | "Cloud & DevOps" | "Frontend" | "AI / ML" | "Tools";
  level: number; // Percentage 0 - 100
  iconName: string; // Key of Lucide icon or custom vector name
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  iconType: "azure" | "critical-thinking" | "cybersecurity" | "generic";
  skillsLearned: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}
