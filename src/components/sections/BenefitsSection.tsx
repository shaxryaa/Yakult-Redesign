"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const metrics = [
  { value: "40B+", label: "Live Probiotics" },
  { value: "90+", label: "Years of Research" },
  { value: "38+", label: "Countries Trusted" },
  { value: "Daily", label: "Wellness Support" },
];

const cards = [
  {
    title: "Balances Microbiome",
    desc: "Delivers billions of live Lactobacillus casei Shirota to restore the delicate balance of good bacteria in your intestinal flora.",
    stat: "6.5B CFU / BOTTLE",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 4v3M12 17v3M4 12h3M17 12h3" opacity="0.5"/>
      </svg>
    )
  },
  {
    title: "Boosts Immunity",
    desc: "Strengthens your body's natural defense shield through optimized gut-immune axis signaling.",
    stat: "CLINICALLY PROVEN",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4v6c0 5-8 8-8 8s-8-3-8-8V7l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Improves Digestion",
    desc: "Aids in smoother digestion and prevents common gastrointestinal discomfort with daily use.",
    stat: "GUT PH BALANCED",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v16M8 8s-4 2-4 6 4 6 4 6M16 8s4 2 4 6-4 6-4 6" opacity="0.8"/>
      </svg>
    )
  },
  {
    title: "Enhances Wellbeing",
    desc: "A thriving gut microbiome is linked to better mood, sustained energy and mental clarity.",
    stat: "GUT-BRAIN AXIS",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20v-8M12 12l4-4M12 12l-4-4" />
        <circle cx="12" cy="5" r="2" />
        <circle cx="16" cy="8" r="1.5" opacity="0.5" />
        <circle cx="8" cy="8" r="1.5" opacity="0.5" />
      </svg>
    )
  }
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Elegant fade up for typography
    gsap.fromTo(".benefits-header-elem", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );

    // Staggered reveal for grid lines and content
    gsap.fromTo(".editorial-cell", 
      { opacity: 0 },
      { opacity: 1, duration: 1.2, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".benefits-grid-container", start: "top 80%" } }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="benefits"
      ref={sectionRef}
      style={{ backgroundColor: "#FDFBF7", padding: "10rem 0", position: "relative" }}
    >
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "5rem", gap: "2rem" }}>
          <h2 className="benefits-header-elem" style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 400, color: "#1C1917", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
            The Science of <br/>
            <span className="font-playfair" style={{ fontStyle: "italic", color: "#A61E22" }}>Inner Harmony.</span>
          </h2>
          <div className="benefits-header-elem" style={{ maxWidth: "420px" }}>
            <p style={{ color: "#57534E", fontSize: "1.05rem", lineHeight: 1.7, margin: 0, fontWeight: 400 }}>
              Each bottle of Yakult delivers billions of live <em style={{ fontFamily: "var(--font-playfair)" }}>Lactobacillus casei</em> Shirota — a clinically studied strain working in harmony with your gut ecosystem to elevate your whole body wellness.
            </p>
          </div>
        </div>
        
        {/* Editorial Table Grid with Yakult Red Accents */}
        <div className="benefits-grid-container benefits-header-elem">
          
          {/* Metrics Column (Soft red tint) */}
          <div className="benefits-metrics">
            {metrics.map((m, i) => (
              <div key={i} className="editorial-cell metric-cell" style={{ 
                flex: 1, 
                padding: "2.5rem", 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 300, color: "#A61E22", lineHeight: 1, marginBottom: "0.5rem" }}>{m.value}</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8E2B2D" }}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Cards Grid (Pure ivory) */}
          <div className="benefits-cards-wrapper">
            {cards.map((card, i) => (
              <div 
                key={i} 
                className="editorial-cell editorial-card" 
                style={{ 
                  backgroundColor: "#FDFBF7", 
                  padding: "4rem 3.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "background-color 0.4s ease",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FCF5F5"; // Soft red tint on hover
                  const icon = e.currentTarget.querySelector('.card-icon-svg');
                  if (icon) gsap.to(icon, { y: -3, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FDFBF7";
                  const icon = e.currentTarget.querySelector('.card-icon-svg');
                  if (icon) gsap.to(icon, { y: 0, duration: 0.3, ease: "power2.out" });
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4rem" }}>
                    <div className="card-icon-svg" style={{ color: "#A61E22" }}>{card.icon}</div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", color: "#A61E22", textTransform: "uppercase" }}>
                      {card.stat}
                    </div>
                  </div>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 400, color: "#1C1917", marginBottom: "1.2rem", letterSpacing: "-0.01em" }}>{card.title}</h3>
                  <p style={{ fontSize: "1rem", color: "#57534E", lineHeight: 1.7, margin: 0, fontWeight: 400 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .benefits-grid-container {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1px;
          background-color: rgba(166, 30, 34, 0.15); /* Yakult Red Hairlines */
          border: 1px solid rgba(166, 30, 34, 0.15);
        }
        .benefits-metrics {
          grid-column: span 4;
          background-color: #FCF5F5; /* Soft Yakult Red Tint */
          display: flex;
          flex-direction: column;
        }
        .metric-cell:not(:last-child) {
          border-bottom: 1px solid rgba(166, 30, 34, 0.15);
        }
        .benefits-cards-wrapper {
          grid-column: span 8;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background-color: rgba(166, 30, 34, 0.15); /* Yakult Red Hairlines */
        }
        @media (max-width: 900px) {
          .benefits-grid-container {
            grid-template-columns: 1fr;
          }
          .benefits-metrics {
            grid-column: span 1;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .metric-cell {
            width: 50%;
            border-bottom: 1px solid rgba(166, 30, 34, 0.15) !important;
          }
          .metric-cell:nth-child(odd) {
            border-right: 1px solid rgba(166, 30, 34, 0.15);
          }
          .benefits-cards-wrapper {
            grid-column: span 1;
          }
        }
        @media (max-width: 640px) {
          .benefits-cards-wrapper {
            grid-template-columns: 1fr;
          }
          .metric-cell {
            width: 100%;
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  );
}
