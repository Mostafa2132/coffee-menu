"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CursorBean() {
  const beanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!beanRef.current) return;

    // Use quickTo for high-performance cursor tracking
    const xTo = gsap.quickTo(beanRef.current, "x", {
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(beanRef.current, "y", {
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      
      // Add a slight rotation based on movement direction for extra polish
      gsap.to(beanRef.current, {
        rotation: e.movementX * 1.5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={beanRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full fill-coffee-400 drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M50,15 C25,15 15,35 15,50 C15,75 35,85 50,85 C75,85 85,65 85,50 C85,25 65,15 50,15 Z" />
        <path d="M40,20 C50,40 45,60 60,80" stroke="#4a2e1b" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
