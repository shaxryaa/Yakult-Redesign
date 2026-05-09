"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Minimal icons
const icons = {
  sip: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M8 6h8M6 10h12M4 14h16M10 18h4" opacity="0.3"/>
      <path d="M12 10a6 6 0 0 0-6 6v4h12v-4a6 6 0 0 0-6-6z" />
      <path d="M12 2v8" />
    </svg>
  ),
  journey: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" opacity="0.3"/>
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  balance: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" opacity="0.3"/>
      <path d="M12 8v4l3 3" />
    </svg>
  ),
};

const steps = [
  {
    title: "The Daily Ritual",
    description: "A single, purposeful sip introduces billions of beneficial bacteria to your system, beginning the restorative process.",
    icon: icons.sip,
  },
  {
    title: "The Inner Journey",
    description: "Our resilient Lactobacillus casei Shirota strain is scientifically cultivated to survive the journey, arriving alive and active where it matters most.",
    icon: icons.journey,
  },
  {
    title: "Harmony Restored",
    description: "A delicate balance is achieved. The gut flora flourishes, fostering improved digestion, sustained energy, and fortified natural defenses.",
    icon: icons.balance,
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Draw path
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
          end: "bottom 80%",
          scrub: true,
        }
      });
    }

    // Reveal steps
    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      gsap.fromTo(step, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        }
      );
      
      // Floating animation for cards
      gsap.to(step, {
        y: "+=8",
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Subtitle fade
    gsap.fromTo(".journey-heading",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" }}
    );

    // Floating particles
    gsap.to(".journey-particle", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      duration: "random(4, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

  }, { scope: containerRef });

  return (
    <section 
      id="science" 
      ref={containerRef}
      style={{ 
        backgroundColor: "#FDFBF7", // Warm ivory background 
        padding: "10rem 0", 
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Subtle paper-like texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.35, mixBlendMode: "multiply", pointerEvents: "none", zIndex: 0
      }}>
        <svg width="100%" height="100%">
          <filter id="paper-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 0.98 0 0 0, 0 0.96 0 0 0, 0 0 0 0.08 0" in="noise" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-noise)" />
        </svg>
      </div>
      
      {/* Floating particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="journey-particle" style={{
            position: "absolute",
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            borderRadius: "50%",
            backgroundColor: "rgba(142, 43, 45, 0.15)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }} />
        ))}
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1000px" }}>
        
        <div className="journey-heading" style={{ textAlign: "center", marginBottom: "8rem" }}>
          <h2 style={{ fontSize: "clamp(5.5rem, 5vw, 4rem)", letterSpacing: "-0.02em", color: "#1C1917", lineHeight: 1.1 }}>
            <span style={{ display: "block", fontWeight: 600 }}>The journey to</span>
            <span className="font-playfair" style={{ display: "block", fontStyle: "italic", fontWeight: 400, color: "#8E2B2D", marginTop: "0.2em" }}>better health.</span>
          </h2>
        </div>

        <div style={{ position: "relative", margin: "0 auto" }}>
          
          {/* Animated SVG Path replacing the vertical line */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "200px", zIndex: 0 }}>
             <svg width="200" height="100%" preserveAspectRatio="none" viewBox="0 0 200 1000" style={{ overflow: "visible" }}>
                {/* Background faint line */}
                <path d="M100,0 C100,200 180,300 100,500 C20,700 100,800 100,1000" fill="none" stroke="rgba(142, 43, 45, 0.08)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                {/* Active drawing line */}
                <path ref={pathRef} d="M100,0 C100,200 180,300 100,500 C20,700 100,800 100,1000" fill="none" stroke="#8E2B2D" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
             </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12rem", position: "relative", zIndex: 2, paddingBottom: "4rem" }}>
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: isEven ? "row" : "row-reverse",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5rem"
                  }}
                >
                  {/* Content Panel */}
                  <div 
                    ref={el => { stepsRef.current[index] = el; }}
                    style={{ 
                      flex: 1, 
                      display: "flex",
                      justifyContent: isEven ? "flex-end" : "flex-start",
                      maxWidth: "420px"
                    }}
                  >
                    <div style={{
                      backgroundColor: "#FFFFFF",
                      padding: "3rem",
                      borderRadius: "16px",
                      border: "1px solid rgba(28, 25, 23, 0.04)",
                      boxShadow: "0 10px 40px -10px rgba(28, 25, 23, 0.04), 0 1px 3px rgba(28, 25, 23, 0.02)",
                      transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      cursor: "default"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 20px 50px -15px rgba(28, 25, 23, 0.06), 0 4px 10px rgba(28, 25, 23, 0.03)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 40px -10px rgba(28, 25, 23, 0.04), 0 1px 3px rgba(28, 25, 23, 0.02)";
                    }}
                    >
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: "#FDFBF7",
                        border: "1px solid rgba(142, 43, 45, 0.08)",
                        color: "#8E2B2D",
                        marginBottom: "1.8rem"
                      }}>
                        {step.icon}
                      </div>
                      <h3 style={{ 
                        fontSize: "1.5rem", 
                        fontWeight: 500, 
                        color: "#1C1917", 
                        marginBottom: "1.2rem",
                        letterSpacing: "-0.01em"
                      }}>{step.title}</h3>
                      <p style={{ 
                        color: "#57534E", 
                        fontSize: "1.05rem",
                        lineHeight: 1.7,
                        margin: 0,
                        fontWeight: 400
                      }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle Checkpoint Node */}
                  <div style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#FDFBF7",
                    border: "1.5px solid #8E2B2D",
                    position: "relative",
                    zIndex: 10,
                    boxShadow: "0 0 0 6px #FDFBF7"
                  }} />
                  
                  {/* Empty Side for balance */}
                  <div style={{ flex: 1, maxWidth: "420px" }}></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 900px) {
          #science .container > div:last-child > div:last-child > div {
            flex-direction: column !important;
            text-align: center !important;
            gap: 2rem !important;
          }
          #science .container > div:last-child > div:last-child > div > div:first-child {
            justify-content: center !important;
            max-width: 100% !important;
          }
          #science .container > div:last-child > div:last-child > div > div:nth-child(2) {
            margin-bottom: 2rem !important;
          }
          #science .container > div:last-child > div:last-child > div > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
