"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    title: "Balances Microbiome",
    description: "Delivers billions of live Lactobacillus casei Shirota to your intestines, ensuring a healthy balance of good bacteria.",
    icon: "🦠",
    number: "01",
  },
  {
    title: "Boosts Immunity",
    description: "By maintaining gut health, Yakult helps strengthen your body’s natural defenses and immune system.",
    icon: "🛡️",
    number: "02",
  },
  {
    title: "Improves Digestion",
    description: "Regular consumption aids in smoother digestion and helps prevent common gastrointestinal issues.",
    icon: "⚕️",
    number: "03",
  },
  {
    title: "Enhances Wellbeing",
    description: "A healthy gut is linked to better mood, energy levels, and overall physical and mental wellbeing.",
    icon: "✨",
    number: "04",
  }
];

export default function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  cardsRef.current = [];

  const addToCardsRef = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(() => {
    // Heading reveal
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      }
    });

    // Staggered cards reveal
    cardsRef.current.forEach((card) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      id="benefits" 
      ref={containerRef}
      style={{ backgroundColor: "var(--surface)", padding: "var(--space-32) 0", position: "relative" }}
    >
      <div className="container">
        
        <div style={{ textAlign: "center", marginBottom: "var(--space-24)" }}>
          <h2 ref={headingRef} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", maxWidth: "800px", margin: "0 auto" }}>
            The Science of <br/>
            <span className="text-primary font-instrument" style={{ fontWeight: "normal", display: "inline-block" }}>Inner Harmony.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2" style={{ gap: "var(--space-8)" }}>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              ref={addToCardsRef}
              style={{
                backgroundColor: "var(--bg-light)",
                padding: "var(--space-12)",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                cursor: "default"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 30px 40px -20px rgba(154, 0, 2, 0.15)";
                const desc = e.currentTarget.querySelector('.card-description') as HTMLElement;
                if (desc) {
                  desc.style.maxHeight = "150px";
                  desc.style.opacity = "1";
                  desc.style.marginTop = "var(--space-4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                const desc = e.currentTarget.querySelector('.card-description') as HTMLElement;
                if (desc) {
                  desc.style.maxHeight = "0px";
                  desc.style.opacity = "0";
                  desc.style.marginTop = "0";
                }
              }}
            >
              <div 
                className="font-instrument" 
                style={{ 
                  position: "absolute", 
                  top: "-20px", 
                  right: "10px", 
                  fontSize: "10rem", 
                  color: "rgba(154, 0, 2, 0.05)",
                  lineHeight: "1",
                  userSelect: "none",
                  zIndex: 0
                }}
              >
                {benefit.number}
              </div>
              
              <div style={{ fontSize: "3rem", zIndex: 1 }}>{benefit.icon}</div>
              
              <h3 style={{ fontSize: "2rem", marginBottom: 0, zIndex: 1 }}>{benefit.title}</h3>
              
              {/* Card expansion content */}
              <div 
                className="card-description" 
                style={{ 
                  maxHeight: "0px", 
                  overflow: "hidden", 
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", 
                  opacity: 0, 
                  margin: 0,
                  zIndex: 1
                }}
              >
                <p style={{ color: "var(--text-muted)", fontSize: "1.125rem", maxWidth: "90%", margin: 0 }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
