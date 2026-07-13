import React, { useState, useEffect, useRef } from "react";
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  Plus, 
  Trash2, 
  X, 
  AlertCircle,
  RotateCcw,
  Sparkles
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "../types";
import { INITIAL_PROJECTS } from "../data";
import "./Projects.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Shuffle Deck Configuration
const CONFIG = {
  pinScroll: 600,            // pin length, % of viewport (higher = slower per scroll)
  riseEnd:     0.16,         // deck rises (linear) to title level
  dropEnd:     0.44,         // cards drop one-by-one to the bottom
  disperseEnd: 0.56,         // bottom stack -> diagonal + flip (fast)
  plateauEnd:  0.78,         // interactive window: disperseEnd .. plateauEnd
  riseToFrac:  0.82,         // rise stops at this fraction of the safe top
  dropDur:     0.14,         // per-card fall duration (drives the one-by-one cascade)
  edgePad:     24,           // keep cards this many px inside the stage edges
  perspective: 1400,         // MUST match perspective in CSS
  diagZ:       130,          // depth spread in the diagonal
  diagLean:    -9,           // base lean along the diagonal (deg)
  diagLeanJit: 7,            // lean jitter
  diagTiltX:   6,            // rotateX in the diagonal (deg)
  deckStepX: 1.2, deckStepY: 0.6, deckStepZ: 7, deckStepRot: 0.5,
  floatY: 10, floatRot: 1.4, floatDur: 2.4,
  hoverZ: 170, hoverScale: 1.08, hoverDimOthers: 0.5, hoverDur: 0.4,
  easeRise:     "sine.inOut",
  easeFall:     "power2.in",
  easeDisperse: "back.out(1.3)",
  easeRestack:  "power2.inOut",
  easeFlip:     "power2.inOut",
};

// Deterministic PRNG for card dispersal spread
function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "featured" | "custom">("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Form states
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Refs for 3D Deck
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [resizeKey, setResizeKey] = useState(0);

  // Sync projects with localStorage
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

  // Handle window resizing to recalculate 3D space coordinates
  useEffect(() => {
    const handleResize = () => {
      setResizeKey(prev => prev + 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const saveToStorage = (updatedList: Project[]) => {
    setProjects(updatedList);
    localStorage.setItem("yash_developer_portfolio_projects", JSON.stringify(updatedList));
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to restore the initial projects? This will remove custom additions.")) {
      saveToStorage(INITIAL_PROJECTS);
      setFilter("all");
    }
  };

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

  // Dynamic aesthetic gradient backgrounds matching project identities
  const getGradientClass = (id: string) => {
    switch (id) {
      case "sentiment-analysis":
        return "bg-gradient-to-br from-indigo-650 via-purple-600 to-pink-500";
      case "green-code-choice":
        return "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500";
      case "ai-translator":
        return "bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600";
      case "fake-news":
        return "bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500";
      default:
        return "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900";
    }
  };

  // Precompute poses coordinates
  const computePoses = (n: number, stageW: number, stageH: number, cardW: number, cardH: number) => {
    const rand = mulberry32(0x5eed); // fixed seed -> reversible scrub
    const pad = CONFIG.edgePad + CONFIG.floatY;
    const scaleZ = Math.max(CONFIG.diagZ, CONFIG.hoverZ);
    const nearScale = (CONFIG.perspective / (CONFIG.perspective - scaleZ)) * CONFIG.hoverScale;
    const lean = (Math.abs(CONFIG.diagLean) + CONFIG.diagLeanJit) * Math.PI / 180;
    const effW = (cardW * Math.cos(lean) + cardH * Math.sin(lean)) * nearScale;
    const effH = (cardW * Math.sin(lean) + cardH * Math.cos(lean)) * nearScale;
    const maxX = Math.max(40, stageW * 0.5 - effW * 0.5 - pad);
    const maxY = Math.max(40, stageH * 0.5 - effH * 0.5 - pad);
    const riseY = -maxY * CONFIG.riseToFrac;
    const bottomY = maxY;
    const poses = [];
    
    for (let i = 0; i < n; i++) {
      const t = n > 1 ? i / (n - 1) : 0.5; // 0 = top-left ... 1 = bottom-right
      const deck = {
        x: i * CONFIG.deckStepX, y: i * CONFIG.deckStepY, z: i * CONFIG.deckStepZ,
        rotationX: 0, rotation: i * CONFIG.deckStepRot
      };
      const title = {
        x: deck.x, y: riseY + i * CONFIG.deckStepY, z: deck.z,
        rotationX: 0, rotation: deck.rotation
      };
      const bottom = {
        x: i * CONFIG.deckStepX * 0.5, y: bottomY + i * CONFIG.deckStepY * 0.4,
        z: deck.z, rotationX: 0, rotation: deck.rotation
      };
      const diag = {
        x: lerp(-maxX, maxX, t),
        y: lerp(-maxY, maxY, t),
        z: (rand() * 2 - 1) * CONFIG.diagZ,
        rotationX: (rand() * 2 - 1) * CONFIG.diagTiltX,
        rotation: CONFIG.diagLean + (rand() * 2 - 1) * CONFIG.diagLeanJit
      };
      poses.push({ deck, title, bottom, diag });
    }
    return poses;
  };

  // GSAP 3D Scroll-Deck Timeline Setup
  useEffect(() => {
    if (window.innerWidth <= 900) return;

    const deckElement = deckRef.current;
    const sectionElement = sectionRef.current;
    if (!deckElement || !sectionElement) return;

    const cards = Array.from(deckElement.querySelectorAll(".card-item")) as HTMLElement[];
    const n = cards.length;
    if (n === 0) return;

    let ctx = gsap.context(() => {
      const stageW = deckElement.clientWidth || 1000;
      const stageH = deckElement.clientHeight || 550;
      const cardW = 260;
      const cardH = 360;
      
      const poses = computePoses(n, stageW, stageH, cardW, cardH);

      // Create scroll-bound timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          start: "top top",
          end: `+=${CONFIG.pinScroll}%`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          }
        }
      });

      // Position cards at resting deck state initially
      cards.forEach((card, i) => {
        const pose = poses[i];
        gsap.set(card, {
          x: pose.deck.x,
          y: pose.deck.y,
          z: pose.deck.z,
          rotationX: pose.deck.rotationX,
          rotationY: 0,
          rotationZ: pose.deck.rotation,
          transformOrigin: "center center",
          opacity: 1
        });
        const flipBtn = card.querySelector(".card__flip");
        gsap.set(flipBtn, { rotationY: 0 });
      });

      // 1. Rise Phase (0 -> riseEnd)
      cards.forEach((card, i) => {
        const pose = poses[i];
        tl.to(card, {
          x: pose.title.x,
          y: pose.title.y,
          z: pose.title.z,
          rotationZ: pose.title.rotation,
          ease: CONFIG.easeRise,
          duration: CONFIG.riseEnd
        }, 0);
      });

      // 2. Cascade Drop Phase (riseEnd -> dropEnd)
      cards.forEach((card, i) => {
        const pose = poses[i];
        // Distribute drop start points sequentially
        const span = CONFIG.dropEnd - CONFIG.riseEnd - CONFIG.dropDur;
        const startTime = CONFIG.riseEnd + (n > 1 ? (i / (n - 1)) * span : 0);
        tl.to(card, {
          x: pose.bottom.x,
          y: pose.bottom.y,
          z: pose.bottom.z,
          rotationZ: pose.bottom.rotation,
          ease: CONFIG.easeFall,
          duration: CONFIG.dropDur
        }, startTime);
      });

      // 3. Disperse & Flip Phase (dropEnd -> disperseEnd)
      cards.forEach((card, i) => {
        const pose = poses[i];
        const flipBtn = card.querySelector(".card__flip");
        
        tl.to(card, {
          x: pose.diag.x,
          y: pose.diag.y,
          z: pose.diag.z,
          rotationX: pose.diag.rotationX,
          rotationZ: pose.diag.rotation,
          ease: CONFIG.easeDisperse,
          duration: CONFIG.disperseEnd - CONFIG.dropEnd
        }, CONFIG.dropEnd);

        tl.to(flipBtn, {
          rotationY: 180,
          ease: CONFIG.easeFlip,
          duration: CONFIG.disperseEnd - CONFIG.dropEnd
        }, CONFIG.dropEnd);
      });

      // 4. Plateau (holds layout dispersed) - timeline simply maintains coordinates up to plateauEnd
      tl.to({}, { duration: CONFIG.plateauEnd - CONFIG.disperseEnd });

      // 5. Restack Phase (plateauEnd -> 1.0)
      cards.forEach((card, i) => {
        const pose = poses[i];
        const flipBtn = card.querySelector(".card__flip");
        
        tl.to(card, {
          x: pose.deck.x,
          y: pose.deck.y,
          z: pose.deck.z,
          rotationX: 0,
          rotationZ: pose.deck.rotation,
          ease: CONFIG.easeRestack,
          duration: 1.0 - CONFIG.plateauEnd
        }, CONFIG.plateauEnd);

        tl.to(flipBtn, {
          rotationY: 0,
          ease: CONFIG.easeFlip,
          duration: 1.0 - CONFIG.plateauEnd
        }, CONFIG.plateauEnd);
      });

    }, sectionElement);

    return () => {
      ctx.revert();
    };
  }, [projects, filter, resizeKey]);

  // Card Hover Magnification Handler
  const handleMouseEnterCard = (index: number) => {
    if (scrollProgress.current < CONFIG.disperseEnd || scrollProgress.current > CONFIG.plateauEnd) return;
    
    setHoveredIndex(index);
    const deck = deckRef.current;
    if (deck) {
      const cards = Array.from(deck.querySelectorAll(".card-item")) as HTMLElement[];
      cards.forEach((card, i) => {
        if (i === index) {
          const inner = card.querySelector(".card__inner");
          gsap.to(inner, {
            z: CONFIG.hoverZ,
            scale: CONFIG.hoverScale,
            duration: CONFIG.hoverDur,
            overwrite: "auto"
          });
        } else {
          gsap.to(card, { opacity: CONFIG.hoverDimOthers, duration: CONFIG.hoverDur });
        }
      });
    }
  };

  const handleMouseLeaveCard = () => {
    setHoveredIndex(null);
    const deck = deckRef.current;
    if (deck) {
      const cards = Array.from(deck.querySelectorAll(".card-item")) as HTMLElement[];
      cards.forEach((card) => {
        gsap.to(card, { opacity: 1, duration: CONFIG.hoverDur });
        const inner = card.querySelector(".card__inner");
        gsap.to(inner, {
          z: 0,
          scale: 1,
          duration: CONFIG.hoverDur,
          overwrite: "auto"
        });
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 transition-colors flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        
        {/* Section Heading & Utilities */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 z-10">
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
                Added ({projects.filter(p => p.isCustom).length})
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
          <div className="text-center py-16 bg-slate-50/50 dark:bg-slate-800/10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 max-w-lg mx-auto w-full z-10">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No Projects Found</h3>
          </div>
        )}

        {/* Desktop 3D Interactive Deck */}
        <div className="projects__deck-wrapper hidden lg:block relative flex-1 min-h-[500px]">
          <div className="projects__deck" ref={deckRef} id="projects-deck">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="card-item"
                data-index={idx}
                onMouseEnter={() => handleMouseEnterCard(idx)}
                onMouseLeave={handleMouseLeaveCard}
              >
                <div className="card__outer">
                  <div className="card__inner">
                    <button
                      className="card__flip"
                      type="button"
                      onClick={() => setActiveProject(project)}
                      aria-haspopup="dialog"
                      aria-label={`Open ${project.name}`}
                    >
                      {/* Back Cover (Flipped away initially, showing stack cover) */}
                      <div className="card__face card__face--back">
                        <div className="card__back-pattern"></div>
                        <div className="card__back-logo">YT</div>
                      </div>

                      {/* Front Cover (Revealed when dispersed) */}
                      <div className="card__face card__face--front">
                        <div className="card__media">
                          <div className={`card__media-gradient ${getGradientClass(project.id)}`}>
                            <FolderGit2 className="w-12 h-12 text-white/50" />
                          </div>
                        </div>
                        <div className="card__body">
                          <div>
                            <span className={`card__tag ${project.demoUrl ? 'card__tag--live' : 'card__tag--source'}`}>
                              {project.demoUrl ? 'Live' : 'Source'}
                            </span>
                            <h3 className="card__title">{project.name}</h3>
                          </div>
                          <p className="card__blurb">{project.description}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Fallback Grid */}
        <div className="projects__grid-desktop-hidden lg:hidden flex-1 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group flex flex-col justify-between bg-slate-100/50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/65 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:-translate-y-1.5 transition-all duration-300 relative cursor-pointer"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono uppercase bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {project.demoUrl ? 'Live' : 'Source'}
                    </span>
                    {project.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                        aria-label="Delete Project"
                        className="text-slate-400 hover:text-rose-500 p-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-500 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-sans">
                    {project.description}
                  </p>
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
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Project Details Modal Popup */}
      {activeProject && (
        <div className="project-modal" role="dialog" aria-modal="true">
          <div className="project-modal__backdrop" onClick={() => setActiveProject(null)}></div>
          <div className="project-modal__panel">
            <button className="project-modal__close" onClick={() => setActiveProject(null)}>&times;</button>
            <div className="project-modal__media">
              <div className={`project-modal__media-gradient h-full w-full ${getGradientClass(activeProject.id)}`}>
                <FolderGit2 className="w-16 h-16 text-white/40" />
              </div>
            </div>
            <div className="project-modal__body">
              <span className={`project-modal__tag ${activeProject.demoUrl ? 'card__tag--live' : 'card__tag--source'}`}>
                {activeProject.demoUrl ? "Live Demo" : "Source Code"}
              </span>
              <h3 className="project-modal__title">{activeProject.name}</h3>
              <p className="project-modal__tagline">
                {activeProject.technologies.join(" • ")}
              </p>
              <p className="project-modal__summary">{activeProject.description}</p>
              
              <div className="project-modal__links">
                {activeProject.githubUrl && (
                  <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="project-modal__link project-modal__link--source">
                    <Github className="w-4 h-4" />
                    <span>View Source</span>
                  </a>
                )}
                {activeProject.demoUrl && (
                  <a href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer" className="project-modal__link project-modal__link--live">
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal Popover */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden relative animate-scale-up">
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
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-855 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProjectSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Serverless Task Scheduler"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                />
                {errors.projectName && (
                  <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" />
                    {errors.projectName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short 2-sentence description of the goals, problems solved, and accomplishments..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                />
                {errors.description && (
                  <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1">
                  Technologies (separate with commas) *
                </label>
                <input
                  type="text"
                  required
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="e.g. React, Python, Cloud SQL, REST API"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                />
                {errors.technologies && (
                  <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" />
                    {errors.technologies}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                  />
                  {errors.githubUrl && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.githubUrl}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-1">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="text"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-950/40 transition-colors text-sm"
                  />
                  {errors.demoUrl && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      {errors.demoUrl}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setErrors({});
                  }}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-sm font-semibold hover:bg-slate-55 dark:hover:bg-slate-800 cursor-pointer"
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
    </section>
  );
}
