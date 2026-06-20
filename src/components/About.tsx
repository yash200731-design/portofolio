import { Brain, Cloud, Rocket, GraduationCap, CodeXml, Flame } from "lucide-react";

export default function About() {
  const corePillars = [
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "AI & Machine Learning",
      description: "Developing intelligent algorithms and models with a specific interest in Natural Language Processing (NLP) and predictive classifiers.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-sky-500" />,
      title: "AWS Cloud Infrastructure",
      description: "Architecting sustainable, on-demand serverless workloads, secure API gateways, and robust storage setups on Amazon Web Services.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-emerald-500" />,
      title: "Full-Stack Development",
      description: "Crafting fully-responsive, intuitive interfaces styled meticulously with modern structures that transition gracefully across viewports.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold font-mono tracking-wider uppercase">My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 dark:text-white">
            About Me
          </h2>
          <div className="h-1 w-16 bg-indigo-500 mx-auto rounded" />
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Bio Description Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-200">
              A student building software engineered for the intelligence-driven era.
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base font-sans">
              I am an aspiring software engineer and developer specializing in bridging the gap between advanced artificial intelligence constructs, cloud architectures, and highly usable web interfaces. As a student, I am dedicated to continuous learning, building production-hardened workflows, and contributing to sustainability-focused technical frameworks.
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base font-sans">
              From coding ML pipelines in Python to designing carbon-efficient serverless workflows on AWS (such as the Green Code Choice project) and crafting clean UX with modern tech stacks, I approach technical problems with a philosophy of simplicity, performance, and clean code.
            </p>

            {/* Quick stats grid inside About */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                <div className="text-2xl font-display font-extrabold text-indigo-600 dark:text-indigo-400">
                  3+
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Core Projects
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                <div className="text-2xl font-display font-extrabold text-sky-600 dark:text-sky-400">
                  3+
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Certifications
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                <div className="text-2xl font-display font-extrabold text-emerald-600 dark:text-emerald-400">
                  100%
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  Commitment
                </div>
              </div>
            </div>
          </div>

          {/* Core Pillars List */}
          <div className="lg:col-span-6 space-y-6">
            {corePillars.map((pillar, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/25 border border-slate-100 dark:border-slate-800/70 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200/20 dark:border-slate-700/50 flex-shrink-0">
                  {pillar.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
