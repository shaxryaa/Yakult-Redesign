"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    title: "Sip Daily",
    description: "Start your morning with one bottle. It’s delicious, refreshing, and the perfect size to kick-start your digestive system.",
  },
  {
    title: "Billions Journey",
    description: "Our exclusive Lactobacillus casei Shirota strain survives the digestive journey, reaching your intestines alive.",
  },
  {
    title: "Balance Restored",
    description: "Good bacteria flourish, restoring harmony to your microbiome, strengthening your gut wall, and boosting natural immunity.",
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  stepsRef.current = [];

  const addToSteps = (el: HTMLDivElement) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  useGSAP(() => {
    // Fill the line on scroll
    gsap.to(lineRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 80%",
        scrub: true,
      }
    });

    // Reveal steps
    stepsRef.current.forEach((step, i) => {
      gsap.from(step, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: step,
          start: "top 70%",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section 
      id="science" 
      ref={containerRef}
      style={{ 
        backgroundColor: "var(--bg-light)", 
        padding: "var(--space-32) 0", 
        position: "relative" 
      }}
    >
      <div className="container" style={{ position: "relative" }}>
        
        <div style={{ textAlign: "center", marginBottom: "var(--space-24)" }}>
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", maxWidth: "800px", margin: "0 auto" }}>
            The journey to <br />
            <span className="font-instrument text-primary" style={{ fontWeight: "normal" }}>better health.</span>
          </h2>
        </div>

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          {/* Vertical line background */}
          <div style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            bottom: 0,
            width: "2px",
            backgroundColor: "rgba(154, 0, 2, 0.1)",
            zIndex: 0
          }} />
          
          {/* Animated fill line */}
          <div ref={lineRef} style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 0,
            height: "0%",
            width: "4px",
            backgroundColor: "var(--primary)",
            zIndex: 1,
            borderRadius: "4px"
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-16)", position: "relative", zIndex: 2 }}>
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={addToSteps}
                style={{
                  display: "flex",
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                  alignItems: "center",
                  gap: "var(--space-8)"
                }}
              >
                {/* Content Side */}
                <div style={{ flex: 1, textAlign: index % 2 === 0 ? "right" : "left" }}>
                  <h3 style={{ fontSize: "2rem", marginBottom: "var(--space-2)" }}>{step.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "1.125rem" }}>
                    {step.description}
                  </p>
                </div>
                
                {/* Center Node */}
                <div style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                  border: "4px solid var(--surface)",
                  boxShadow: "0 0 0 4px rgba(154, 0, 2, 0.2)"
                }} />
                
                {/* Empty Side for balance */}
                <div style={{ flex: 1 }}></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
