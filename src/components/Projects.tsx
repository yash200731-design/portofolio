import React, { useState, useEffect } from "react";
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  Plus, 
  Trash2, 
  X, 
  Code,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Link2
} from "lucide-react";
import { Project } from "../types";
import { INITIAL_PROJECTS } from "../data";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "featured" | "custom">("all");

  // Form states
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch initial projects populated with localstorage updates and sync with updated static definitions
  useEffect(() => {
    const stored = localStorage.getItem("yash_developer_portfolio_projects");
    if (stored) {
      try {
        const parsed: Project[] = JSON.parse(stored);
        const updatedList = parsed
          .map(p => {
            const matchingStatic = INITIAL_PROJECTS.find(ip => ip.id === p.id);
            if (matchingStatic) {
              return { ...matchingStatic };
            }
            return p;
          })
          .filter(p => p.isCustom || INITIAL_PROJECTS.some(ip => ip.id === p.id));
        
        // Also ensure any newly added static projects that missed the cache are prepended
        const missingStatic = INITIAL_PROJECTS.filter(ip => !updatedList.some(p => p.id === ip.id));
        const finalMerged = [...missingStatic, ...updatedList];

        setProjects(finalMerged);
        localStorage.setItem("yash_developer_portfolio_projects", JSON.stringify(finalMerged));
      } catch (e) {
        setProjects(INITIAL_PROJECTS);
        localStorage.setItem("yash_developer_portfolio_projects", JSON.stringify(INITIAL_PROJECTS));
      }
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem("yash_developer_portfolio_projects", JSON.stringify(INITIAL_PROJECTS));
    }
  }, []);

  const saveToStorage = (updatedList: Project[]) => {
    setProjects(updatedList);
    localStorage.setItem("yash_developer_portfolio_projects", JSON.stringify(updatedList));
  };

  // Safe reset to restore the portfolio defaults
  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to restore the initial projects? This will remove custom additions.")) {
      saveToStorage(INITIAL_PROJECTS);
      setFilter("all");
    }
  };

  // Validate fields in compliance with React quality standards
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!projectName.trim()) tempErrors.projectName = "Project name is required.";
    if (!description.trim()) {
      tempErrors.description = "Please write a short description.";
    } else if (description.trim().length < 15) {
      tempErrors.description = "Provide at least 15 characters to make the card look balanced.";
    }
    if (!technologies.trim()) tempErrors.technologies = "Add at least one tech stack (e.g. React, AWS).";

    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
    
    if (githubUrl.trim() && !urlRegex.test(githubUrl.trim())) {
      tempErrors.githubUrl = "Please supply a valid URL path (e.g., https://github.com/...).";
    }
    if (demoUrl.trim() && !urlRegex.test(demoUrl.trim())) {
      tempErrors.demoUrl = "Please supply a valid URL path (e.g., https://example.com).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Split technologies by comma and trim whitespace
    const techArray = technologies
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newProject: Project = {
      id: `custom-${Date.now()}`,
      name: projectName.trim(),
      description: description.trim(),
      technologies: techArray,
      githubUrl: githubUrl.trim() || "https://github.com/yash200731-design",
      demoUrl: demoUrl.trim() || "https://github.com/yash200731-design",
      isCustom: true,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newProject, ...projects];
    saveToStorage(updated);
    
    // Clear state
    setProjectName("");
    setDescription("");
    setTechnologies("");
    setGithubUrl("");
    setDemoUrl("");
    setErrors({});
    setIsModalOpen(false);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveToStorage(updated);
  };

  const filteredProjects = projects.filter(p => {
    if (filter === "featured") return !p.isCustom;
    if (filter === "custom") return p.isCustom;
    return true;
  });

  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Utilities */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <FolderGit2 className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-semibold font-mono tracking-wider uppercase">Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 dark:text-white leading-none">
              Featured Work
            </h2>
            <div className="h-1 w-16 bg-indigo-500 rounded md:mx-0 mx-auto" />
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filter === "all" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-amber-400"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setFilter("featured")}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filter === "featured" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-amber-400"
                }`}
              >
                Initial
              </button>
              <button
                onClick={() => setFilter("custom")}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filter === "custom" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-amber-400"
                }`}
              >
                Added By You ({projects.filter(p => p.isCustom).length})
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl flex items-center space-x-2 shadow-lg shadow-indigo-600/10 active:translate-y-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>

            {projects.length !== INITIAL_PROJECTS.length && (
              <button
                onClick={resetToDefaults}
                title="Restore default mock projects"
                className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Empty status */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-50/50 dark:bg-slate-800/10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Projects Found</h3>
            <p className="text-sm text-slate-500 mt-1">
              {filter === "custom" 
                ? "You haven't uploaded any custom projects yet! Try clicking 'Add Project'." 
                : "No matching items."}
            </p>
          </div>
        )}

        {/* Projects Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/65 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:-translate-y-1.5 transition-all duration-300 relative"
            >
              <div className="p-6 space-y-4">
                
                {/* Tech Badges / Label */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    {project.isCustom ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Dynamic Addition</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        Featured Showcase
                      </span>
                    )}
                  </div>

                  {project.isCustom && (
                    <button
                      onClick={() => deleteProject(project.id)}
                      aria-label="Delete Project"
                      className="text-slate-400 hover:text-rose-500 p-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-500 transition-colors">
                  {project.name}
                </h3>

                {/* Project description */}
                <p className="text-sm text-slate-600 dark:text-slate-430 leading-relaxed font-sans min-h-[72px]">
                  {project.description}
                </p>

                {/* Tech chips list */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-[11px] font-mono font-medium rounded-lg bg-white dark:bg-slate-850 border border-slate-200/40 dark:border-slate-850 text-slate-600 dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom bar container */}
              <div className="px-6 py-4 bg-slate-100/40 dark:bg-slate-900/20 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-405 dark:hover:text-indigo-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Popover Form (Add Project) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden relative animate-scale-up">
              
              {/* Form title header bar */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500">
                    <FolderGit2 className="w-4 h-4" />
                  </span>
                  <span className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                    Describe Your Project
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setErrors({});
                  }}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form container body */}
              <form onSubmit={handleAddProjectSubmit} className="p-6 space-y-4">
                
                {/* Project Name Field */}
                <div>
                  <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Serverless Task Scheduler"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                  />
                  {errors.projectName && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.projectName}
                    </p>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short 2-sentence description of the goals, problems solved, and accomplishments..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                  />
                  {errors.description && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Technologies List */}
                <div>
                  <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase mb-1">
                    Technologies (separate with commas) *
                  </label>
                  <input
                    type="text"
                    required
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    placeholder="e.g. React, Python, Cloud SQL, REST API"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                  />
                  {errors.technologies && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.technologies}
                    </p>
                  )}
                </div>

                {/* Link inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* GitHub URL */}
                  <div>
                    <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase mb-1">
                      GitHub URL (optional)
                    </label>
                    <input
                      type="text"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                    />
                    {errors.githubUrl && (
                      <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {errors.githubUrl}
                      </p>
                    )}
                  </div>

                  {/* Live Demo URL */}
                  <div>
                    <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-505 uppercase mb-1">
                      Live Demo URL (optional)
                    </label>
                    <input
                      type="text"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                    />
                    {errors.demoUrl && (
                      <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        {errors.demoUrl}
                      </p>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-850">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setErrors({});
                    }}
                    className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/10 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    Submit Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
