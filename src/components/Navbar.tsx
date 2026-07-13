import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/70 dark:bg-[#0e0e0e]/70 border-b border-[#e0e0d8] dark:border-[#2a2a28] shadow-sm backdrop-blur-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Logo / Initials */}
          <div
            onClick={() => scrollToSection("home")}
            className="font-display font-bold text-lg cursor-pointer flex items-center space-x-1 select-none"
          >
            <span className="text-[#0e0e0e] dark:text-[#f5f5f0] tracking-tight hover:opacity-80 transition-opacity">
              Yash Trivedi
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? "text-[#6366f1]"
                      : "text-[#888880] hover:text-[#0e0e0e] dark:hover:text-[#f5f5f0]"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6366f1] animate-scale-up" />
                  )}
                </button>
              ))}
            </div>

            {/* Dark Mode Button */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-full border border-[#e0e0d8] dark:border-[#2a2a28] hover:bg-[#efefea] dark:hover:bg-[#161616] text-[#0e0e0e] dark:text-[#f5f5f0] transition-all duration-200 cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Mobile menu toggle & Theme Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg border border-[#e0e0d8] dark:border-[#2a2a28] text-[#0e0e0e] dark:text-[#f5f5f0] cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-[#e0e0d8] dark:border-[#2a2a28] text-[#0e0e0e] dark:text-[#f5f5f0] cursor-pointer"
            >
              {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-white dark:bg-[#0e0e0e] border-b border-[#e0e0d8] dark:border-[#2a2a28] shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest transition-all ${
                activeSection === item.id
                  ? "text-[#6366f1]"
                  : "text-[#888880] hover:text-[#0e0e0e] dark:hover:text-[#f5f5f0]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
