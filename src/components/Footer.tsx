import { ArrowUp, Terminal, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-205/50 dark:border-slate-800/60 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200/50 dark:border-slate-800/80 pb-8 mb-8">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-display font-bold text-sm">
                YT
              </div>
              <span className="font-display font-bold text-slate-800 dark:text-slate-100">
                Yash Trivedi
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Bridging the gap between intelligent data diagnostics, secure Amazon Web Services infrastructure models, and responsive web application interfaces.
            </p>
          </div>

          {/* Quick-Jump Anchors */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Copy and Back-To-Top indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
            © {new Date().getFullYear()} Yash Trivedi. All rights reserved. Registered Developer Portfolio.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="self-start sm:self-auto px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
