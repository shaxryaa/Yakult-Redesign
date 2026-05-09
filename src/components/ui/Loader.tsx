"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoading(false)
    });

    // Simple pulsing loading animation
    tl.fromTo(textRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
    )
    .to(textRef.current, { opacity: 0, scale: 1.1, duration: 0.4, delay: 0.5, ease: "power2.in" })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    });
  }, []);

  if (!loading) return null;

  return (
    <div 
      ref={loaderRef} 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: "var(--primary)", 
        zIndex: 9999, 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        color: "white", 
        fontSize: "4rem", 
        fontWeight: 800,
        letterSpacing: "-0.05em"
      }}
    >
      <div ref={textRef}>Yakult</div>
    </div>
  );
}
