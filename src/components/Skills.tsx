import { useState } from "react";
import { 
  Terminal, 
  Code, 
  Cloud, 
  Brain, 
  FileCode, 
  Palette, 
  GitBranch, 
  Github,
  Layers
} from "lucide-react";
import { SKILLS } from "../data";
import { Skill } from "../types";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Languages", "Frontend", "Cloud & DevOps", "AI / ML", "Tools"];

  const filteredSkills = selectedCategory === "All" 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === selectedCategory);

  // Dynamic Lucide Icon Mapper
  const renderSkillIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-indigo-500 dark:text-indigo-400";
    switch (iconName) {
      case "FileCode2":
        return <FileCode className={iconClass} />;
      case "Code":
        return <Code className={iconClass} />;
      case "Cloud":
        return <Cloud className={iconClass} />;
      case "Brain":
        return <Brain className={iconClass} />;
      case "Palette":
        return <Palette className={iconClass} />;
      case "GitBranch":
        return <GitBranch className={iconClass} />;
      case "Github":
        return <Github className={iconClass} />;
      default:
        return <Terminal className={iconClass} />;
    }
  };

  // Human descriptive text overlay for skills
  const getSkillContext = (skillName: string) => {
    switch (skillName) {
      case "Python":
        return "Used extensively for machine learning pipelines, data analysis, and serverless AWS scripts.";
      case "AWS":
        return "Experienced with API Gateway, Serverless Lambda, carbon evaluation tools, and IAM permissions.";
      case "HTML":
        return "Building structured, semantic, and highly SEO-optimized modern DOM templates.";
      case "CSS":
        return "Designing advanced custom layouts, grid configurations, glassmorphic filters, and keyframe animations.";
      case "JavaScript":
        return "Core frontend logic, client state reactivity, browser event binding, and backend scripting.";
      case "Git":
        return "Robust command line branch versioning, merge conflict resolution, and feature-flag workflows.";
      case "GitHub":
        return "CI/CD integration, open-source collaborative code reviews, and clean release management.";
      case "AI/ML":
        return "Specialized in text feature extraction, sentiment metrics, algorithm selection, and NLP engines.";
      default:
        return "Proven technology stack integrated within production tasks and academic prototypes.";
    }
  };

  return (
    <section
      id="skills"
      className="py-20 bg-transparent border-t border-[#e0e0d8] dark:border-[#2a2a28] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#efefea] dark:bg-[#161616] text-[#888880] border border-[#e0e0d8] dark:border-[#2a2a28]">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold font-mono tracking-wider uppercase">Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0e0e0e] dark:text-[#f5f5f0]">
            My Skills & Expertise
          </h2>
          <div className="h-1 w-16 bg-indigo-500 mx-auto rounded" />
        </div>

        {/* Filter Categories Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-xl border transition-all cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#6366f1] border-[#6366f1] text-white shadow-md shadow-indigo-600/15"
                  : "bg-[#efefea] dark:bg-[#161616] border-[#e0e0d8] dark:border-[#2a2a28] text-[#888880] hover:text-[#0e0e0e] dark:hover:text-[#f5f5f0]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredSkills.map((skill: Skill) => (
            <div
              key={skill.name}
              className="p-6 rounded-2xl bg-[#efefea] dark:bg-[#161616] border border-[#e0e0d8] dark:border-[#2a2a28] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100/10 dark:border-indigo-800/25 flex-shrink-0">
                      {renderSkillIcon(skill.iconName)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-tight">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Skill usage description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans italic border-t border-slate-100 dark:border-slate-800/40 pt-3">
                {getSkillContext(skill.name)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
