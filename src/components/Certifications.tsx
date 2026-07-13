import { Award, ShieldCheck, CheckCircle2, Cloud, Sparkles, ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "../data";
import { Certification } from "../types";

export default function Certifications() {
  
  // Custom theme badge icons based on issuer and status
  const getBadgeGraphics = (type: "azure" | "critical-thinking" | "cybersecurity" | "generic") => {
    switch (type) {
      case "azure":
        return {
          wrapperClass: "bg-sky-50 dark:bg-sky-950/40 border-sky-200/50 dark:border-sky-800/40",
          icon: <Cloud className="w-6 h-6 text-sky-500" />
        };
      case "critical-thinking":
        return {
          wrapperClass: "bg-purple-50 dark:bg-purple-950/40 border-purple-200/50 dark:border-purple-800/40",
          icon: <Sparkles className="w-6 h-6 text-purple-500" />
        };
      case "cybersecurity":
        return {
          wrapperClass: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/50 dark:border-emerald-800/40",
          icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />
        };
      default:
        return {
          wrapperClass: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/50 dark:border-indigo-800/40",
          icon: <Award className="w-6 h-6 text-indigo-505" />
        };
    }
  };

  return (
    <section
      id="certifications"
      className="py-20 bg-transparent border-t border-[#e0e0d8] dark:border-[#2a2a28] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#efefea] dark:bg-[#161616] text-[#888880] border border-[#e0e0d8] dark:border-[#2a2a28]">
            <Award className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold font-mono tracking-wider uppercase">Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0e0e0e] dark:text-[#f5f5f0]">
            Certifications & Training
          </h2>
          <div className="h-1 w-16 bg-indigo-500 mx-auto rounded" />
        </div>

        {/* Certifications Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {CERTIFICATIONS.map((cert: Certification, index: number) => {
            const theme = getBadgeGraphics(cert.iconType);
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between bg-[#efefea] dark:bg-[#161616] border border-[#e0e0d8] dark:border-[#2a2a28] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-5">
                  {/* Badge Row & Credential Verification Link */}
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl border ${theme.wrapperClass} flex-shrink-0 animate-pulse-slow`}>
                      {theme.icon}
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <span>Verify Spec</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Cert details */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-505 transition-colors">
                      {cert.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                      <span>{cert.issuer}</span>
                      <span>•</span>
                      <span>Issued {cert.date}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-100 dark:bg-slate-800/80" />

                  {/* Skills learned listing */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                      Validated Curriculums
                    </h4>
                    <ul className="space-y-1.5">
                      {cert.skillsLearned.map((skill, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Corner decorative item */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-tr-3xl pointer-events-none" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
