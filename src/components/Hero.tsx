import { ArrowRight, Terminal, Cloud, Brain, Github, Linkedin, Mail } from "lucide-react";
import { CONTACT_INFO } from "../data";

export default function Hero() {
  const scrolltoSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-20 left-1/4 w-[350px] h-[350px] bg-indigo-400/25 dark:bg-indigo-600/15 rounded-full filter blur-[80px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-400/20 dark:bg-teal-500/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse duration-[12000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text/Content Area */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/40 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-xs font-semibold font-mono tracking-wider uppercase">
                Active Tech Explorer
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
                Yash Trivedi
              </span>
            </h1>

            <p className="text-xl sm:text-2xl font-display font-semibold text-slate-700 dark:text-slate-300">
              AI, Cloud & Web Developer
            </p>

            <blockquote className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              "Building AI-powered and cloud-based solutions."
            </blockquote>

            {/* Quick stats / Features inline */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-slate-500 dark:text-slate-400 py-2">
              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200/40 dark:border-slate-800">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-mono font-medium">Artificial Intelligence</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200/40 dark:border-slate-800">
                <Cloud className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-mono font-medium">AWS Cloud Deployments</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200/40 dark:border-slate-800">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-medium">Modern JS Stack</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => scrolltoSection("projects")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 dark:shadow-indigo-950/20 active:translate-y-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrolltoSection("contact")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-semibold flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Get in touch</span>
              </button>
            </div>

            {/* Social Handles */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-6">
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">Connect:</span>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-2 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Right Side Visual Illustration (Mock IDE terminal representation) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="w-full max-w-[420px] bg-slate-900 text-slate-300 rounded-2xl shadow-2xl p-6 border border-slate-800/80 font-mono text-xs leading-relaxed relative overflow-hidden backdrop-blur-md">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/85 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/85 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/85 shadow-sm" />
                </div>
                <div className="text-slate-500 text-[11px] font-sans">developer_info.py</div>
                <div className="w-4" />
              </div>

              {/* Terminal Lines */}
              <div className="space-y-2">
                <p className="text-slate-500">{"# Yash Trivedi's developer profile"}</p>
                <p>
                  <span className="text-pink-500">from</span>{" "}
                  <span className="text-sky-400">developer</span>{" "}
                  <span className="text-pink-500">import</span>{" "}
                  <span className="text-slate-100">Student</span>
                </p>
                <br />
                <p>
                  <span className="text-amber-400">class</span>{" "}
                  <span className="text-sky-300">YashTrivedi</span>(Student):
                </p>
                <div className="pl-4 space-y-1.5 border-l border-slate-800 ml-1.5">
                  <p>
                    <span className="text-pink-500">def</span>{" "}
                    <span className="text-sky-300">__init__</span>(self):
                  </p>
                  <div className="pl-4 border-l border-slate-800 ml-1.5 space-y-1">
                    <p>
                      self.name = <span className="text-emerald-400">"Yash Trivedi"</span>
                    </p>
                    <p>
                      self.role = <span className="text-emerald-400">"AI, Cloud & Web Dev"</span>
                    </p>
                    <p>
                      self.passions = [
                    </p>
                    <p className="pl-4 text-emerald-400">
                      "Artificial Intelligence",<br />
                      "AWS Serverless Architectures",<br />
                      "High-Performance Web Apps"
                    </p>
                    <p className="pl-1 text-slate-400">]</p>
                    <p>
                      self.status = <span className="text-indigo-400">"BUILDING_THE_FUTURE"</span>
                    </p>
                  </div>
                  <br />
                  <p>
                    <span className="text-pink-500">def</span>{" "}
                    <span className="text-sky-300">get_capabilities</span>(self):
                  </p>
                  <p className="pl-4">
                    <span className="text-pink-500">return</span>{" "}
                    {"{"}
                  </p>
                  <p className="pl-8 text-emerald-300">
                    "AI_Models": ["NLP", "Classification", "LLMs"],<br />
                    "Cloud_Stack": ["AWS Lambda", "API Gateway", "S3"],<br />
                    "Frontend_Stack": ["TS/JS", "React", "Tailwind CSS"]
                  </p>
                  <p className="pl-4">{"}"}</p>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
                <Brain className="w-36 h-36 text-indigo-400" />
              </div>
            </div>
            
            {/* Ambient Shadow glow background */}
            <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-sky-500 to-indigo-500 opacity-[0.08] dark:opacity-[0.14] rounded-full filter blur-[40px] -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
