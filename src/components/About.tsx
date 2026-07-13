import React, { useState, useEffect, useRef } from "react";

interface Watermelon {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
}

export default function About() {
  const [watermelons, setWatermelons] = useState<Watermelon[]>([]);
  const nextId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Watermelon gravity animation loop
  useEffect(() => {
    if (watermelons.length === 0) return;

    let animFrame: number;
    const gravity = 0.45;
    const bounceDecay = 0.55;

    const updatePhysics = () => {
      setWatermelons(prev =>
        prev
          .map(w => {
            let nextX = w.x + w.vx;
            let nextY = w.y + w.vy;
            let nextVy = w.vy + gravity;
            let nextVx = w.vx;
            let nextRot = w.rotation + w.rotSpeed;

            // Bounce off bottom of viewport
            if (nextY > window.innerHeight - 50) {
              nextY = window.innerHeight - 50;
              nextVy = -Math.abs(nextVy) * bounceDecay;
              // Add a bit of friction/drift
              nextVx *= 0.95;
            }

            // Bounce off side walls
            if (nextX < 10) {
              nextX = 10;
              nextVx = Math.abs(nextVx) * bounceDecay;
            } else if (nextX > window.innerWidth - 50) {
              nextX = window.innerWidth - 50;
              nextVx = -Math.abs(nextVx) * bounceDecay;
            }

            return {
              ...w,
              x: nextX,
              y: nextY,
              vy: nextVy,
              vx: nextVx,
              rotation: nextRot
            };
          })
          // Filter out particles that stop bouncing and exit left/right or get stuck
          .filter(w => w.y < window.innerHeight && Math.abs(w.vy) > 0.05 || w.y < window.innerHeight - 60)
      );

      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, [watermelons]);

  const spawnWatermelon = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = nextId.current++;
    // Spawn at mouse click location
    const x = e.clientX;
    const y = e.clientY;

    // Random velocity
    const vx = (Math.random() - 0.5) * 12;
    const vy = -Math.random() * 15 - 5;
    const rotSpeed = (Math.random() - 0.5) * 10;

    const newWatermelon: Watermelon = {
      id,
      x,
      y,
      vx,
      vy,
      rotation: 0,
      rotSpeed
    };

    setWatermelons(prev => [...prev, newWatermelon]);
  };

  const facets = [
    {
      num: "01",
      title: "What I do",
      body: "Over the years I've explored multiple dimensions of software engineering—from building Natural Language Processing models and classification pipelines in Python, to deploying serverless carbon-efficiency logic on AWS, and coding clean React templates."
    },
    {
      num: "02",
      title: "How I think",
      body: "I break complex tasks down to their absolute first principles before writing code. I focus heavily on creating modular foundations, write self-documenting clean configurations, and prioritize performance and sustainability over early speed."
    },
    {
      num: "03",
      title: "What I'm after",
      body: "I am constantly seeking to learn new paradigms, build production-grade architectures, and collaborate with ambitious teams who are excited about building products for the intelligence-driven era."
    }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 bg-transparent px-6 sm:px-12 lg:px-20 border-t border-[#e0e0d8] dark:border-[#2a2a28] transition-colors relative"
    >
      {/* Watermelon overlay particles container */}
      {watermelons.map(w => (
        <span
          key={w.id}
          className="fixed text-4xl pointer-events-none select-none z-50 transition-transform duration-75"
          style={{
            left: w.x,
            top: w.y,
            transform: `rotate(${w.rotation}deg)`,
            lineHeight: 1
          }}
        >
          🍉
        </span>
      ))}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Heading & Bio */}
        <div className="space-y-6 text-left max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#888880] leading-none">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-display font-light text-[#0e0e0e] dark:text-[#f5f5f0] leading-[1.1] tracking-tight">
            A software developer,<br />
            driven by curiosity.
          </h2>
          <p 
            className="doodle-text text-2xl text-[#888880] tracking-wide inline-block"
            style={{ fontFamily: 'Caveat, cursive', transform: 'rotate(-2.5deg)', transformOrigin: 'left center' }}
          >
            & the fun of the journey
          </p>
          <p className="text-sm sm:text-base font-light text-[#888880] leading-relaxed pt-4">
            I am a software engineer specializing in bridging artificial intelligence systems with robust cloud deployments and responsive web applications. With a focus on performance and architectural simplicity, I design systems that solve complex problems using modular, clean setups.
          </p>
        </div>

        {/* Right Column: Numeric Facets */}
        <ol className="space-y-12" role="list">
          {facets.map((facet, idx) => (
            <li key={idx} className="flex gap-6 items-start text-left">
              <span className="text-xs font-bold font-mono text-[#888880] pt-1">
                {facet.num}
              </span>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#0e0e0e] dark:text-[#f5f5f0]">
                  {facet.title}
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#888880] leading-relaxed">
                  {facet.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Interactive Off-The-Clock Watermelon Clicker at the bottom */}
      <div className="max-w-7xl mx-auto w-full pt-20 border-t border-[#e0e0d8]/50 dark:border-[#2a2a28]/50 mt-20 text-left">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#888880] leading-none mb-2">
          off the clock
        </p>
        <h3 className="text-lg sm:text-xl font-light text-[#0e0e0e] dark:text-[#f5f5f0] flex flex-wrap items-center gap-1.5">
          When I'm not building systems, I'm usually thinking about{" "}
          <button
            onClick={spawnWatermelon}
            className="font-bold underline text-[#e5484d] hover:text-[#c9373c] inline-flex items-center space-x-1 cursor-pointer select-none bg-transparent border-0 p-0"
          >
            <span>watermelons</span>
            <span role="img" aria-label="watermelon" className="hover:scale-125 transition-transform">🍉</span>
          </button>
          <span 
            className="text-xs text-[#888880] block sm:inline-block ml-1 font-mono tracking-wider"
            style={{ fontFamily: 'Caveat, cursive', fontSize: '15px' }}
          >
            &larr; go on, click it
          </span>
        </h3>
        <p className="text-xs sm:text-sm font-light text-[#888880] leading-relaxed mt-4 max-w-2xl">
          They are sweet, hydrating, and objectively one of nature's greatest creations. Beyond technology, I love diving into hardware gear research, exploring the outdoors, and spending long hours studying first-principles engineering models.
        </p>
      </div>
    </section>
  );
}
