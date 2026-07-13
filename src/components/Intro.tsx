import React, { useState, useEffect } from "react";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [techLines, setTechLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "greeting" | "reveal" | "done">("typing");
  const [helloIndex, setHelloIndex] = useState(0);
  const [spotlightScale, setSpotlightScale] = useState(0);

  const lines = [
    "npm init yash-trivedi-portfolio",
    "Initializing AI & NLP models... Done.",
    "Connecting serverless carbon analytics... Connected.",
    "./run --dream"
  ];

  const hellos = ["Hello", "Hola", "Bonjour", "नमस्ते", "Welcome"];

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;

    if (lineIndex < lines.length) {
      const targetText = lines[lineIndex];
      if (charIndex < targetText.length) {
        const timeout = setTimeout(() => {
          setCurrentLine(prev => prev + targetText[charIndex]);
          setCharIndex(prev => prev + 1);
        }, 35);
        return () => clearTimeout(timeout);
      } else {
        // Line finished typing
        const timeout = setTimeout(() => {
          setTechLines(prev => [...prev, targetText]);
          setCurrentLine("");
          setCharIndex(0);
          setLineIndex(prev => prev + 1);
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else {
      // Finished all tech lines
      const timeout = setTimeout(() => {
        setPhase("greeting");
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, phase]);

  // Greeting cycling effect
  useEffect(() => {
    if (phase !== "greeting") return;

    if (helloIndex < hellos.length) {
      const timeout = setTimeout(() => {
        setHelloIndex(prev => prev + 1);
      }, 280);
      return () => clearTimeout(timeout);
    } else {
      setPhase("reveal");
    }
  }, [helloIndex, phase]);

  // Reveal clip-path spotlight expansion
  useEffect(() => {
    if (phase !== "reveal") return;

    let startTime = Date.now();
    const duration = 1200; // 1.2s

    const anim = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setSpotlightScale(easeProgress * 150); // scales clip-path circle up

      if (progress < 1) {
        requestAnimationFrame(anim);
      } else {
        setPhase("done");
        onComplete();
      }
    };
    requestAnimationFrame(anim);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0e0e0e] flex flex-col justify-between p-8 font-mono select-none"
      style={{
        clipPath: phase === "reveal" ? `circle(${spotlightScale}% at 50% 50%)` : "none",
      }}
    >
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 px-4 py-2 border border-white/20 text-white/40 hover:text-white hover:border-white/50 rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wider font-sans z-10"
      >
        Skip intro
      </button>

      {/* Center CLI Prompt Area */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full text-left space-y-2">
        {phase === "typing" && (
          <>
            {techLines.map((line, idx) => (
              <div key={idx} className="text-white/60">
                <span className="text-indigo-500">root:~$ </span>
                {line}
              </div>
            ))}
            <div className="text-white">
              <span className="text-indigo-500">root:~$ </span>
              {currentLine}
              <span className="animate-pulse">▌</span>
            </div>
          </>
        )}

        {phase === "greeting" && (
          <div className="text-center w-full">
            <h1 
              className="text-white font-normal doodle-text text-5xl sm:text-7xl transition-all duration-300 transform scale-105"
              style={{ fontFamily: 'Caveat, cursive', color: '#f5f5f0' }}
            >
              {hellos[Math.min(helloIndex, hellos.length - 1)]}
            </h1>
          </div>
        )}
        
        {phase === "reveal" && (
          <div className="text-center w-full">
            <h1 
              className="font-normal text-5xl sm:text-7xl"
              style={{ fontFamily: 'Caveat, cursive', color: '#0e0e0e' }}
            >
              {hellos[hellos.length - 1]}
            </h1>
          </div>
        )}
      </div>

      <div className="text-[10px] text-white/20 font-sans tracking-wide self-start">
        YASH TRIVEDI // BOOT_LOADER_v2.0.6
      </div>
    </div>
  );
}
