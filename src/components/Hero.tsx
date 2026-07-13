import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  const [speechText, setSpeechText] = useState("come play with us!");
  const [speechVisible, setSpeechVisible] = useState(false);
  
  const frameRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Crew dots coordinates and target
  const redDot = useRef<HTMLSpanElement>(null);
  const greenDot = useRef<HTMLSpanElement>(null);
  const blueDot = useRef<HTMLSpanElement>(null);
  
  const targetCoords = useRef({ x: 150, y: 200 }); // center of 300x400 viewBox
  const redCoords = useRef({ x: 80, y: 120 });
  const greenCoords = useRef({ x: 220, y: 150 });
  const blueCoords = useRef({ x: 150, y: 280 });
  
  const isHovered = useRef(false);
  const tiltAngle = useRef({ x: 0, y: 0 });

  // Cycle speech texts
  useEffect(() => {
    const speeches = [
      "come play with us!",
      "touch me!",
      "hover here!",
      "we don't bite!",
      "hello there!"
    ];
    let idx = 0;
    
    // Show speech bubble after 2 seconds
    const startTimeout = setTimeout(() => {
      setSpeechVisible(true);
    }, 2000);

    const interval = setInterval(() => {
      idx = (idx + 1) % speeches.length;
      setSpeechText(speeches[idx]);
    }, 6000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  // Frame Mouse Move (Crew dots follow pointer + box tilts)
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    
    // Convert to 300x400 viewBox scale
    const targetX = (x / rect.width) * 300;
    const targetY = (y / rect.height) * 400;
    
    targetCoords.current = { x: targetX, y: targetY };
    isHovered.current = true;

    // Calculate tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -(e.clientY - rect.top - centerY) / 10; // invert Y
    const tiltY = (e.clientX - rect.left - centerX) / 10;
    tiltAngle.current = { x: tiltX, y: tiltY };
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    setSpeechVisible(true);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    tiltAngle.current = { x: 0, y: 0 };
    // Move dots back toward center
    targetCoords.current = { x: 150, y: 200 };
  };

  // Crew physics animation loop
  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const updatePhysics = () => {
      time += 0.02;
      const frame = frameRef.current;

      // Rotate/Tilt frame
      if (frame) {
        frame.style.transform = `rotate3d(1, 0, 0, ${tiltAngle.current.x}deg) rotate3d(0, 1, 0, ${tiltAngle.current.y}deg) rotate(-2.5deg)`;
      }

      // If not hovered, let dots drift in elegant circular patterns
      if (!isHovered.current) {
        redCoords.current.x += (150 + Math.sin(time * 0.8) * 60 - redCoords.current.x) * 0.05;
        redCoords.current.y += (200 + Math.cos(time * 1.1) * 80 - redCoords.current.y) * 0.05;

        greenCoords.current.x += (150 + Math.cos(time * 1.2) * 70 - greenCoords.current.x) * 0.04;
        greenCoords.current.y += (200 + Math.sin(time * 0.7) * 90 - greenCoords.current.y) * 0.04;

        blueCoords.current.x += (150 + Math.sin(time * 1.5) * 50 - blueCoords.current.x) * 0.06;
        blueCoords.current.y += (200 + Math.cos(time * 0.9) * 60 - blueCoords.current.y) * 0.06;
      } else {
        // Swarm and follow target coords with varied spring speeds
        redCoords.current.x += (targetCoords.current.x - redCoords.current.x) * 0.09;
        redCoords.current.y += (targetCoords.current.y - redCoords.current.y) * 0.09;

        greenCoords.current.x += (targetCoords.current.x - greenCoords.current.x) * 0.06;
        greenCoords.current.y += (targetCoords.current.y - greenCoords.current.y) * 0.06;

        blueCoords.current.x += (targetCoords.current.x - blueCoords.current.x) * 0.12;
        blueCoords.current.y += (targetCoords.current.y - blueCoords.current.y) * 0.12;
      }

      // Apply coordinates in percentages of the 300x400 box
      if (redDot.current) {
        redDot.current.style.left = `${(redCoords.current.x / 300) * 100}%`;
        redDot.current.style.top = `${(redCoords.current.y / 400) * 100}%`;
      }
      if (greenDot.current) {
        greenDot.current.style.left = `${(greenCoords.current.x / 300) * 100}%`;
        greenDot.current.style.top = `${(greenCoords.current.y / 400) * 100}%`;
      }
      if (blueDot.current) {
        blueDot.current.style.left = `${(blueCoords.current.x / 300) * 100}%`;
        blueDot.current.style.top = `${(blueCoords.current.y / 400) * 100}%`;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <header
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 sm:px-12 lg:px-20 bg-transparent select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Left Column: Premium Typography & Description */}
        <div className="space-y-8 text-left max-w-xl">
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#888880] leading-none">
              AI & Cloud designs by Yash Trivedi
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-display font-light text-[#0e0e0e] dark:text-[#f5f5f0] leading-[1.05] tracking-tight">
              AI systems,<br />
              cloud logic &amp;<br />
              playful web apps
            </h1>
            <p 
              className="doodle-text text-2xl sm:text-3xl text-[#888880] tracking-wide inline-block"
              style={{ fontFamily: 'Caveat, cursive', transform: 'rotate(-2.5deg)', transformOrigin: 'left center' }}
            >
              made with too much care
            </p>
          </div>

          <p className="text-sm sm:text-base italic font-light text-[#0e0e0e] dark:text-[#f5f5f0] leading-relaxed max-w-md">
            I'm a logic driven developer whose curiosity bounces between natural language processing models, cloud analytics pipelines, and elegant desktop-first frontend interfaces.
          </p>

          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs uppercase tracking-widest font-bold rounded-xl flex items-center space-x-2 shadow-lg shadow-indigo-600/20 active:translate-y-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-6 py-3 border border-[#e0e0d8] dark:border-[#2a2a28] hover:bg-[#efefea] dark:hover:bg-[#161616] text-[#0e0e0e] dark:text-[#f5f5f0] text-xs uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer"
            >
              <span>About Me</span>
            </button>
          </div>
        </div>

        {/* Right Column: Self-Drawing SVG Frame with Bouncing Crew Dots */}
        <div className="hidden lg:flex justify-end items-center relative h-[500px]">
          <a
            ref={frameRef}
            onClick={() => scrollToSection("projects")}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative block w-[320px] h-[420px] bg-transparent transform -rotate-[2.5deg] border-2 border-[#0e0e0e] dark:border-[#f5f5f0] rounded-2xl hover:border-4 transition-all duration-150 cursor-pointer overflow-visible"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            {/* Speach bubble */}
            <div
              className={`absolute -top-16 -left-12 px-4 py-2 bg-[#efefea] dark:bg-[#161616] border border-[#e0e0d8] dark:border-[#2a2a28] rounded-2xl text-xs font-bold text-[#0e0e0e] dark:text-[#f5f5f0] transition-all duration-300 pointer-events-none select-none`}
              style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '18px',
                opacity: speechVisible ? 1 : 0,
                transform: speechVisible ? 'translateY(0) rotate(-6deg)' : 'translateY(10px) rotate(-6deg)'
              }}
            >
              {speechText}
              <div className="absolute bottom-[-6px] left-[30px] w-3 h-3 bg-[#efefea] dark:bg-[#161616] border-r border-b border-[#e0e0d8] dark:border-[#2a2a28] transform rotate-[45deg]" />
            </div>

            {/* Bouncing colored crew dots inside the frame container */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <span
                ref={redDot}
                className="absolute w-8 h-8 rounded-full bg-[#e5484d] shadow-lg shadow-rose-600/35 transition-opacity"
                style={{ transform: 'translate(-50%, -50%)', opacity: 0.95 }}
              />
              <span
                ref={greenDot}
                className="absolute w-8 h-8 rounded-full bg-[#2faa5e] shadow-lg shadow-emerald-650/35 transition-opacity"
                style={{ transform: 'translate(-50%, -50%)', opacity: 0.95 }}
              />
              <span
                ref={blueDot}
                className="absolute w-8 h-8 rounded-full bg-[#3e63dd] shadow-lg shadow-indigo-650/35 transition-opacity"
                style={{ transform: 'translate(-50%, -50%)', opacity: 0.95 }}
              />
            </div>
          </a>
        </div>
      </div>

      {/* Background decoration scroll reminder */}
      <span 
        className="absolute left-6 sm:left-12 lg:left-20 bottom-8 text-[11px] font-bold uppercase tracking-widest text-[#888880]"
        style={{ fontFamily: 'Caveat, cursive', fontSize: '16px', transform: 'rotate(-1.5deg)' }}
      >
        scroll ↓
      </span>
    </header>
  );
}
