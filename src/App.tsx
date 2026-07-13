import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

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
    <>
      {/* Cinematic typing CLI Intro overlay */}
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      {/* Trailing magnetic cursor dot */}
      <CustomCursor />

      <div className="min-h-screen bg-[#f5f5f0] dark:bg-[#0e0e0e] text-[#0e0e0e] dark:text-[#f5f5f0] transition-colors duration-300 overflow-x-hidden">
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
        </main>

        {/* FOOTER copyright and message transmission */}
        <Footer />
      </div>
    </>
  );
}
