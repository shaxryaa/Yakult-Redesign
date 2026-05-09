"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "A daily ritual that completely transformed my digestion. I simply can't start my morning without it.",
    name: "Sarah Jenkins",
    role: "Wellness Coach"
  },
  {
    quote: "The science is real. Within two weeks, I noticed a significant boost in my energy and immunity.",
    name: "Dr. Marcus Chen",
    role: "Nutritionist"
  },
  {
    quote: "Small bottle, enormous impact. It's the most delicious and effective probiotic I've ever tasted.",
    name: "Elena Rodriguez",
    role: "Fitness Enthusiast"
  },
  {
    quote: "My whole family drinks Yakult now. It's the one health habit we all actually enjoy keeping.",
    name: "James Wilson",
    role: "Father of Three"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".testimonial-card");
    const container = containerRef.current;
    if (!container) return;
    
    // We want the total scroll distance to match the width of the cards that overflow
    // Calculate total movement needed: Total width of track - window width
    
    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        // The scroll distance
        end: () => "+=" + (trackRef.current?.offsetWidth || 0)
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      style={{ 
        backgroundColor: "var(--primary)", 
        color: "var(--surface)", 
        paddingTop: "var(--space-32)",
        paddingBottom: "var(--space-32)",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ marginBottom: "var(--space-16)" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--surface)" }}>
          Don&apos;t just take <span className="font-instrument" style={{ fontWeight: "normal" }}>our word for it.</span>
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={trackRef}
        style={{ 
          display: "flex", 
          gap: "var(--space-8)",
          paddingLeft: "calc((100vw - 1440px) / 2 + var(--space-6))", // Align with container padding
          paddingRight: "var(--space-8)",
          width: "max-content"
        }}
      >
        {testimonials.map((test, index) => (
          <div 
            key={index} 
            className="testimonial-card"
            style={{
              width: "clamp(300px, 40vw, 600px)",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              padding: "var(--space-12)",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "var(--space-8)"
            }}
          >
            <div>
              <span className="font-instrument" style={{ fontSize: "6rem", color: "var(--bg-light)", opacity: 0.3, lineHeight: 0.5, display: "block", marginBottom: "var(--space-4)" }}>&quot;</span>
              <p className="font-instrument" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)", lineHeight: 1.2, color: "var(--surface)" }}>
                {test.quote}
              </p>
            </div>
            
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: "800", fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{test.name}</div>
                {/* Microinteraction: Like Button */}
                <button 
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    const isLiked = btn.getAttribute('data-liked') === 'true';
                    btn.setAttribute('data-liked', (!isLiked).toString());
                    
                    // Simple microinteraction animation
                    btn.style.transform = isLiked ? "scale(1)" : "scale(1.3)";
                    btn.style.color = isLiked ? "rgba(255,255,255,0.2)" : "#ff4757";
                    
                    setTimeout(() => {
                      if (!isLiked) btn.style.transform = "scale(1.1)";
                    }, 150);
                  }}
                  data-liked="false"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "rgba(255,255,255,0.2)",
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    outline: "none"
                  }}
                >
                  ♥
                </button>
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)" }}>{test.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

