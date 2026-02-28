"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Zap, Heart } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    icon: <Shield size={32} style={{ color: "var(--primary)" }} />,
    title: "Boost Immunity",
    desc: "Contains exclusive L. casei Shirota strain that reaches the intestines alive to support your natural defenses."
  },
  {
    icon: <Zap size={32} style={{ color: "var(--secondary)" }} />,
    title: "Improve Digestion",
    desc: "Helps balance the flora in your digestive tract, promoting better nutrient absorption and smoother digestion."
  },
  {
    icon: <Heart size={32} style={{ color: "#10B981" }} />,
    title: "Daily Wellness",
    desc: "A simple, delicious addition to your morning routine that sets a healthy foundation for the rest of your day."
  }
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Fade and slide up animation using ScrollTrigger
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2, // cards animate sequentially
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // starts when the top of the section hits 80% from the top of the viewport
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Applying Miller's Law: We limit to 3 distinct benefits to prevent cognitive overload.
  // Applying Aesthetic and minimalist design: Using cards with generous whitespace.
  return (
    <section id="benefits" ref={sectionRef} className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-12)", maxWidth: "800px", margin: "0 auto var(--space-16)" }}>
          <h2 style={{ fontSize: "2.5rem" }}>The Power of <span className="text-secondary">Probiotics</span></h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}>
            Decades of scientific research packed into one daily bottle to help your body perform at its best.
          </p>
        </div>

        <div className="grid grid-cols-3" style={{ gap: "var(--space-8)" }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              style={{
                backgroundColor: "var(--bg-light)",
                padding: "var(--space-8)",
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
              }}>
                {benefit.icon}
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: 0 }}>{benefit.title}</h3>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
