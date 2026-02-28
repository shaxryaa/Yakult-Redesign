"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  "Consume one bottle daily",
  "L. casei Shirota travels through stomach acids",
  "Alive bacteria reaches the intestines",
  "Increases good bacteria, balances flora"
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !visualsRef.current) return;

    // Pinning the left side (visuals) while the right side scrolls
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 20%",
      end: "bottom 80%",
      pin: visualsRef.current,
      scrub: 1
    });

    // Animate each step as they come into view
    stepsRef.current.forEach((step) => {
      if (!step) return;
      gsap.fromTo(
        step,
        { opacity: 0.3, x: 20 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            scrub: true,
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Applying Gestalt Principles (Continuity): Steps visually connect as user scrolls.
  return (
    <section id="science" ref={sectionRef} className="section-padding">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
          <h2 style={{ fontSize: "2.5rem" }}>The <span className="text-primary">Science</span> Inside</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}>
            How our unique strain thrives where others fail.
          </p>
        </div>

        <div className="grid grid-cols-2" style={{ gap: "var(--space-12)", position: "relative" }}>
          
          {/* Visual Side (Sticky) */}
          <div ref={visualsRef} style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              borderRadius: "32px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative"
            }}>
              {/* Abstract scientific visual */}
              <div className="animated-flora" style={{
                position: "absolute",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)",
                opacity: 0.2,
                filter: "blur(20px)",
                animation: "pulse 4s infinite alternate"
              }} />
              <div style={{
                position: "relative",
                zIndex: 10,
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "4rem", 
                  fontWeight: "bold", 
                  color: "var(--primary)",
                  background: "linear-gradient(to right, var(--primary), var(--secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  6.5 Billion
                </div>
                <div style={{ color: "var(--text-muted)", fontWeight: "bold" }}>
                  L. casei strain Shirota
                </div>
              </div>
            </div>
          </div>

          {/* Steps Side (Scrolls) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)", padding: "var(--space-12) 0", paddingTop: "50%" }}>
            {steps.map((text, index) => (
              <div 
                key={index}
                ref={el => { stepsRef.current[index] = el; }}
                style={{ 
                  display: "flex", 
                  gap: "var(--space-4)", 
                  alignItems: "flex-start",
                  padding: "var(--space-6)",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  transform: "translateX(20px)", /* Initial GSAP state */
                  opacity: 0.3
                }}
              >
                <div style={{ color: "var(--secondary)", flexShrink: 0, marginTop: "2px" }}>
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1.25rem", marginBottom: "var(--space-2)" }}>Step {index + 1}</h4>
                  <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "1.125rem" }}>{text}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
