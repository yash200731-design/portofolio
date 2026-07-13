import React, { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is touch-capable or viewport is narrow
    const checkDevice = () => {
      const touchCapable = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(touchCapable || window.innerWidth <= 900);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    // Show cursor on first movement
    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      if (hidden) {
        setHidden(false);
        // Add class to body to hide default cursor
        document.body.classList.add("custom-cursor-active");
      }
    };

    const onMouseLeave = () => {
      setHidden(true);
      document.body.classList.remove("custom-cursor-active");
    };

    // Check for interactive hovers
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button";
        
      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", onMouseOver);

    // Physics loop for trailing ring
    let animationFrameId: number;
    const updatePosition = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring && !hidden) {
        // Move dot instantly
        dot.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0) translate(-50%, -50%)`;

        // Smoothly interpolate ring coordinates with 0.15 lag
        ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * 0.15;
        ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * 0.15;

        ring.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [hidden, isMobile]);

  if (isMobile || hidden) return null;

  return (
    <div className={`pointer-events-none hidden md:block ${hovered ? "cursor-hovering" : ""}`}>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
