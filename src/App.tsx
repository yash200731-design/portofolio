import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // Synchronize dark theme state with DOM element of HTML class on mount/toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem("yash_portfolio_theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("yash_portfolio_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("yash_portfolio_theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* Navigation bar Header */}
      <Navbar isDark={isDark} onToggleTheme={handleToggleTheme} />

      {/* Main Single Page Responsive Sections container */}
      <main className="relative">
        {/* HERO Landing Showcase */}
        <Hero />

        {/* ABOUT Section column */}
        <About />

        {/* SKILLS filter suite */}
        <Skills />

        {/* PROJECTS interactive database portal with form uploads */}
        <Projects />

        {/* CERTIFICATIONS badge display deck */}
        <Certifications />

        {/* CONTACT copyable metadata & message transmission */}
        <Contact />
      </main>

      {/* FOOTER copyright and exit utilities */}
      <Footer />
    </div>
  );
}
