"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Fitness Instructor",
    text: "Since adding Yakult to my morning routine, I've noticed a significant improvement in my digestion and overall energy levels. It's such a simple habit with massive returns."
  },
  {
    id: 2,
    name: "Dr. Marcus Chen",
    role: "Nutritionist",
    text: "I often recommend probiotics to my clients. The L. casei Shirota strain in Yakult has decades of clinical backing, making it one of the most reliable choices on the market."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Busy Mom",
    text: "Between work and the kids, my immune system used to take a beating. Yakult is a delicious way for the whole family to support our gut health every single day."
  }
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  // Applying Hick's Law: We show one simple testimonial at a time, with clear Next/Prev actions.
  // This reduces decision fatigue and cognitive load compared to a massive grid of reviews.
  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIdx]);

  return (
    <section id="testimonials" className="section-padding" style={{ backgroundColor: "#FFF5F5" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
          <h2 style={{ fontSize: "2.5rem" }}>What People <span className="text-primary">Say</span></h2>
        </div>

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          
          <div 
            ref={slideRef}
            style={{
              backgroundColor: "white",
              padding: "var(--space-12)",
              borderRadius: "32px",
              boxShadow: "0 20px 25px -5px rgba(227, 27, 35, 0.05)",
              textAlign: "center"
            }}
          >
            <Quote size={48} style={{ color: "var(--primary)", opacity: 0.2, margin: "0 auto var(--space-6)" }} />
            <p style={{ fontSize: "1.5rem", fontStyle: "italic", marginBottom: "var(--space-8)", color: "var(--text-dark)" }}>
              &quot;{testimonials[activeIdx].text}&quot;
            </p>
            <div>
              <h4 style={{ fontSize: "1.25rem", marginBottom: "var(--space-1)" }}>{testimonials[activeIdx].name}</h4>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>{testimonials[activeIdx].role}</p>
            </div>
          </div>

          <button 
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "-24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "white",
              border: "1px solid rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primary)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "var(--text-dark)";
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "-24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "white",
              border: "1px solid rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primary)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "var(--text-dark)";
            }}
          >
            <ChevronRight size={24} />
          </button>
          
        </div>
      </div>
    </section>
  );
}
